<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <div class="mb-4">
          <a href="/" class="text-sm font-semibold leading-7 text-indigo-600"><span aria-hidden="true">&larr;</span> Back to home</a>
      </div>
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get funding</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Submit your request for funding and we'll get back to you as soon as possible.</p>
    </div>
    <form @submit.prevent="submitFundingRequest" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <!-- Name -->
        <div class="sm:col-span-2">
          <label for="firstName" class="block text-sm font-semibold leading-6 text-gray-900">First Name</label>
          <input type="text" name="firstName" id="firstName" v-model="form.firstName" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="lastName" class="block text-sm font-semibold leading-6 text-gray-900">Last Name</label>
          <input type="text" name="lastName" id="lastName" v-model="form.lastName" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- Phone Number -->
        <div class="sm:col-span-2">
          <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">Phone Number</label>
          <input type="tel" name="phone" id="phone" v-model="form.phone" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- Email -->
        <div class="sm:col-span-2">
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
          <input type="email" name="email" id="email" v-model="form.email" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- What Kind of Funding Do You Need? -->
        <div class="sm:col-span-2">
          <label for="fundingType" class="block text-sm font-semibold leading-6 text-gray-900">What Kind of Funding Do You Need?</label>
          <select id="fundingType" name="fundingType" v-model="form.fundingType" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="">Please Select</option>
            <option value="EMD">EMD</option>
            <option value="TRANSACTIONAL LENDING">TRANSACTIONAL LENDING</option>
            <option value="PML">PML</option>
            <option value="SOMETHING ELSE">SOMETHING ELSE</option>
          </select>
        </div>

        <!-- What is your experience? -->
        <div class="sm:col-span-2">
          <label for="experience" class="block text-sm font-semibold leading-6 text-gray-900">What is your experience?</label>
          <input type="text" name="experience" id="experience" v-model="form.experience" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <div class="sm:col-span-2">
          <label for="llcName" class="block text-sm font-semibold leading-6 text-gray-900">LLC Name</label>
          <input type="text" name="llcname" id="llcname" v-model="form.llcName" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <div class="sm:col-span-2">
    <label for="llcAddress" class="block text-sm font-medium leading-6 text-gray-900 mb-2">What is your LLC Address?</label>
    <div v-if="!form.llcAddress.selected">
      <custom-places-auto-complete @updateAddress="(data) => handleUpdateAddress(data, 'llc')" />
    </div>
    <div v-else class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="llcStreetAddress" class="block text-sm font-medium leading-6 text-gray-900">Street Address</label>
        <input type="text" name="llcStreetAddress" id="llcStreetAddress" v-model="form.llcAddress.street" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div>
        <label for="llcCity" class="block text-sm font-medium leading-6 text-gray-900">City</label>
        <input type="text" name="llcCity" id="llcCity" v-model="form.llcAddress.city" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div>
        <label for="llcState" class="block text-sm font-medium leading-6 text-gray-900">State</label>
        <input type="text" name="llcState" id="llcState" v-model="form.llcAddress.state" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div class="sm:col-span-2">
        <label for="llcPostalCode" class="block text-sm font-medium leading-6 text-gray-900">Postal Code</label>
        <input type="text" name="llcPostalCode" id="llcPostalCode" v-model="form.llcAddress.postalCode" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <button @click="resetAddress('llc')" type="button" class="text-sm font-semibold leading-6 text-indigo-600 sm:col-span-2">Change Address</button>
    </div>
  </div>

  <div class="sm:col-span-2">
    <label for="propertyAddress" class="block text-sm font-medium leading-6 text-gray-900 mb-2">What is the full property Address?</label>
    <div v-if="!form.propertyAddress.selected">
      <custom-places-auto-complete @updateAddress="(data) => handleUpdateAddress(data, 'property')" />
    </div>
    <div v-else class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="propertyStreetAddress" class="block text-sm font-medium leading-6 text-gray-900">Street Address</label>
        <input type="text" name="propertyStreetAddress" id="propertyStreetAddress" v-model="form.propertyAddress.street" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div>
        <label for="propertyCity" class="block text-sm font-medium leading-6 text-gray-900">City</label>
        <input type="text" name="propertyCity" id="propertyCity" v-model="form.propertyAddress.city" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div>
        <label for="propertyState" class="block text-sm font-medium leading-6 text-gray-900">State</label>
        <input type="text" name="propertyState" id="propertyState" v-model="form.propertyAddress.state" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div class="sm:col-span-2">
        <label for="propertyPostalCode" class="block text-sm font-medium leading-6 text-gray-900">Postal Code</label>
        <input type="text" name="propertyPostalCode" id="propertyPostalCode" v-model="form.propertyAddress.postalCode" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <button @click="resetAddress('property')" type="button" class="text-sm font-semibold leading-6 text-indigo-600 sm:col-span-2">Change Address</button>
    </div>
  </div>

        <!-- Is this a mutual release state? -->
        <div class="sm:col-span-2">
          <label for="mutualReleaseState" class="block text-sm font-semibold leading-6 text-gray-900">Is this a mutual release state?</label>
          <select id="mutualReleaseState" name="mutualReleaseState" v-model="form.mutualReleaseState" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="">Please Select</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>

       
        <!-- Amount of money needed? -->
        <div class="sm:col-span-2">
          <label for="amountNeeded" class="block text-sm font-semibold leading-6 text-gray-900">Amount of money needed?</label>
          <input type="text" name="amountNeeded" id="amountNeeded" v-model="form.amountNeeded" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- When does it need to be funded? -->
        <div class="sm:col-span-2">
          <label for="fundingDate" class="block text-sm font-semibold leading-6 text-gray-900">When does it need to be funded?</label>
          <input type="date" name="fundingDate" id="fundingDate" v-model="form.fundingDate" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- What type of deal is this? -->
        <div class="sm:col-span-2">
          <label for="dealType" class="block text-sm font-semibold leading-6 text-gray-900">What type of deal is this?</label>
          <select id="dealType" name="dealType" v-model="form.dealType" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="">Please Select</option>
            <option value="Transactional (1-7 Days)">Transactional (1-7 Days)</option>
            <option value="EMD (30-60 Days Close)">EMD (30-60 Days Close)</option>
          </select>
        </div>

        <!-- When does Due Diligence end? -->
        <div class="sm:col-span-2">
          <label for="dueDiligenceEnd" class="block text-sm font-semibold leading-6 text-gray-900">When does Due Diligence end? (EMD only, if not EMD put C.O.E date)</label>
          <input type="text" name="dueDiligenceEnd" id="dueDiligenceEnd" v-model="form.dueDiligenceEnd" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- What is the exit strategy? -->
        <div class="sm:col-span-2">
          <label for="exitStrategy" class="block text-sm font-semibold leading-6 text-gray-900">What is the exit strategy? (Money Making Strategy)</label>
          <input type="text" name="exitStrategy" id="exitStrategy" v-model="form.exitStrategy" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- Where are OUR profits coming from? -->
        <div class="sm:col-span-2">
          <label for="profitSource" class="block text-sm font-semibold leading-6 text-gray-900">Where are OUR profits coming from? How do we get paid?</label>
          <input type="text" name="profitSource" id="profitSource" v-model="form.profitSource" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- When is close of Escrow? -->
        <div class="sm:col-span-2">
          <label for="escrowCloseDate" class="block text-sm font-semibold leading-6 text-gray-900">When is close of Escrow?</label>
          <input type="date" name="escrowCloseDate" id="escrowCloseDate" v-model="form.escrowCloseDate" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
       

        <!-- Title Company & Closing Attorney -->
        <div class="sm:col-span-2">
          <label for="titleCompany" class="block text-sm font-semibold leading-6 text-gray-900">Title Company & Closing Attorney</label>
          <input type="text" name="titleCompany" id="titleCompany" v-model="form.titleCompany" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  fundingType: "",
  experience: "",
  llcName: "",
  llcAddress: {
    street: "",
    city: "",
    state: "",
    postalCode: ""
  },
  propertyAddress: {
    street: "",
    city: "",
    state: "",
    postalCode: ""
  },
  mutualReleaseState: "",
  amountNeeded: "",
  fundingDate: "",
  dealType: "",
  dueDiligenceEnd: "",
  exitStrategy: "",
  profitSource: "",
  escrowCloseDate: "",
  titleCompany: ""
});

const isSubmitting = ref(false)
const showAlert = ref(false)
const llcAddressSelected = ref(false)
const propertyAddressSelected = ref(false)

const handleUpdateAddress = (data, addressType) => {
  const addressObj = form.value[`${addressType}Address`];
  addressObj.fullAddress = data.address;
  const [streetAddress, city, stateZip] = data.address.split(', ');
  addressObj.street = streetAddress;
  addressObj.city = city;
  const [state, postalCode] = stateZip.split(' ');
  addressObj.state = state;
  addressObj.postalCode = postalCode;
  addressObj.selected = true;
};

const resetAddress = (addressType) => {
  const addressObj = form.value[`${addressType}Address`];
  addressObj.fullAddress = "";
  addressObj.street = "";
  addressObj.city = "";
  addressObj.state = "";
  addressObj.postalCode = "";
  addressObj.selected = false;
};



const submitFundingRequest = async () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.phone) {
    alert('Please fill in all required fields');
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
      llcAddress: form.value.llcAddress.fullAddress,
      propertyAddress: form.value.propertyAddress.fullAddress
    }
  };

  try {
    const { data, error } = await fetch(backendUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (error.value) {
      console.error('Error adding lead via serverless function:', error);
      // Handle error (e.g., show an error message)
    } else {
      alert('Submitted successfully!');
    }


    // Reset form
    Object.keys(form.value).forEach(key => {
      if (typeof form.value[key] === 'object') {
        Object.keys(form.value[key]).forEach(subKey => {
          form.value[key][subKey] = '';
        });
      } else {
        form.value[key] = '';
      }
    });
    llcAddressSelected.value = false;
    propertyAddressSelected.value = false;
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error submitting the form. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>