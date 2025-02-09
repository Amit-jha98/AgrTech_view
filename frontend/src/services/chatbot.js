import axios from "axios";

export const getChatbotResponse = async (query) => {
    const response = await axios.post("http://localhost:8000/chatbot", 
        { query: message },
        { headers: { "Content-Type": "application/json" } }
      );
      
  return response.data.reply;
};
