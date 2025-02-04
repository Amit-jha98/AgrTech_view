import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  botName: "FarmBot",
  initialMessages: [
    createChatBotMessage("Hi! I'm FarmBot. How can I assist you today?")
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default config;
