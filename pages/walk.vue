<template>
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <div class="mb-4">
          <a href="/" class="text-sm font-semibold leading-7 text-indigo-600"><span aria-hidden="true">&larr;</span> Back to home</a>
        </div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Property Walk Preparation</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Submit details needed before walking a property.</p>
      </div>
      <form @submit.prevent="submitPropertyWalkForm" class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <!-- Property Information -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-semibold leading-6 text-gray-900 mb-2">Property Address *</label>
            <div v-if="!addressSelected">
              <custom-places-auto-complete @updateAddress="handleUpdateAddress" />
            </div>
            <div v-else class="space-y-4">
              <div>
                <label for="street-address" class="block text-sm font-medium text-gray-700">Street Address</label>
                <input 
                  type="text" 
                  id="street-address" 
                  v-model="form.streetAddress" 
                  readonly
                  class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
              </div>
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <input 
                  type="text" 
                  id="city" 
                  v-model="form.city" 
                  readonly
                  class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
              </div>
              <div>
                <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                <input 
                  type="text" 
                  id="state" 
                  v-model="form.state" 
                  readonly
                  class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
              </div>
              <div>
                <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal Code</label>
                <input 
                  type="text" 
                  id="postal-code" 
                  v-model="form.postalCode" 
                  readonly
                  class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
              </div>
              <div class="text-center">
                <button @click="resetAddress" type="button" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  Change Address
                </button>
              </div>
            </div>
          </div>
  
          <!-- Inspection -->
          <div class="sm:col-span-2">
            <label for="inspectionNotes" class="block text-sm font-semibold leading-6 text-gray-900">Inspection Notes</label>
            <textarea name="inspectionNotes" id="inspectionNotes" v-model="form.inspectionNotes" rows="3" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
  
          <!-- EMD (Earnest Money Deposit) -->
          <div>
            <label for="emdAmount" class="block text-sm font-semibold leading-6 text-gray-900">EMD Amount</label>
            <input type="number" name="emdAmount" id="emdAmount" v-model="form.emdAmount" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label for="emdDueDate" class="block text-sm font-semibold leading-6 text-gray-900">EMD Due Date</label>
            <input type="date" name="emdDueDate" id="emdDueDate" v-model="form.emdDueDate" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- TC (Title Company) -->
          <div class="sm:col-span-2">
            <label for="titleCompany" class="block text-sm font-semibold leading-6 text-gray-900">Title Company</label>
            <input type="text" name="titleCompany" id="titleCompany" v-model="form.titleCompany" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Dynamic Image URL Fields -->
          <div class="sm:col-span-2">
            <label for="images" class="block text-sm font-medium leading-6 text-gray-900">Images (URLs)</label>
            <div v-for="(image, index) in form.images" :key="index" class="flex space-x-2 mb-2">
              <input v-model="form.images[index]" type="text" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Image URL">
              <button @click.prevent="removeImage(index)" type="button" class="text-red-500 hover:text-red-700">Remove</button>
            </div>
            <button @click.prevent="addImage" type="button" class="mt-2 text-indigo-500 hover:text-indigo-700">Add Image URL</button>
          </div>
  
          <!-- Underwriting -->
          <div class="sm:col-span-2">
            <label for="underwritingNotes" class="block text-sm font-semibold leading-6 text-gray-900">Underwriting Notes</label>
            <textarea name="underwritingNotes" id="underwritingNotes" v-model="form.underwritingNotes" rows="3" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
        </div>
        <div class="mt-10">
          <button type="submit" :disabled="isSubmitting" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <span>{{isSubmitting ? 'Submitting...' : 'Submit'}}</span>
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>

  definePageMeta({
  layout: 'main'
})
  
  const form = ref({
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    inspectionNotes: '',
    emdAmount: null,
    emdDueDate: '',
    titleCompany: '',
    underwritingNotes: '',
    images: []
  })
  
  const isSubmitting = ref(false)
  const addressSelected = ref(false)
  const router = useRouter()
  
  const isFormValid = computed(() => {
    return addressSelected.value && form.value.inspectionNotes
  })
  
  const handleUpdateAddress = (data) => {
    const [streetAddress, city, stateZip] = data.address.split(', ');
    form.value.streetAddress = streetAddress;
    form.value.city = city;
    const [state, postalCode] = stateZip.split(' ');
    form.value.state = state;
    form.value.postalCode = postalCode;
    addressSelected.value = true;
  };
  
  const resetAddress = () => {
    form.value.streetAddress = '';
    form.value.city = '';
    form.value.state = '';
    form.value.postalCode = '';
    addressSelected.value = false;
  };
  
  const addImage = () => {
    form.value.images.push('');
  };
  
  const removeImage = (index) => {
    form.value.images.splice(index, 1);
  };
  
  const submitPropertyWalkForm = async () => {
    if (!isFormValid.value) {
      alert('Please fill in all required fields and select a property address.');
      return;
    }
  
    isSubmitting.value = true;
  
    const backendUrl = '/.netlify/functions/propertyWalkWebhook';
  
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lead: { ...form.value } })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      alert('Property walk preparation form submitted successfully!');
      Object.keys(form.value).forEach(key => {
        if (key === 'images') {
          form.value[key] = [];
        } else {
          form.value[key] = '';
        }
      });
      form.value.emdAmount = null;
      addressSelected.value = false;
      await router.push('/');
    } catch (error) {
      console.error('Error submitting property walk form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>