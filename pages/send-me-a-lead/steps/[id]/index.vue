<template>
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center pb-8">
        <div class="mb-4">
          <a href="/" class="text-sm font-semibold leading-7 text-indigo-600"><span aria-hidden="true">&larr;</span> Back to home</a>
        </div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Send me a lead</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Whether you're buying or selling a property, we are interested.</p>
      </div>
      
      <SendMeLeadForm 
        :current-step="currentStep" 
        :initial-form-data="formData"
        @update:current-step="updateCurrentStep"
        @update:form-data="updateFormData"
        @submit-lead="submitLead" 
        />
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import debounce from 'lodash.debounce'
  
  definePageMeta({
    layout: 'main'
    });

    const route = useRoute();
    const router = useRouter();

    const currentStep = ref(parseInt(route.params.id) || 1);
    const formData = ref({
    contactType: route.query.contactType || 'default',
    address: route.query.address || '',
    });

    const updateCurrentStep = (newStep) => {
    currentStep.value = newStep;
    debouncedNavigateWithState(newStep);
    };

    const updateFormData = (newData) => {
    formData.value = { ...formData.value, ...newData };
    debouncedNavigateWithState(currentStep.value);
    };

    const navigateWithState = (step) => {
    const query = { ...formData.value, step };
    delete query.address; // Remove address from URL to keep it cleaner
    router.push({ path: `/send-me-a-lead/steps/${step}`, query });
    };

    const debouncedNavigateWithState = debounce(navigateWithState, 300);
  
  const submitLead = async (submitFormData) => {
    const contactType = submitFormData.contactType;
    const backendUrl = contactType === 'potentialBuyer' ? '/.netlify/functions/buyerWebhook' : '/.netlify/functions/forwardWebhook';
  
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
  
    const { pipelineId, stageId } = pipelineIdMapping[contactType] || {};
  
    const payload = {
      lead: {
        contactType: contactType,
        fullName: `${submitFormData.firstName} ${submitFormData.lastName}`,
        pipelineId: pipelineId,
        stage: stageId,
        source: 'website',
        ...submitFormData
      }
    };
  
    try {
      const { data, error } = await $fetch(backendUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
  
      if (error) {
        console.error('Error adding lead via serverless function:', error);
        // Handle error (e.g., show an error message)
      } else {
        // Show success message
        alert('Lead submitted successfully!');
        // Reset form and clear URL parameters
        formData.value = { contactType: 'default' };

        await navigateTo('/')
        // Open new tab
        window.open("https://beacons.ai/e_steban", "mozillaTab");
      }
    } catch (err) {
      console.error('Error adding lead via serverless function:', err);
      alert('Error adding lead via serverless function:', err)
      // Handle error (e.g., show an error message)
    }
  };
  
// Modify the watch function to use the debounced navigation
watch(() => route.query, (newQuery) => {
  if (Object.keys(newQuery).length > 0) {
    const newFormData = { ...newQuery };
    delete newFormData.step; // Remove step from formData
    if (JSON.stringify(newFormData) !== JSON.stringify(formData.value)) {
      formData.value = newFormData;
    }
    const newStep = parseInt(newQuery.step) || 1;
    if (newStep !== currentStep.value) {
      currentStep.value = newStep;
    }
  }
}, { deep: true });

onMounted(() => {
  // Initialize form data from URL parameters on component mount
  if (Object.keys(route.query).length > 0) {
    const newFormData = { ...route.query };
    delete newFormData.step; // Remove step from formData
    formData.value = newFormData;
    currentStep.value = parseInt(route.query.step) || 1;
  }
});
  </script>