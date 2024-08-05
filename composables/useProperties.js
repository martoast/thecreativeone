// composables/useProperties.js
export const useProperties = () => {
  const fetchProperties = async (page = 1, pageSize = 10, sold = null) => {
    try {
      // Determine the base URL
      let baseUrl = process.env.URL || 'http://localhost:8888'
      
      // Ensure baseUrl doesn't end with a slash
      baseUrl = baseUrl.replace(/\/$/, '')

      const functionUrl = `${baseUrl}/.netlify/functions/get-properties`

      const response = await $fetch(functionUrl, {
        method: 'POST',
        body: { page, pageSize, sold }
      });

      return response;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  };

  return {
    fetchProperties
  };
};