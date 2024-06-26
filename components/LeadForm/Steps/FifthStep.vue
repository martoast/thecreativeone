<template>
    <form @submit.prevent="submitForm" class="mt-8">
      <div class="space-y-6">
        <!-- Step 5: Additional Information -->
        <div class="space-y-4">
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
            <textarea 
              id="notes" 
              v-model="form.notes" 
              rows="4" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              aria-describedby="notes-error"
            ></textarea>
            <p v-if="validationErrors.notes" id="notes-error" class="mt-2 text-sm text-red-600">{{ validationErrors.notes }}</p>
          </div>
        </div>
      </div>
  
      <div class="mt-8 flex justify-between">
        <a href="/send-me-a-lead/steps/4">
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
          Submit
        </button>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue'
  import type { PropType, Ref } from 'vue'
  import { useNuxtApp, useRouter } from '#app'
  import { useFetch } from '#imports'
  
  interface FormData {
    notes: string;
    contactType: string;
    firstName: string;
    lastName: string;
    [key: string]: any; // To allow for additional properties from previous steps
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
    // Add validation if needed
    validationErrors.value = errors;
    return Object.keys(errors).length === 0;
  };
  
  const submitLead = async (submitFormData: FormData) => {
    const contactType = submitFormData.contactType;
    const backendUrl =  '/.netlify/functions/leadWebhook';
  
    const headers = {
      'Content-Type': 'application/json'
    };
  
    const pipelineIdMapping = {
      wholesaler: { pipelineId: 'lcpnUC4WGbo7AdpsGvbK', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
      agent: { pipelineId: 'CmoxROP6NCUPt3tNdVB3', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
      lender: { pipelineId: 'ChlY1BFP3YHcW5Rliaxn', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
      relativeOfOwner: { pipelineId: 'ggXgJdSyvjLdgCFNQfwp', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
      verifiedOwner: { pipelineId: 'ggXgJdSyvjLdgCFNQfwp', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
      potentialBuyer: { pipelineId: 'hq6yosICCNVfFK6JaZNn', stageId: '3fcc83d0-7e37-46b1-912b-457cc032e140' }
    };
  
    const { pipelineId, stageId } = pipelineIdMapping[contactType as keyof typeof pipelineIdMapping] || {};
  
    const payload = {
      lead: {
        fullName: `${submitFormData.firstName} ${submitFormData.lastName}`,
        pipelineId: pipelineId,
        stage: stageId,
        source: 'website',
        ...submitFormData
      }
    };
  
    try {
      const { data, error } = await useFetch(backendUrl, {
        method: 'POST',
        headers: headers,
        body: payload
      });
  
      if (error.value) {
        console.error('Error adding lead via serverless function:', error.value);
        throw new Error('Error adding lead');
      } else {
        alert('Lead submitted successfully!');
        $locally.setItem('formData', null);
        await router.push('/');
        // window.open("https://beacons.ai/e_steban", "mozillaTab");
      }
    } catch (err) {
      console.error('Error adding lead via serverless function:', err);
      alert('Error adding lead via serverless function: ' + (err instanceof Error ? err.message : String(err)));
      throw err;
    }
  };
  
  const submitForm = async () => {
    if (validateStep()) {
      try {
        const currentFormData = $locally.getItem('formData') || {};
        const finalFormData = { ...currentFormData, ...form.value };
        await submitLead(finalFormData as FormData);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting your data. Please try again.');
      }
    } else {
      alert('Please fill in all required fields before submitting.');
    }
  };
  </script>