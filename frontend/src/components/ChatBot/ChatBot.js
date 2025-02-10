import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
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
  Button,
  styled 
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  padding: theme.spacing(3),
  width: '100%',
  maxWidth: '500px',
  height: '70vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  bottom: '120px', // Higher position on desktop
  right: '20px',
  zIndex: 1000,
  [theme.breakpoints.down('sm')]: {
    // For mobile devices: expand modal width, adjust height and position
    left: '10px',
    right: '10px',
    bottom: '80px',
    maxWidth: 'calc(100% - 20px)',
    height: '60vh',
  },
}));

const ChatbotComponent = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isSpeechSupported] = useState(SpeechRecognition.browserSupportsSpeechRecognition());

  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  // Function to speak text using a female voice if available
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.toLowerCase().includes("female")) ||
                        voices.find(voice => voice.lang === "en-US") || voices[0];
    utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (message) => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { text: message, sender: "user" }]);
    setIsProcessing(true);

    try {
      const response = await axios.post("http://localhost:8000/chatbot", 
        { query: message },
        { headers: { "Content-Type": "application/json" } }
      );
      
      setMessages(prev => [...prev, { text: response.data.reply, sender: "bot" }]);
      speak(response.data.reply);
    } catch (error) {
      const errorMsg = "Sorry, I'm having trouble connecting. Please try again.";
      setMessages(prev => [...prev, { text: errorMsg, sender: "bot" }]);
      speak(errorMsg);
    }
    
    setInput("");
    resetTranscript();
    setIsProcessing(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ChatIcon />}
        onClick={() => setShowChat(!showChat)}
        sx={{
          position: 'fixed',
          bottom: { xs: '20px', sm: '80px' }, // adjust for mobile
          right: { xs: '20px', sm: '20px' },
          zIndex: 1100,
          borderRadius: '50%',
          width: '60px',
          height: '60px',
        }}
      />
      {showChat && (
        <GradientBox>
          <Box display="flex" alignItems="center" mb={2}>
            <SmartToyIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
            <Typography variant="h5" fontWeight="600" color="primary">
              AgriVoice Assistant
            </Typography>
          </Box>

          <Box flex={1} overflow="auto" bgcolor="background.paper" borderRadius="12px" p={2} mb={2}>
            <List dense>
              {messages.map((msg, index) => (
                <ListItem key={index} sx={{ 
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start'
                }}>
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main',
                      width: 32,
                      height: 32
                    }}>
                      {msg.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={msg.text}
                    sx={{
                      bgcolor: msg.sender === 'user' ? 'primary.light' : 'secondary.light',
                      borderRadius: '12px',
                      p: 1.5,
                      mx: 1,
                      maxWidth: '70%',
                      wordBreak: 'break-word',
                      boxShadow: 1
                    }}
                  />
                </ListItem>
              ))}
            </List>
            {isProcessing && <LinearProgress sx={{ width: '50%', mx: 'auto', my: 1 }} />}
          </Box>

          {/* Example prompt section */}
          <Box sx={{ mt: 2, p: 1, bgcolor: '#eef2f3', borderRadius: '10px' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Try asking:
            </Typography>
            <Typography variant="body2">🌱 "How can I improve soil fertility?"</Typography>
            <Typography variant="body2">☀️ "What are the best crops for summer?"</Typography>
            <Typography variant="body2">💧 "How often should I water my fields?"</Typography>
          </Box>

          <Box display="flex" gap={1} alignItems="center" mt={2}>
            <IconButton
              color={listening ? "error" : "primary"}
              onClick={() => listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening()}
              sx={{ bgcolor: listening ? 'error.light' : 'primary.light', p: 2 }}
            >
              <MicIcon sx={{ fontSize: 28 }} />
            </IconButton>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Speak or type your query..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: 'background.paper' } }}
            />

            <IconButton
              color="primary"
              onClick={() => handleSend(input)}
              disabled={isProcessing}
              sx={{ bgcolor: 'primary.light', p: 2 }}
            >
              <SendIcon />
            </IconButton>
          </Box>

          <Typography variant="caption" textAlign="center" mt={1} color="text.secondary">
            {listening ? "Listening... Speak now" : "Press mic to start voice input"}
          </Typography>
        </GradientBox>
      )}
    </>
  );
};

export default ChatbotComponent;
