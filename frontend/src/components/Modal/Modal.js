import React from "react";
import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalBackdrop = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backdropFilter: "blur(5px)", // Blurred background
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1300,
  opacity: 0,
  animation: "fadeIn 0.3s forwards",
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

const ModalContent = styled("div")({
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  maxWidth: "500px",
  width: "90%",
  position: "relative",
  transform: "scale(0.9)",
  animation: "popIn 0.3s forwards",
  "@keyframes popIn": {
    from: { transform: "scale(0.9)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
  },
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: "10px",
  right: "10px",
  color: "#333",
});

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
