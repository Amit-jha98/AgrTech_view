const express = require('express');
const router = express.Router();
const { db } = require('../config/firebaseConfig');

router.post('/', async (req, res) => {
  const product = req.body;
  const formattedProduct = {
    ...product,
    price: parseFloat(product.price),
    quantity: parseInt(product.quantity, 10),
  };

  try {
    const docRef = await db.collection('products').add(formattedProduct);
    res.status(200).json({ message: 'Document written with ID: ' + docRef.id });
  } catch (e) {
    console.error('Error adding document: ', e);
    res.status(500).json({ error: 'Error adding document' });
  }
});

module.exports = router;
