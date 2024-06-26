<template>
    <form @submit.prevent="submitStep" class="mt-8">
      <div class="space-y-6">
        <!-- Default fields for all contact types -->
        <div class="space-y-4">
          <div>
            <label for="occupancy" class="block text-sm font-medium text-gray-700">Occupancy</label>
            <select 
              id="occupancy" 
              v-model="form.occupancy"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
              required
              aria-describedby="occupancy-error"
            >
              <option value="">Select Occupancy</option>
              <option value="ownerOccupied">Owner occupied</option>
              <option value="tenantOccupied">Tenant occupied</option>
              <option value="vacant">Vacant</option>
            </select>
            <p v-if="validationErrors.occupancy" id="occupancy-error" class="mt-2 text-sm text-red-600">{{ validationErrors.occupancy }}</p>
          </div>

          <div>
            <label for="creative-financing" class="block text-sm font-medium text-gray-700">Is The Homeowner Open To Creative Financing?</label>
            <select 
              id="occupancy" 
              v-model="form.creativeFinancing"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
              required
              aria-describedby="occupancy-error"
            >
              <option value="">Select one</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <p v-if="validationErrors.occupancy" id="occupancy-error" class="mt-2 text-sm text-red-600">{{ validationErrors.occupancy }}</p>
          </div>
  
          <div>
            <label for="asking-price" class="block text-sm font-medium text-gray-700">Asking Price</label>
            <input 
              type="text" 
              id="asking-price" 
              v-model="form.askingPrice" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              aria-describedby="asking-price-error"
            >
            <p v-if="validationErrors.askingPrice" id="asking-price-error" class="mt-2 text-sm text-red-600">{{ validationErrors.askingPrice }}</p>
          </div>
  
          <div>
            <label for="condition" class="block text-sm font-medium text-gray-700">Condition (repairs needed?)</label>
            <textarea 
              id="condition" 
              v-model="form.condition" 
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              aria-describedby="condition-error"
            ></textarea>
            <p v-if="validationErrors.condition" id="condition-error" class="mt-2 text-sm text-red-600">{{ validationErrors.condition }}</p>
          </div>

        
        </div>
  
        <!-- Step 3: Contact Type Specific Information -->
        <div class="space-y-4">
          <!-- Wholesaler Specific Fields -->
          <template v-if="form.contactType === 'wholesaler'">
            <div>
              <label for="contract-holder" class="block text-sm font-medium text-gray-700">Are you the Contract Holder? Or connected to the Contract Holder?</label>
              <input 
                type="text" 
                id="contract-holder" 
                v-model="form.contractHolder" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="contract-holder-error"
              >
              <p v-if="validationErrors.contractHolder" id="contract-holder-error" class="mt-2 text-sm text-red-600">{{ validationErrors.contractHolder }}</p>
            </div>
            <div>
              <label for="deal-type" class="block text-sm font-medium text-gray-700">What kind of deal is this?</label>
              <input 
                type="text" 
                id="deal-type" 
                v-model="form.dealType" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="deal-type-error"
              >
              <p v-if="validationErrors.dealType" id="deal-type-error" class="mt-2 text-sm text-red-600">{{ validationErrors.dealType }}</p>
            </div>
            <div>
              <label for="qualified-lead" class="block text-sm font-medium text-gray-700">Have you Qualified this lead and have had a Conversation Before Passing to our Team to Close?</label>
              <input 
                type="text" 
                id="qualified-lead" 
                v-model="form.qualifiedLead" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="qualified-lead-error"
              >
              <p v-if="validationErrors.qualifiedLead" id="qualified-lead-error" class="mt-2 text-sm text-red-600">{{ validationErrors.qualifiedLead }}</p>
            </div>
          </template>
  
          <!-- Verified Owner Specific Fields -->
          <template v-if="form.contactType === 'verifiedOwner'">
            <div>
              <label for="why-sell" class="block text-sm font-medium text-gray-700">Why are you interested in selling to us?</label>
              <input 
                type="text" 
                id="why-sell" 
                v-model="form.whySell" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="why-sell-error"
              >
              <p v-if="validationErrors.whySell" id="why-sell-error" class="mt-2 text-sm text-red-600">{{ validationErrors.whySell }}</p>
            </div>
            <div>
              <label for="sell-time" class="block text-sm font-medium text-gray-700">How soon are you looking to sell?</label>
              <input 
                type="text" 
                id="sell-time" 
                v-model="form.sellTime" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="sell-time-error"
              >
              <p v-if="validationErrors.sellTime" id="sell-time-error" class="mt-2 text-sm text-red-600">{{ validationErrors.sellTime }}</p>
            </div>
          </template>
        </div>
      </div>
  
      <div class="mt-8 flex justify-between">
        <a href="/send-me-a-lead/steps/2">
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
  contactType: string;
  occupancy: string;
  creativeFinancing: string;
  askingPrice: string;
  condition: string;
  contractHolder?: string;
  dealType?: string;
  qualifiedLead?: string;
  whySell?: string;
  sellTime?: string;
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
  const commonFields: (keyof FormData)[] = ['creativeFinancing','occupancy', 'askingPrice', 'condition'];
  let contactTypeFields: (keyof FormData)[] = [];

  if (form.value.contactType === 'wholesaler') {
    contactTypeFields = ['contractHolder', 'dealType', 'qualifiedLead'];
  } else if (form.value.contactType === 'verifiedOwner') {
    contactTypeFields = ['whySell', 'sellTime'];
  }

  [...commonFields, ...contactTypeFields].forEach(field => {
    if (!form.value[field] || (typeof form.value[field] === 'string' && form.value[field].trim() === '')) {
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
      await router.push("/send-me-a-lead/steps/4")  // Assuming there's a fourth step, adjust as needed
    } catch (error) {
      console.error('Error saving form data:', error)
      alert('An error occurred while saving your data. Please try again.')
    }
  } else {
    alert('Please fill in all required fields before proceeding.');
  }
};
</script>