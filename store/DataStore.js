// stores/properties.js
import { defineStore } from 'pinia';
import { useProperties } from '@/composables/useProperties';
import { useProperty } from '@/composables/useProperty';

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    properties: [],
    sold_properties: [],
    property: {},
    total: 0,
    sold_total: 0,
    error: null,
  }),

  actions: {
    async get(page = 1, pageSize = 10, sold = null) {
      this.error = null;
      try {
        const { fetchProperties } = useProperties();
        const response = await fetchProperties(page, pageSize, sold ?? sold);
        this.properties = Array.isArray(response.properties) ? response.properties : []
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
        this.sold_properties = Array.isArray(response.properties) ? response.properties : []
        this.total = response.total;
      } catch (error) {
        console.error("Error fetching properties:", error);
        this.error = error.message || "An error occurred while fetching properties";
      }
    },

    async find(id) {
      this.error = null;
      try {
        const { fetchProperty } = useProperty();
        this.property = await fetchProperty(id);
      } catch (error) {
        console.error(`Error fetching property with ID ${id}:`, error);
        this.error = error.message || `An error occurred while fetching property with ID ${id}`;
      }
    },

  },

  getters: {
    getProperties: (state) => state.properties,
    getProperty: (state) => state.property,
    getError: (state) => state.error
  }
});