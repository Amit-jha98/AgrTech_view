import React, { useEffect, useState } from "react";
import { 
  Container,
  Grid,
  Typography,
  Button,
  Box,
  styled 
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import axios from "axios";
import ProductCard from "../components/Marketplace/ProductCard";
import PlaceOrderModal from "../components/Marketplace/PlaceOrderModal";
import ProductSubmissionForm from "../components/Marketplace/ProductSubmissionForm";
import Modal from "../components/Modal/Modal";

const GradientBackground = styled(Box)({
  background: "linear-gradient(135deg, #4CAF50 30%, #81C784 90%)",
  minHeight: "100vh",
  padding: "4rem 0",
  display: "flex",
  justifyContent: "center",
});

const MarketplaceContainer = styled(Container)({
  background: "white",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
});

const ProductGrid = styled(Grid)({
  marginTop: "2rem",
});

const SellButton = styled(Button)({
  margin: "2rem 0",
  padding: "1rem 2rem",
  fontSize: "1.1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #FF9800 30%, #FFB74D 90%)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(135deg, #E65100 30%, #FF9800 90%)",
  },
});

const TitleContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "1.5rem",
});

const OrderButton = styled(Button)({
  marginTop: "1rem",
  padding: "10px 15px",
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #2196F3 30%, #64B5F6 90%)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(135deg, #1565C0 30%, #2196F3 90%)",
  },
});

const Marketplace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const mockProducts = [
    {
      id: 1,
      name: "Organic Apples",
      description: "Freshly picked organic apples from the farm.",
      price: 100,
      quantity: 100,
      farmer: {
        id: 101,
        name: "Rahul",
      },
    },
    {
      id: 2,
      name: "Fresh Carrots",
      description: "Locally grown, organic carrots.",
      price: 18,
      quantity: 200,
      farmer: {
        id: 102,
        name: "Raju",
      },
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setProducts(mockProducts);
      // Uncomment and replace with API if needed
      // const response = await axios.get("/api/marketplace/products");
      // setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleProductSubmit = (product) => {
    console.log("Product submitted:", product);
    handleCloseModal();
  };

  const handleOrder = (product) => {
    setSelectedProduct(product);
  };

  return (
    <GradientBackground>
      <MarketplaceContainer maxWidth="lg">
        <TitleContainer>
          <StorefrontIcon color="primary" fontSize="large" />
          <Typography variant="h4" fontWeight="bold">
            Farmer-to-Buyer Marketplace
          </Typography>
        </TitleContainer>

        <SellButton variant="contained" onClick={handleOpenModal}>
          Sell Your Products
        </SellButton>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ProductSubmissionForm onSubmit={handleProductSubmit} />
        </Modal>

        <ProductGrid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
              {/* <OrderButton onClick={() => handleOrder(product)}>
                Place Order
              </OrderButton> */}
            </Grid>
          ))}
        </ProductGrid>

        {selectedProduct && (
          <PlaceOrderModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </MarketplaceContainer>
    </GradientBackground>
  );
};

export default Marketplace;
