// stores/properties.js
import { defineStore } from 'pinia';

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
        const { data, error } = await useFetch('/api/properties', {
          method: 'POST',
          body: { page, pageSize, sold: sold ?? null }
        });

        if (error.value) throw new Error(error.value.message);

        this.properties = Array.isArray(data.value.properties) ? data.value.properties : [];
        this.total = data.value.total;
      } catch (error) {
        console.error("Error fetching properties:", error);
        this.error = error.message || "An error occurred while fetching properties";
      }
    },

    async get_sold(page = 1, pageSize = 10) {
      this.error = null;
      try {
        const { data, error } = await useFetch('/api/properties', {
          method: 'POST',
          body: { page, pageSize, sold: true }
        });

        if (error.value) throw new Error(error.value.message);

        this.sold_properties = Array.isArray(data.value.properties) ? data.value.properties : [];
        this.sold_total = data.value.total;
      } catch (error) {
        console.error("Error fetching sold properties:", error);
        this.error = error.message || "An error occurred while fetching sold properties";
      }
    },

    async find(id) {
      this.error = null;
      try {
        const { data, error } = await useFetch('/api/property', {
          method: 'POST',
          body: { id }
        });

        if (error.value) throw new Error(error.value.message);

        this.property = data.value;
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