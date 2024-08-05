// composables/useProperty.js
export const useProperty = () => {
  const fetchProperty = async (id) => {
    try {
      // Determine the base URL
      let baseUrl = process.env.URL || 'http://localhost:8888'
      
      // Ensure baseUrl doesn't end with a slash
      baseUrl = baseUrl.replace(/\/$/, '')

      const functionUrl = `${baseUrl}/.netlify/functions/get-property`

      const response = await $fetch(functionUrl, {
        method: 'POST',
        body: { id }
      });

      return response;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  };

  return { fetchProperty };
};