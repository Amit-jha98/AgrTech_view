import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { Container, Row, Col } from "react-bootstrap";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  styled,
  useMediaQuery,
  useTheme,
  Card,
  CardActionArea,
  CardContent,
  Grid,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PersonIcon from "@mui/icons-material/Person";
import { keyframes } from "@emotion/react";

// Keyframes for a subtle fade-in animation on messages
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Page wrapper with a crop-inspired green gradient
const PageWrapper = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)",
  minHeight: "100vh",
  padding: theme.spacing(2),
}));

// Chat container with a light, friendly green background and rounded corners
const ChatContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #f0fff0 0%, #e0f2e9 100%)",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  padding: theme.spacing(3),
  width: "100%",
  maxWidth: "800px",
  height: "70vh",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    height: "80vh",
    padding: theme.spacing(2),
  },
}));

// Message list area styling
const MessageList = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  background: "#ffffff",
  borderRadius: "12px",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
}));

const CropAdvisory = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Update text input when the voice transcript changes.
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Speak out the text using the browser's SpeechSynthesis
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice =
      voices.find((voice) => voice.name.toLowerCase().includes("female")) ||
      voices.find((voice) => voice.lang === "en-US") ||
      voices[0];
    utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  // Handle sending messages to the backend
  const handleSend = async (message) => {
    if (!message.trim()) return;
    // Append the user's message
    setMessages((prev) => [
      ...prev,
      { text: message, sender: "user", key: Date.now() },
    ]);
    setIsProcessing(true);

    try {
      // Replace the URL with your backend endpoint
      const response = await axios.post(
        "http://localhost:8000/chatbot",
        { query: message },
        { headers: { "Content-Type": "application/json" } }
      );
      // Append the bot's reply and speak it out
      setMessages((prev) => [
        ...prev,
        { text: response.data.reply, sender: "bot", key: Date.now() + 1 },
      ]);
      speak(response.data.reply);
    } catch (error) {
      const errorMsg =
        "Oops! I am facing connectivity issues. Please try again.";
      setMessages((prev) => [
        ...prev,
        { text: errorMsg, sender: "bot", key: Date.now() + 1 },
      ]);
      speak(errorMsg);
    }

    setInput("");
    resetTranscript();
    setIsProcessing(false);
  };

  // Additional prompt examples to be displayed outside the chatbot body
  const additionalPrompts = [
    "When is the best time to plant tomatoes?",
    "How do I improve soil nutrients?",
    "What fertilizers are best for corn?",
    "How can I manage pests on my crops?",
    "What are the best irrigation techniques for drought conditions?",
    "How do I optimize water usage in my fields?",
  ];

  return (
    <PageWrapper>
      <Container maxWidth="md" style={{ padding: 0 }}>
        {/* Header Section */}
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={10}>
            <Box textAlign="center" mb={3}>
              <AgricultureIcon sx={{ fontSize: isMobile ? 50 : 70, color: "#FFD700" }} />
              <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold" color="white">
                Crop Advisory
              </Typography>
              <Typography variant="subtitle1" color="white">
                Your smart assistant for optimal crop management!
              </Typography>
            </Box>
          </Col>
        </Row>


                {/* Chatbot Section */}
                <Row className="justify-content-center mt-4">
          <Col xs={12} md={10}>
            <ChatContainer>
              {/* Chat Header with themed icon */}
              <Box display="flex" alignItems="center" mb={2} justifyContent="center">
                <AgricultureIcon sx={{ fontSize: isMobile ? 35 : 45, color: "#4caf50", mr: 1 }} />
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" color="#388e3c">
                  AgriBot
                </Typography>
              </Box>

              {/* Message List */}
              <MessageList>
                <List>
                  {messages.map((msg) => (
                    <ListItem
                      key={msg.key}
                      sx={{
                        flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                        animation: `${fadeIn} 0.5s ease`,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: msg.sender === "user" ? "#81c784" : "#66bb6a",
                            width: 32,
                            height: 32,
                          }}
                        >
                          {msg.sender === "user" ? <PersonIcon /> : <LocalFloristIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={msg.text}
                        sx={{
                          bgcolor: msg.sender === "user" ? "#e8f5e9" : "#c8e6c9",
                          borderRadius: "12px",
                          p: 1.5,
                          mx: 1,
                          maxWidth: "80%",
                          wordBreak: "break-word",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                {isProcessing && (
                  <LinearProgress sx={{ width: "60%", mx: "auto", my: 1 }} />
                )}
              </MessageList>

              {/* Input Section */}
              <Box display="flex" gap={1} alignItems="center">
                {SpeechRecognition.browserSupportsSpeechRecognition() && (
                  <IconButton
                    color={listening ? "error" : "primary"}
                    onClick={() =>
                      listening
                        ? SpeechRecognition.stopListening()
                        : SpeechRecognition.startListening({ continuous: false })
                    }
                    sx={{ bgcolor: listening ? "#ef9a9a" : "#a5d6a7", p: 1.5 }}
                  >
                    <MicIcon sx={{ fontSize: 28 }} />
                  </IconButton>
                )}

                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Speak or type your query..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor: "#ffffff",
                    },
                  }}
                />

                <IconButton
                  color="primary"
                  onClick={() => handleSend(input)}
                  disabled={isProcessing}
                  sx={{ bgcolor: "#a5d6a7", p: 1.5 }}
                >
                  <SendIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Box>

              <Typography variant="caption" textAlign="center" mt={1} color="textSecondary">
                {listening ? "Listening... Please speak clearly" : "Tap the mic to speak"}
              </Typography>
            </ChatContainer>
          </Col>
        </Row>

        {/* Additional Prompt Cards Section (Outside Chatbot Body) */}
        <Row className="justify-content-center">
          <Col xs={12}>
            <Box
              mt={2}
              p={3}
              bgcolor="#f5fff5"
              borderRadius={3}
              boxShadow={3}
              textAlign="center"
            >
              <Typography variant="h6" color="#388e3c" gutterBottom>
                Popular Queries
              </Typography>
              <Grid container spacing={2}>
                {additionalPrompts.map((prompt, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        boxShadow: 2,
                        background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSend(prompt)}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Typography variant="subtitle2" align="center" color="#388e3c">
                            {prompt}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
};

export default CropAdvisory;
