import React, { useState } from "react";
import axios from "axios";

const PlaceOrderModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("/api/Marketplace/order", {
        productId: product._id,
        quantity,
      });
      alert("Order placed successfully!");
      onClose();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Product: {product.name}</p>
        <p>Available Quantity: {product.quantity}</p>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            max={product.quantity}
          />
        </label>
        <button onClick={handlePlaceOrder}>Confirm Order</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PlaceOrderModal;