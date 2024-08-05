// composables/useProperty.js
export const useProperty = () => {
  const fetchProperty = async (id) => {
    try {
      const response = await $fetch("/.netlify/functions/get-property", {
        method: 'POST',
        body: { id }
      });

      const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response


      if (parsedResponse.error) {
        throw new Error(parsedResponse.error)
      }

      return parsedResponse
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  };

  return { fetchProperty };
};