<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Funding Form</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Submit your request for funding and we'll get back to you as soon as possible.</p>
    </div>
    <form @submit.prevent="submitFundingRequest" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label for="firstName" class="block text-sm font-semibold leading-6 text-gray-900">First Name</label>
          <input type="text" name="firstName" id="firstName" v-model="form.firstName" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-semibold leading-6 text-gray-900">Last Name</label>
          <input type="text" name="lastName" id="lastName" v-model="form.lastName" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
          <input id="email" name="email" type="email" v-model="form.email" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">Phone</label>
          <input type="text" name="phone" id="phone" v-model="form.phone" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="companyName" class="block text-sm font-semibold leading-6 text-gray-900">Company Name</label>
          <input type="text" name="companyName" id="companyName" v-model="form.companyName" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      
        <div class="sm:col-span-2">
          <label for="description" class="block text-sm font-semibold leading-6 text-gray-900">Description</label>
          <textarea id="description" name="description" v-model="form.description" rows="4" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
      </div>
      <div class="mt-10">
        <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'main'
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  description: ''
})

const submitFundingRequest = async () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.phone) {
    return;
  }

  const isSubmitting = ref(false);
  const showAlert = ref(false);

  isSubmitting.value = true;

  const backendUrl = '/.netlify/functions/fundingWebhook';
  const headers = {
    'Content-Type': 'application/json'
  };

  const payload = {
    lead: form.value
  };


  const { data, error } = await useFetch(backendUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  });

  if (error.value) {
    console.error('Error adding lead via serverless function:', error);
    // Handle error (e.g., show an error message)
  } else {
    showAlert.value = true;
    Object.keys(form.value).forEach(key => form.value[key] = ''); // Reset form
  }

  isSubmitting.value = false;
};
</script>
