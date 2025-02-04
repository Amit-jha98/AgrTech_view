class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleWeather = () => {
      // Display initial message
      const message = this.createChatBotMessage("Fetching weather data...");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
  
      // Fetch weather data from backend
      fetch('http://localhost:5000/api/weather?location=Patna')
        .then(response => response.json())
        .then(data => {
          if (data && data.current && data.current.temp_c && data.current.condition) {
            const weatherMessage = this.createChatBotMessage(
              `The current temperature is ${data.current.temp_c}°C with ${data.current.condition.text}.`
            );
            this.setState((prev) => ({
              ...prev,
              messages: [...prev.messages, weatherMessage],
            }));
          } else {
            throw new Error("Incomplete weather data");
          }
        })
        .catch(error => {
          console.error("Error fetching weather:", error);
          const errorMessage = this.createChatBotMessage("Failed to fetch weather data.");
          this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, errorMessage],
          }));
        });
    };
  
    // Add more action handlers here
  }
  
  export default ActionProvider;
  