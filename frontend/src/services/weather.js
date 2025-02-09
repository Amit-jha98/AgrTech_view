export const getWeather = async (location) => {
    try {
      const response = await fetch(`http://localhost:5000/api/weather?location=${location}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Failed to fetch weather data. Please try again.");
    }
  };
  
  export const getPastWeather = async (location) => {
    try {
      const response = await fetch(`http://localhost:5000/api/past-weather?location=${location}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching past weather data:", error);
      throw new Error("Failed to fetch past weather data. Please try again.");
    }
  };