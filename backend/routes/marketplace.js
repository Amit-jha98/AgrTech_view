const express = require("express");
const router = express.Router();
const marketplaceController = require("../controllers/marketplace");
const authMiddleware = require("../middleware/auth"); // Ensure user is authenticated

// List a product (Farmer)
router.post("/list", authMiddleware, marketplaceController.listProduct);

// Get all products (Buyers)
router.get("/products", marketplaceController.getProducts);

// Place an order (Buyer)
router.post("/order", authMiddleware, marketplaceController.placeOrder);

module.exports = router;