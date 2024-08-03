// composables/useProperties.js
export const useProperties = () => {
    const fetchProperties = async (page = 1, pageSize = 10, sold = null) => {
      try {
        const response = await $fetch('/api/properties', {
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