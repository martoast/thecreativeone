// composables/useProperties.js
export const useProperties = () => {
    const fetchProperties = async (page = 1, pageSize = 10, sold = null) => {
      try {
        const response = await $fetch('/.netlify/functions/get-properties', {
          method: 'POST',
          body: { page, pageSize, sold }
        });
  
        return JSON.parse(response);
      } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }
    };
  
    const performPropertyOperation = async (operation, params) => {
      try {
        const response = await $fetch('/.netlify/functions/property-operations', {
          method: 'POST',
          body: { operation, ...params }
        });
  
        return JSON.parse(response);
      } catch (error) {
        console.error('Error performing property operation:', error);
        throw error;
      }
    };
  
    return {
      fetchProperties,
      performPropertyOperation
    };
  };