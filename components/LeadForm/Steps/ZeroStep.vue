<template>
    <form @submit.prevent="submitStep" class="mt-8">
      <div class="space-y-6">
        <!-- Contact Type -->
        <div>
          <label for="contact-type" class="block text-sm font-medium text-gray-700">Type of Contact</label>
          <select 
            id="contact-type" 
            v-model="form.contactType"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
            required
            aria-describedby="contact-type-error"
          >
            <option value="">Select</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="agent">Agent</option>
            <option value="relativeOfOwner">Relative of Owner</option>
            <option value="potentialBuyer">Potential Buyer</option>
            <option value="verifiedOwner">Verified Owner</option>
          </select>
          <p v-if="validationErrors.contactType" id="contact-type-error" class="mt-2 text-sm text-red-600">{{ validationErrors.contactType }}</p>
        </div>
  
        <!-- Lead Type -->
        <div>
          <label for="lead-type" class="block text-sm font-medium text-gray-700">What type of lead is this?</label>
          <select 
            id="lead-type" 
            v-model="form.leadType"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
            required
            aria-describedby="lead-type-error"
          >
            <option value="">Select</option>
            <option value="directToSellerOffMarket">Direct to Seller (off-market)</option>
            <option value="directToSellerOnMarket">Direct to Seller (on-market)</option>
            <option value="fsbo">FSBO</option>
            <option value="freeAndClear">Free & Clear</option>
            <option value="directToAgentOnMarket">Direct to Agent (on market)</option>
            <option value="jvDeal">JV deal</option>
          </select>
          <p v-if="validationErrors.leadType" id="lead-type-error" class="mt-2 text-sm text-red-600">{{ validationErrors.leadType }}</p>
        </div>
  
       
      </div>
  
      <div class="mt-8 flex justify-between">
        <button 
          type="button" 
          disabled 
          class="rounded-md border border-gray-200 bg-gray-100 py-2 px-4 text-sm font-medium text-gray-400 cursor-not-allowed opacity-50"
          aria-disabled="true"
        >
          Previous
        </button>
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
    contactType: string;
    leadType: string;
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
    const stepFields: (keyof FormData)[] = ['contactType', 'leadType'];
  
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
        await router.push("/send-me-a-lead/steps/1")
      } catch (error) {
        console.error('Error saving form data:', error)
        alert('An error occurred while saving your data. Please try again.')
      }
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };
  </script>