// stores/properties.js
import { defineStore } from 'pinia';
import { useProperties } from '@/composables/useProperties';

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    properties: [],
    sold_properties: [],
    property: {},
    total: 0,
    error: null,
  }),

  actions: {
    async get(page = 1, pageSize = 10, sold = null) {
      this.error = null;
      try {
        const { fetchProperties } = useProperties();
        const response = await fetchProperties(page, pageSize, sold);
        this.properties = response.properties;
        this.total = response.total;
      } catch (error) {
        console.error("Error fetching properties:", error);
        this.error = error.message || "An error occurred while fetching properties";
      }
    },

    async get_sold(page = 1, pageSize = 10) {
      this.error = null;
      try {
        const { fetchProperties } = useProperties();
        const response = await fetchProperties(page, pageSize, true);
        this.sold_properties = response.properties;
        this.total = response.total;
      } catch (error) {
        console.error("Error fetching sold properties:", error);
        this.error = error.message || "An error occurred while fetching sold properties";
      }
    },

    async find(ID) {
      this.error = null;
      try {
        const { performPropertyOperation } = useProperties();
        this.property = await performPropertyOperation('find', { id: ID });
      } catch (error) {
        console.error(`Error finding property with ID ${ID}:`, error);
        this.error = error.message || `An error occurred while finding property with ID ${ID}`;
      }
    },

    async store(params) {
      this.error = null;
      try {
        const { performPropertyOperation } = useProperties();
        return await performPropertyOperation('store', { property: params.property });
      } catch (error) {
        console.error("Error storing property:", error);
        this.error = error.message || "An error occurred while storing the property";
        throw error;
      }
    },

    async delete(ID) {
      this.error = null;
      try {
        const { performPropertyOperation } = useProperties();
        return await performPropertyOperation('delete', { id: ID });
      } catch (error) {
        console.error(`Error deleting property with ID ${ID}:`, error);
        this.error = error.message || `An error occurred while deleting property with ID ${ID}`;
        throw error;
      }
    }
  },

  getters: {
    getProperties: (state) => state.properties,
    getProperty: (state) => state.property,
    getError: (state) => state.error
  }
});