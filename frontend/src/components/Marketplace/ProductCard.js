import React from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
  },
}));

const ProductCard = ({ product, onOrder }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {product.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Price: Rs.{product.price} per kg
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Quantity: {product.quantity} Kg
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Farmer: {product.farmer.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onOrder && onOrder(product)}
          sx={{
            marginLeft: "auto",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #2196F3 30%, #64B5F6 90%)",
            "&:hover": {
              background: "linear-gradient(135deg, #1565C0 30%, #2196F3 90%)",
            },
          }}
        >
          Order Now
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ProductCard;
