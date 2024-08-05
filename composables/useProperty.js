// composables/useProperty.js
export const useProperty = () => {
  const fetchProperty = async (id) => {
    try {
      const response = await $fetch("/.netlify/functions/get-property", {
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