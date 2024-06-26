<template>
    <form @submit.prevent="submitStep" class="mt-8">
      <div class="space-y-6">
        <!-- Address Information -->
        <div v-if="!addressSelected">
          <label class="block text-sm font-medium text-gray-700 mb-3">Lead property address</label>
          <custom-places-auto-complete @updateAddress="handleUpdateAddress" />
        </div>
        <div v-else class="space-y-4">
          <!-- Street Address -->
          <div>
            <label for="street-address" class="block text-sm font-medium text-gray-700">Street Address *</label>
            <input 
              type="text" 
              id="street-address" 
              v-model="form.streetAddress" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              aria-describedby="street-address-error"
            >
            <p v-if="validationErrors.streetAddress" id="street-address-error" class="mt-2 text-sm text-red-600">{{ validationErrors.streetAddress }}</p>
          </div>
  
          <!-- City -->
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700">City *</label>
            <input 
              type="text" 
              id="city" 
              v-model="form.city" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              aria-describedby="city-error"
            >
            <p v-if="validationErrors.city" id="city-error" class="mt-2 text-sm text-red-600">{{ validationErrors.city }}</p>
          </div>
  
          <!-- State -->
          <div>
            <label for="state" class="block text-sm font-medium text-gray-700">State *</label>
            <input 
              type="text" 
              id="state" 
              v-model="form.state" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              aria-describedby="state-error"
            >
            <p v-if="validationErrors.state" id="state-error" class="mt-2 text-sm text-red-600">{{ validationErrors.state }}</p>
          </div>
  
          <!-- Postal Code -->
          <div>
            <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal Code *</label>
            <input 
              type="text" 
              id="postal-code" 
              v-model="form.postalCode" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              aria-describedby="postal-code-error"
            >
            <p v-if="validationErrors.postalCode" id="postal-code-error" class="mt-2 text-sm text-red-600">{{ validationErrors.postalCode }}</p>
          </div>
  
          <div class="mx-auto text-center">
            <button @click="resetAddress" type="button" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Change Address
          </button>
          </div>
        </div>
      </div>
  
      <div class="mt-8 flex justify-between">
        <a href="/send-me-a-lead/steps/1">
            <button 
            type="button"
            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            Previous
            </button>
        </a>
        <button 
          type="submit" 
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue'
  import type { PropType, Ref } from 'vue'
  import { useNuxtApp, useRouter } from '#app'
  
  interface FormData {
    fullAddress: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
  }
  
  interface AddressData {
    address: string;
  }
  
  const props = defineProps({
    currentStep: {
      type: Number,
      required: true
    },
    initialFormData: {
      type: Object as PropType<FormData>,
      required: true
    }
  });
  
  const { $locally } = useNuxtApp()
  const router = useRouter()
  
  const form: Ref<FormData> = ref({
    ...props.initialFormData
  })
  
  const validationErrors: Ref<Partial<Record<keyof FormData, string>>> = ref({});
  const addressSelected = ref(props.initialFormData && props.initialFormData.fullAddress ? true : false);
  
  const validateStep = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    const stepFields: (keyof FormData)[] = ['streetAddress', 'city', 'state', 'postalCode'];
  
    stepFields.forEach(field => {
      if (!form.value[field] || form.value[field].trim() === '') {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    });
  
    validationErrors.value = errors;
    return Object.keys(errors).length === 0;
  };
  
  const submitStep = async () => {
    if (validateStep()) {
      try {
        const currentFormData = $locally.getItem('formData') || {};
        $locally.setItem('formData', { ...currentFormData, ...form.value })
        await router.push("/send-me-a-lead/steps/3")
      } catch (error) {
        console.error('Error saving form data:', error)
        alert('An error occurred while saving your data. Please try again.')
      }
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };
  
  const handleUpdateAddress = (data: AddressData) => {
    form.value.fullAddress = data.address;
    const [streetAddress, city, stateZip] = data.address.split(', ');
    form.value.streetAddress = streetAddress;
    form.value.city = city;
    const [state, postalCode] = stateZip.split(' ');
    form.value.state = state;
    form.value.postalCode = postalCode;
    addressSelected.value = true;
  };
  
  const resetAddress = () => {
    form.value = {
      fullAddress: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: ''
    };
    addressSelected.value = false;
  };
  
  
  </script>