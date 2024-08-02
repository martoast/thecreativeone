<template>
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <div class="mb-4">
          <a href="/" class="text-sm font-semibold leading-7 text-indigo-600"><span aria-hidden="true">&larr;</span> Back to home</a>
        </div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Land Sale</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Submit details about a parcel for sale.</p>
      </div>
      <form @submit.prevent="submitLandSaleForm" class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <!-- Seller Information -->
        <div>
          <label for="firstName" class="block text-sm font-semibold leading-6 text-gray-900">First Name *</label>
          <input type="text" name="firstName" id="firstName" v-model="form.firstName" required class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-semibold leading-6 text-gray-900">Last Name *</label>
          <input type="text" name="lastName" id="lastName" v-model="form.lastName" required class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email *</label>
          <input type="email" name="email" id="email" v-model="form.email" required class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">Phone *</label>
          <input type="tel" name="phone" id="phone" v-model="form.phone" required class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
          
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
          <div class="sm:col-span-2">
            <label for="apn" class="block text-sm font-semibold leading-6 text-gray-900">APN</label>
            <input type="text" name="apn" id="apn" v-model="form.apn" :required="!form.propertyAddress" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label for="lotSize" class="block text-sm font-semibold leading-6 text-gray-900">Lot Size</label>
            <input type="text" name="lotSize" id="lotSize" v-model="form.lotSize" required class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label for="askingPrice" class="block text-sm font-semibold leading-6 text-gray-900">Asking Price</label>
            <input type="number" name="askingPrice" id="askingPrice" v-model="form.askingPrice" required class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div class="sm:col-span-2">
            <label for="utilities" class="block text-sm font-semibold leading-6 text-gray-900">Utilities</label>
            <select name="utilities" id="utilities" v-model="form.utilities" required class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="">Select options</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label for="roadAccess" class="block text-sm font-semibold leading-6 text-gray-900">Development Status</label>
            <select name="roadAccess" id="roadAccess" v-model="form.roadAccess" required class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="">Select status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label for="easements" class="block text-sm font-semibold leading-6 text-gray-900">Easements</label>
            <input type="text" name="easements" id="easements" v-model="form.easements" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div class="sm:col-span-2">
            <label for="developmentStatus" class="block text-sm font-semibold leading-6 text-gray-900">Development Status</label>
            <select name="developmentStatus" id="developmentStatus" v-model="form.developmentStatus" required class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="">Select status</option>
              <option value="undeveloped">Undeveloped</option>
              <option value="readyToBuild">Ready to build</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label for="zoning" class="block text-sm font-semibold leading-6 text-gray-900">Zoning</label>
            <input type="text" name="zoning" id="zoning" v-model="form.zoning" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div class="sm:col-span-2">
            <label for="wildlifeProtections" class="block text-sm font-semibold leading-6 text-gray-900">Wildlife Protections</label>
            <textarea name="wildlifeProtections" id="wildlifeProtections" v-model="form.wildlifeProtections" rows="3" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
          <div class="sm:col-span-2">
            <label for="restrictions" class="block text-sm font-semibold leading-6 text-gray-900">Restrictions</label>
            <textarea name="restrictions" id="restrictions" v-model="form.restrictions" rows="3" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
          
          <!-- Terms and Conditions Checkbox -->
          <div class="sm:col-span-2">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  v-model="form.acceptTerms"
                  required
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-medium text-gray-700">Accept Terms and Conditions</label>
                <p class="text-gray-500">I agree to the <a href="/terms-of-service" class="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a> and <a href="/privacy-policy" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.</p>
              </div>
            </div>
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
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  fullAddress: '',
  streetAddress: '',
  city: '',
  state: '',
  postalCode: '',
  apn: '',
  lotSize: '',
  askingPrice: '',
  utilities: '',
  roadAccess: '',
  easements: '',
  developmentStatus: '',
  zoning: '',
  wildlifeProtections: '',
  restrictions: '',
  acceptTerms: false
})

const isSubmitting = ref(false)
const addressSelected = ref(false)
const router = useRouter()

const isFormValid = computed(() => {
  return form.value.firstName && 
         form.value.lastName && 
         form.value.email && 
         form.value.phone && 
         addressSelected.value &&
         form.value.acceptTerms
})

const handleUpdateAddress = (data) => {
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
  form.value.fullAddress = '';
  form.value.streetAddress = '';
  form.value.city = '';
  form.value.state = '';
  form.value.postalCode = '';
  addressSelected.value = false;
};

const submitLandSaleForm = async () => {
  if (!isFormValid.value) {
    alert('Please fill in all required fields, select a property address, and accept the terms and conditions.');
    return;
  }

  isSubmitting.value = true;

  const backendUrl = '/.netlify/functions/landSaleWebhook';
  const headers = {
    'Content-Type': 'application/json'
  };

  const payload = {
    lead: {
      ...form.value,
      fullName: `${form.value.firstName} ${form.value.lastName}`
    }
  };

  console.log(payload)

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    alert('Land sale form submitted successfully!');
    Object.keys(form.value).forEach(key => form.value[key] = ''); // Reset form
    addressSelected.value = false;
    await router.push('/');
  } catch (error) {
    console.error('Error submitting land sale form:', error);
    alert('There was an error submitting the form. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>