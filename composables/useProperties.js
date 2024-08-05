// composables/useProperties.js
export const useProperties = () => {
  const fetchProperties = async (page = 1, pageSize = 10, sold = null) => {
    try {
      const response = await $fetch("/.netlify/functions/get-properties", {
        method: 'POST',
        body: { page, pageSize, sold }
      });

      const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response


      if (parsedResponse.error) {
        throw new Error(parsedResponse.error)
      }

      return parsedResponse
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  };

  return {
    fetchProperties
  };
};