<template>
  <form @submit.prevent="submitStep" class="mt-8">
    <div class="space-y-6">
      <!-- Business Name -->
      <div>
        <label for="business-name" class="block text-sm font-medium text-gray-700">Business Name</label>
        <input 
          type="text" 
          id="business-name" 
          v-model="form.businessName" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
          required
          aria-describedby="business-name-error"
        >
        <p v-if="validationErrors.businessName" id="business-name" class="mt-2 text-sm text-red-600">{{ validationErrors.businessName }}</p>
      </div>
      <!-- First Name -->
      <div>
        <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
        <input 
          type="text" 
          id="first-name" 
          v-model="form.firstName"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
          required
          aria-describedby="first-name-error"
        >
        <p v-if="validationErrors.firstName" id="first-name-error" class="mt-2 text-sm text-red-600">{{ validationErrors.firstName }}</p>
      </div>

      <!-- Last Name -->
      <div>
        <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
        <input 
          type="text" 
          id="last-name" 
          v-model="form.lastName"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
          required
          aria-describedby="last-name-error"
        >
        <p v-if="validationErrors.lastName" id="last-name-error" class="mt-2 text-sm text-red-600">{{ validationErrors.lastName }}</p>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
          required
          aria-describedby="email-error"
        >
        <p v-if="validationErrors.email" id="email-error" class="mt-2 text-sm text-red-600">{{ validationErrors.email }}</p>
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="form.phone"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
          required
          aria-describedby="phone-error"
        >
        <p v-if="validationErrors.phone" id="phone-error" class="mt-2 text-sm text-red-600">{{ validationErrors.phone }}</p>
      </div>
    </div>

    <div class="mt-8 flex justify-between">
      <a href="/send-me-a-lead/steps/0">
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
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

const validateStep = () => {
  const errors: Partial<Record<keyof FormData, string>> = {};
  const stepFields: (keyof FormData)[] = ['businessName','firstName', 'lastName', 'email', 'phone'];

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
      $locally.setItem('formData', form.value)
      await router.push("/send-me-a-lead/steps/2")
    } catch (error) {
      console.error('Error saving form data:', error)
      alert('An error occurred while saving your data. Please try again.')
    }
  } else {
    alert('Please fill in all required fields before proceeding.');
  }
};
</script>