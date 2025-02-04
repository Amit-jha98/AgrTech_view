const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const axios = require('axios');
const crypto = require('crypto');
const visitorRoutes = require('./routes/visitorRoutes');

// Initialize Firebase
const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', visitorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});