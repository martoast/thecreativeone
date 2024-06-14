<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get funded</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Submit your request for funding and we'll get back to you as soon as possible.</p>
    </div>
    <form @submit.prevent="submitFundingRequest" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <AlertComponent :show="showAlert" @update:show="showAlert = $event" message="Sent Successfully" />
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <!-- Address Fields -->
        <div class="sm:col-span-2">
          <label for="address" class="block text-sm font-medium leading-6 text-gray-900 mb-2">Address</label>
          <div v-if="!addressSelected">
            <custom-places-auto-complete @updateAddress="handleUpdateAddress" />
          </div>
          <div v-else class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="streetAddress" class="block text-sm font-medium leading-6 text-gray-900">Street Address</label>
              <input type="text" name="streetAddress" id="streetAddress" v-model="form.streetAddress" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div>
              <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
              <input type="text" name="city" id="city" v-model="form.city" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div>
              <label for="state" class="block text-sm font-medium leading-6 text-gray-900">State</label>
              <input type="text" name="state" id="state" v-model="form.state" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div class="sm:col-span-2">
              <label for="postalCode" class="block text-sm font-medium leading-6 text-gray-900">Postal Code</label>
              <input type="text" name="postalCode" id="postalCode" v-model="form.postalCode" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <button @click="resetAddress" type="button" class="text-sm font-semibold leading-6 text-indigo-600 sm:col-span-2">Change Address</button>
          </div>
        </div>
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
          <label for="notes" class="block text-sm font-semibold leading-6 text-gray-900">Notes</label>
          <textarea id="notes" name="notes" v-model="form.notes" rows="4" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
        
      </div>
      <div class="mt-10">
        <button type="submit" :disabled="isSubmitting" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <span>{{isSubmitting ? 'Loading...' : 'Submit'}}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
        layout: 'main'
    });

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  notes: '',
  streetAddress: '',
  city: '',
  state: '',
  postalCode: '',
  fullAddress: ''
})

const isSubmitting = ref(false)
const showAlert = ref(false)
const addressSelected = ref(false)

const router = useRouter()

const submitFundingRequest = async () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.phone) {
    return;
  }

  isSubmitting.value = true;

  const backendUrl = '/.netlify/functions/fundingWebhook';
  const headers = {
    'Content-Type': 'application/json'
  };

  const payload = {
    lead: {
      ...form.value,
      fullName: `${form.value.firstName} ${form.value.lastName}`,
      address: `${form.value.streetAddress}, ${form.value.city}, ${form.value.state} ${form.value.postalCode}`
    }
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

const handleUpdateAddress = (data) => {
  form.value.fullAddress = data.address
  const [streetAddress, city, stateZip] = data.address.split(', ')
  form.value.streetAddress = streetAddress
  form.value.city = city
  const [state, postalCode] = stateZip.split(' ')
  form.value.state = state
  form.value.postalCode = postalCode
  addressSelected.value = true
}

const resetAddress = () => {
  addressSelected.value = false
  form.value.streetAddress = null
  form.value.city = null
  form.value.state = null
  form.value.postalCode = null
  form.value.fullAddress = null
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
