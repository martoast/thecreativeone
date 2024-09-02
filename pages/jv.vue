<template>
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <div class="mb-4">
          <a href="/" class="text-sm font-semibold leading-7 text-indigo-600"><span aria-hidden="true">&larr;</span> Back to home</a>
        </div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Joint Venture Form</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Submit your joint venture proposal and we'll get back to you as soon as possible.</p>
      </div>
      <form @submit.prevent="submitJointVentureForm" class="mx-auto mt-16 max-w-xl sm:mt-20">
        <AlertComponent :show="showAlert" @update:show="showAlert = $event" message="Sent Successfully" />
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <!-- Name -->
          <div class="sm:col-span-2">
            <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
            <input type="text" name="name" id="name" v-model="form.name" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Number -->
          <div class="sm:col-span-2">
            <label for="phone_number" class="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
            <input type="tel" name="phone_numbe " id="phone_number" v-model="form.phone_number" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Email -->
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
            <input type="email" name="email" id="email" v-model="form.email" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Are you the contract holder? -->
          <div class="sm:col-span-2">
            <label for="contractHolder" class="block text-sm font-semibold leading-6 text-gray-900">Are you the contract holder?</label>
            <select id="contractHolder" name="contractHolder" v-model="form.contractHolder" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="">Please Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
  
          <!-- Are you direct to the seller? -->
          <div class="sm:col-span-2">
            <label for="directToSeller" class="block text-sm font-semibold leading-6 text-gray-900">Are you direct to the seller?</label>
            <select id="directToSeller" name="directToSeller" v-model="form.directToSeller" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="">Please Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
  
          <!-- Asking price -->
          <div class="sm:col-span-2">
            <label for="askingPrice" class="block text-sm font-semibold leading-6 text-gray-900">Asking price</label>
            <input type="number" name="askingPrice" id="askingPrice" v-model="form.askingPrice" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Type of deal -->
          <div class="sm:col-span-2">
            <label for="dealType" class="block text-sm font-semibold leading-6 text-gray-900">Type of deal</label>
            <select id="dealType" name="dealType" v-model="form.dealType" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="">Please Select</option>
              <option value="subto">Subject To</option>
              <option value="sellerFinance">Seller Finance</option>
              <option value="cash">Cash</option>
            </select>
          </div>
  
          <!-- What are the terms? -->
          <div class="sm:col-span-2">
            <label for="terms" class="block text-sm font-semibold leading-6 text-gray-900">What are the terms?</label>
            <textarea id="terms" name="terms" v-model="form.terms" rows="3" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
  
          <!-- ARV -->
          <div class="sm:col-span-2">
            <label for="arv" class="block text-sm font-semibold leading-6 text-gray-900">ARV (After Repair Value)</label>
            <input type="number" name="arv" id="arv" v-model="form.arv" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Cash to close? -->
          <div class="sm:col-span-2">
            <label for="cashToClose" class="block text-sm font-semibold leading-6 text-gray-900">Cash to close?</label>
            <input type="number" name="cashToClose" id="cashToClose" v-model="form.cashToClose" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Rental comps -->
          <div class="sm:col-span-2">
            <label for="rentalComps" class="block text-sm font-semibold leading-6 text-gray-900">Rental comps</label>
            <textarea id="rentalComps" name="rentalComps" v-model="form.rentalComps" rows="3" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
  
          <!-- Enter recent comps if any -->
          <div class="sm:col-span-2">
            <label for="recentComps" class="block text-sm font-semibold leading-6 text-gray-900">Enter recent comps if any</label>
            <textarea id="recentComps" name="recentComps" v-model="form.recentComps" rows="3" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
  
          <!-- Property details -->
          <div class="sm:col-span-2">
            <h3 class="text-lg font-semibold leading-7 text-gray-900">Property details</h3>
          </div>
  
          <!-- Address -->
          <div class="sm:col-span-2">
            <label for="address" class="block text-sm font-semibold leading-6 text-gray-900">Address</label>
            <div v-if="!form.address.selected">
              <custom-places-auto-complete @updateAddress="handleAddressUpdate" />
            </div>
            <div v-else class="mt-2.5">
              <p>{{ form.address.fullAddress }}</p>
              <button @click="resetAddress" type="button" class="text-sm font-semibold leading-6 text-indigo-600">Change Address</button>
            </div>
            
          </div>
  
          <!-- Has HOA? -->
          <div class="sm:col-span-2">
            <label for="hasHoa" class="block text-sm font-semibold leading-6 text-gray-900">Has HOA?</label>
            <select id="hasHoa" name="hasHoa" v-model="form.hasHoa" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="">Please Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
  
          <!-- Bed -->
          <div>
            <label for="bed" class="block text-sm font-semibold leading-6 text-gray-900">Bed</label>
            <input type="number" name="bed" id="bed" v-model="form.bed" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Bath -->
          <div>
            <label for="bath" class="block text-sm font-semibold leading-6 text-gray-900">Bath</label>
            <input type="number" name="bath" id="bath" v-model="form.bath" step="0.5" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Sqft. count -->
          <div>
            <label for="sqftCount" class="block text-sm font-semibold leading-6 text-gray-900">Sqft. count</label>
            <input type="number" name="sqftCount" id="sqftCount" v-model="form.sqftCount" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
          <!-- Lot sqft -->
          <div>
            <label for="lotSqft" class="block text-sm font-semibold leading-6 text-gray-900">Lot sqft</label>
            <input type="number" name="lotSqft" id="lotSqft" v-model="form.lotSqft" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
  
         <!-- Year built -->
        <div>
          <label for="yearBuilt" class="block text-sm font-semibold leading-6 text-gray-900">Year built</label>
          <input type="number" name="yearBuilt" id="yearBuilt" v-model="form.yearBuilt" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- Occupancy status -->
        <div class="sm:col-span-2">
          <label for="occupancyStatus" class="block text-sm font-semibold leading-6 text-gray-900">Occupancy status</label>
          <select id="occupancyStatus" name="occupancyStatus" v-model="form.occupancyStatus" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="">Please Select</option>
            <option value="occupied">Occupied</option>
            <option value="vacant">Vacant</option>
          </select>
        </div>

        <!-- Condition -->
        <div class="sm:col-span-2">
          <label for="condition" class="block text-sm font-semibold leading-6 text-gray-900">Condition</label>
          <select id="condition" name="condition" v-model="form.condition" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="">Please Select</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <!-- If it needs condition -->
        <div v-if="form.condition === 'fair' || form.condition === 'poor'" class="sm:col-span-2">
          <div class="sm:col-span-2 mt-2">
          <label for="workNeeded" class="block text-sm font-semibold leading-6 text-gray-900">Work Needed</label>
          <select id="workNeede" name="workNeeded" v-model="form.workNeeded" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="">Please Select</option>
            <option value="good">Alot</option>
            <option value="fair">Moderate</option>
            <option value="poor">Not Much</option>
          </select>
        </div>
          <div class="mt-4">
            <label for="priceEstimate" class="block text-sm font-semibold leading-6 text-gray-900">Price estimate (if available)</label>
            <input type="number" name="priceEstimate" id="priceEstimate" v-model="form.priceEstimate" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- Can our buyers access the home? -->
        <div class="sm:col-span-2">
          <label for="buyerAccess" class="block text-sm font-semibold leading-6 text-gray-900">Can our buyers access the home? If so, how can we set up showings?</label>
          <textarea id="buyerAccess" name="buyerAccess" v-model="form.buyerAccess" rows="3" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>

        <!-- EMD amount -->
        <div class="sm:col-span-2">
          <label for="emdAmount" class="block text-sm font-semibold leading-6 text-gray-900">EMD amount</label>
          <input type="number" name="emdAmount" id="emdAmount" v-model="form.emdAmount" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>

        <!-- Date of closing -->
        <div class="sm:col-span-2">
          <label for="closingDate" class="block text-sm font-semibold leading-6 text-gray-900">Date of closing</label>
          <input type="date" name="closingDate" id="closingDate" v-model="form.closingDate" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>


    
        <!-- 70/30 split agreement -->
        <div class="sm:col-span-2">
          <label for="splitAgreement" class="block text-sm font-semibold leading-6 text-gray-900">Are you okay with a 70(you)/30(us) split?</label>
          <select id="splitAgreement" name="splitAgreement" v-model="form.splitAgreement" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="">Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
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
  name: "",
  phone_number: "",
  email: "",
  contractHolder: "",
  directToSeller: "",
  askingPrice: null,
  dealType: "",
  terms: "",
  arv: null,
  cashToClose: null,
  rentalComps: "",
  recentComps: "",
  address: {
    fullAddress: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    selected: false
  },
  hasHoa: "",
  bed: null,
  bath: null,
  sqftCount: null,
  lotSqft: null,
  yearBuilt: null,
  occupancyStatus: "",
  condition: "",
  workNeeded: "",
  priceEstimate: null,
  buyerAccess: "",
  emdAmount: null,
  closingDate: "",
  splitAgreement: ""
});

const isSubmitting = ref(false)
const showAlert = ref(false)

const router = useRouter()

const handleAddressUpdate = (data) => {
  form.value.address.fullAddress = data.address;
  const [streetAddress, city, stateZip] = data.address.split(', ');
  form.value.address.street = streetAddress;
  form.value.address.city = city;
  const [state, postalCode] = stateZip.split(' ');
  form.value.address.state = state;
  form.value.address.postalCode = postalCode;
  form.value.address.selected = true;
};

const resetAddress = () => {
  form.value.address = {
    fullAddress: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    selected: false
  };
};

const submitJointVentureForm = async () => {
  if (!form.value.name || !form.value.phone_number || !form.value.email) {
    alert('Please fill in all required fields');
    return;
  }

  isSubmitting.value = true;

  const backendUrl = '/.netlify/functions/jointVentureWebhook';
  const headers = {
    'Content-Type': 'application/json'
  };

  const payload = {
    lead: {
      ...form.value,
      address: form.value.address.fullAddress
    }
  };

  try {
    await fetch(backendUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    alert('Submitted successfully!');
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
    form.value.address.selected = false;
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error submitting the form. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>