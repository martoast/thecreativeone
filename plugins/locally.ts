import { defineNuxtPlugin } from '#app'

interface LocallyPlugin {
  getItem(item: string): any;
  setItem(item: string, value: any): void;
}

export default defineNuxtPlugin(() => {
  const locally: LocallyPlugin = {
    getItem(item: string) {
      if (process.client) {
        const value = localStorage.getItem(item);
        return value ? JSON.parse(value) : null;
      } else {
        return undefined;
      }
    },

    setItem(item: string, value: any) {
      if (process.client) {
        localStorage.setItem(item, JSON.stringify(value));
      }
    }
  };

  return {
    provide: {
      locally
    }
  }
})
