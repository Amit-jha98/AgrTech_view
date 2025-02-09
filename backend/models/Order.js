const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Product being ordered
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Buyer placing the order
  quantity: { type: Number, required: true }, // Quantity ordered
  totalPrice: { type: Number, required: true }, // Total price (quantity * product price)
  status: { type: String, default: "Pending", enum: ["Pending", "Completed", "Cancelled"] }, // Order status
  createdAt: { type: Date, default: Date.now }, // Order date
});

module.exports = mongoose.model("Order", orderSchema);