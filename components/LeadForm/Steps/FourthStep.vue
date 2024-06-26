<template>
    <form @submit.prevent="submitStep" class="mt-8">
      <div class="space-y-6">
        <!-- Step 4: Mortgage Information -->
        <div class="space-y-4">
          <div>
            <label for="has-mortgage" class="block text-sm font-medium text-gray-700">Is there mortgage in place?</label>
            <select 
              id="has-mortgage" 
              v-model="form.hasMortgage" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              aria-describedby="has-mortgage-error"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <p v-if="validationErrors.hasMortgage" id="has-mortgage-error" class="mt-2 text-sm text-red-600">{{ validationErrors.hasMortgage }}</p>
          </div>
  
          <template v-if="form.hasMortgage === 'yes'">
            <div>
              <label for="mortgage-balance" class="block text-sm font-medium text-gray-700">Mortgage Balance</label>
              <input 
                type="number" 
                id="mortgage-balance" 
                v-model="form.mortgageBalance" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="mortgage-balance-error"
              >
              <p v-if="validationErrors.mortgageBalance" id="mortgage-balance-error" class="mt-2 text-sm text-red-600">{{ validationErrors.mortgageBalance }}</p>
            </div>
            <div>
              <label for="loan-type" class="block text-sm font-medium text-gray-700">Type of Loan</label>
              <input 
                type="text" 
                id="loan-type" 
                v-model="form.loanType" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="loan-type-error"
              >
              <p v-if="validationErrors.loanType" id="loan-type-error" class="mt-2 text-sm text-red-600">{{ validationErrors.loanType }}</p>
            </div>
            <div>
              <label for="loanAmount" class="block text-sm font-medium text-gray-700">Loan amount</label>
              <input 
                type="number" 
                id="loanAmount" 
                v-model="form.loanAmount"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="loanAmount-error"
              >
              <p v-if="validationErrors.loanAmount" id="piti-error" class="mt-2 text-sm text-red-600">{{ validationErrors.loanAmount }}</p>
            </div>
            <div>
              <label for="interest-rate" class="block text-sm font-medium text-gray-700">Interest Rate</label>
              <input 
                type="number" 
                id="interest-rate" 
                v-model="form.interestRate" 
                step="0.01" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="interest-rate-error"
              >
              <p v-if="validationErrors.interestRate" id="interest-rate-error" class="mt-2 text-sm text-red-600">{{ validationErrors.interestRate }}</p>
            </div>
            <div>
              <label for="maturity-date" class="block text-sm font-medium text-gray-700">Maturity Date</label>
              <input 
                type="date" 
                id="maturity-date" 
                v-model="form.maturityDate" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="maturity-date-error"
              >
              <p v-if="validationErrors.maturityDate" id="maturity-date-error" class="mt-2 text-sm text-red-600">{{ validationErrors.maturityDate }}</p>
            </div>
            <div>
              <label for="piti" class="block text-sm font-medium text-gray-700">PITI</label>
              <input 
                type="number" 
                id="piti" 
                v-model="form.piti" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-describedby="piti-error"
              >
              <p v-if="validationErrors.piti" id="piti-error" class="mt-2 text-sm text-red-600">{{ validationErrors.piti }}</p>
            </div>

            <div>
        <label for="max-offer-cash" class="block text-sm font-medium text-gray-700">Max Allowable Offer Price (Cash)</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">$</span>
          </div>
          <input 
            type="number" 
            id="max-offer-cash" 
            v-model="form.maxOfferCash" 
            class="mt-1 block w-full pl-7 pr-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            aria-describedby="max-offer-cash-error"
          >
        </div>
        <p v-if="validationErrors.maxOfferCash" id="max-offer-cash-error" class="mt-2 text-sm text-red-600">{{ validationErrors.maxOfferCash }}</p>
      </div>

      <div>
        <label for="max-offer-creative" class="block text-sm font-medium text-gray-700">Max Allowable Offer Price (Creative)</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">$</span>
          </div>
          <input 
            type="number" 
            id="max-offer-creative" 
            v-model="form.maxOfferCreative" 
            class="mt-1 block w-full pl-7 pr-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            aria-describedby="max-offer-creative-error"
          >
        </div>
        <p v-if="validationErrors.maxOfferCreative" id="max-offer-creative-error" class="mt-2 text-sm text-red-600">{{ validationErrors.maxOfferCreative }}</p>
      </div>

      <div>
            <label for="rehab-costs" class="block text-sm font-medium text-gray-700">Rehab Costs</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">$</span>
              </div>
              <input 
                type="number" 
                id="rehab-costs" 
                v-model="form.rehabCosts" 
                class="mt-1 block w-full pl-7 pr-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                aria-describedby="rehab-costs-error"
              >
            </div>
          </div>
            
          </template>
        </div>
      </div>
  
      <div class="mt-8 flex justify-between">
        <a href="/send-me-a-lead/steps/3">
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
  import { ref, defineProps, watch } from 'vue'
  import type { PropType, Ref } from 'vue'
  import { useNuxtApp, useRouter } from '#app'
  
  interface FormData {
    hasMortgage: string;
    mortgageBalance?: number;
    loanType?: string;
    loanAmount?: number;
    interestRate?: number;
    piti?: number;
    maturityDate?: string;
    maxOfferCash?: number;
    maxOfferCreative?: number;
    rehabCosts?: number;
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
  
  watch(() => form.value.hasMortgage, (newValue) => {
    if (newValue === 'no') {
      form.value.mortgageBalance = undefined;
      form.value.loanType = undefined;
      form.value.loanAmount = undefined;
      form.value.interestRate = undefined;
      form.value.piti = undefined;
      form.value.maturityDate = undefined;
      form.value.rehabCosts = undefined;
    }
  });
  
  const validateStep = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};
  
    if (!form.value.hasMortgage) {
      errors.hasMortgage = 'Please select whether there is a mortgage in place';
    }
  
    validationErrors.value = errors;
    return Object.keys(errors).length === 0;
  };
  
  const submitStep = async () => {
    if (validateStep()) {
      try {
        const currentFormData = $locally.getItem('formData') || {};
        $locally.setItem('formData', { ...currentFormData, ...form.value })
        await router.push("/send-me-a-lead/steps/5")  // Assuming there's a fifth step, adjust as needed
      } catch (error) {
        console.error('Error saving form data:', error)
        alert('An error occurred while saving your data. Please try again.')
      }
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };
  </script>