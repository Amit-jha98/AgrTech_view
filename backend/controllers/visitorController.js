const admin = require('firebase-admin');
const axios = require('axios');
const crypto = require('crypto');

// Encryption key (store in environment variables)
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

// Encrypt data
const encryptData = (data) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  };
};

// Log visit
exports.logVisit = async (req, res) => {
  try {
    // Get IP from request
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Get location from IP (using ipapi.co)
    const location = await axios.get(`https://ipapi.co/${ip}/json/`)
      .then((response) => ({
        city: response.data.city,
        region: response.data.region,
        country: response.data.country_name,
      }));

    // Encrypt IP + location
    const encrypted = encryptData({ ip, ...location });

    // Save to Firestore
    await admin.firestore().collection('visitors').add({
      encryptedData: encrypted.encryptedData,
      iv: encrypted.iv,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error logging visit:', error);
    res.status(500).json({ error: 'Failed to log visit' });
  }
};