export const logVisit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/log-visit', {
        method: 'POST',
      });
      return response.ok;
    } catch (error) {
      console.error('Error logging visit:', error);
      return false;
    }
  };