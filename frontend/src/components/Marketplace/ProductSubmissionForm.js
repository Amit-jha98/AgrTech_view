import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled(Paper)({
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  maxWidth: "500px",
  margin: "0 auto",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
  padding: "10px",
  fontWeight: "bold",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #4CAF50, #81C784)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(135deg, #388E3C, #66BB6A)",
  },
});

const ProductSubmissionForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    farmerName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedProduct = {
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10),
    };

    try {
      const response = await fetch("http://localhost:5000/api/submitProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedProduct),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);

      setProduct({
        name: "",
        description: "",
        price: "",
        quantity: "",
        farmerName: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Submit a New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Product Name"
            variant="outlined"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Price per Unit"
            variant="outlined"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Farmer Name"
            variant="outlined"
            name="farmerName"
            value={product.farmerName}
            onChange={handleChange}
            required
            fullWidth
          />
          <StyledButton type="submit" variant="contained" fullWidth>
            Submit Product
          </StyledButton>
        </Box>
      </form>
    </FormContainer>
  );
};

export default ProductSubmissionForm;
