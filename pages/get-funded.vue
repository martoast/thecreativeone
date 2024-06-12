<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Funding Form</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Submit your request for funding and we'll get back to you as soon as possible.</p>
    </div>
    <form @submit.prevent="submitFundingRequest" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
          <input type="text" name="name" id="name" v-model="funding.name" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="best-time-to-contact" class="block text-sm font-semibold leading-6 text-gray-900">Best time to contact</label>
          <input type="time" name="best-time-to-contact" id="best-time-to-contact" v-model="funding.best_time_to_contact" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="best-contact-method" class="block text-sm font-semibold leading-6 text-gray-900">Best contact method</label>
          <select id="best-contact-method" name="best-contact-method" v-model="funding.best_contact_method" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="">Select a method</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
          </select>
        </div>
        <div>
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
          <input id="email" name="email" type="email" v-model="funding.email" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="phone-number" class="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
          <input type="text" name="phone-number" id="phone-number" v-model="funding.phone_number" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="address" class="block text-sm font-semibold leading-6 text-gray-900">Address</label>
          <input type="text" name="address" id="address" v-model="funding.address" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="type-of-funding" class="block text-sm font-semibold leading-6 text-gray-900">Type of funding</label>
          <select id="type-of-funding" name="type-of-funding" v-model="funding.type_of_funding" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option>EMD</option>
            <option>Transactional Lending</option>
            <option>PML</option>
            <option>Something else</option>
          </select>
        </div>
        <div>
          <label for="subject-property" class="block text-sm font-semibold leading-6 text-gray-900">Subject property?</label>
          <input type="text" name="subject-property" id="subject-property" v-model="funding.subject_property" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="under-contract" class="block text-sm font-semibold leading-6 text-gray-900">Under contract?</label>
          <select id="under-contract" name="under-contract" v-model="funding.under_contract" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option>Yes</option>
            <option>No</option>
            <option>I'm Owner</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label for="title-company" class="block text-sm font-semibold leading-6 text-gray-900">Name of Title Company or Closing Attorney</label>
          <input type="text" name="title-company" id="title-company" v-model="funding.title_company" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="inspection-in-place" class="block text-sm font-semibold leading-6 text-gray-900">Inspection in place?</label>
          <select id="inspection-in-place" name="inspection-in-place" v-model="funding.inspection_in_place" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div>
          <label for="have-pictures" class="block text-sm font-semibold leading-6 text-gray-900">Do you have pictures?</label>
          <select id="have-pictures" name="have-pictures" v-model="funding.have_pictures" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div>
          <label for="coe-date" class="block text-sm font-semibold leading-6 text-gray-900">C.O.E</label>
          <input type="date" name="coe-date" id="coe-date" v-model="funding.coe_date" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div v-if="funding.type_of_funding === 'PML' || funding.type_of_funding === 'Transactional Lending'" class="sm:col-span-2">
          <label for="mortgage-documents" class="block text-sm font-semibold leading-6 text-gray-900">Mortgage Documents</label>
          <input type="file" name="mortgage-documents" id="mortgage-documents" @change="handleFileUpload" class="mt-2.5 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
        </div>
        <div v-if="funding.type_of_funding === 'PML' || funding.type_of_funding === 'Transactional Lending'">
          <label for="mortgage-balance" class="block text-sm font-semibold leading-6 text-gray-900">What is the mortgage balance?</label>
          <input type="number" name="mortgage-balance" id="mortgage-balance" v-model="funding.mortgage_balance" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div v-if="funding.type_of_funding === 'PML' || funding.type_of_funding === 'Transactional Lending'">
          <label for="type-of-loan" class="block text-sm font-semibold leading-6 text-gray-900">Type of loan?</label>
          <input type="text" name="type-of-loan" id="type-of-loan" v-model="funding.type_of_loan" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div v-if="funding.type_of_funding === 'PML' || funding.type_of_funding === 'Transactional Lending'">
          <label for="loan-maturity" class="block text-sm font-semibold leading-6 text-gray-900">Loan maturity?</label>
          <input type="date" name="loan-maturity" id="loan-maturity" v-model="funding.loan_maturity" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div v-if="funding.type_of_funding === 'PML' || funding.type_of_funding === 'Transactional Lending'">
          <label for="interest-rate" class="block text-sm font-semibold leading-6 text-gray-900">Interest rate?</label>
          <input type="number" step="0.01" name="interest-rate" id="interest-rate" v-model="funding.interest_rate" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="arrears-or-liens" class="block text-sm font-semibold leading-6 text-gray-900">Any arrears or liens?</label>
          <textarea id="arrears-or-liens" name="arrears-or-liens" rows="3" v-model="funding.arrears_or_liens" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
        <div>
          <label for="approx-cash-to-close" class="block text-sm font-semibold leading-6 text-gray-900">Approx cash to close</label>
          <input type="number" name="approx-cash-to-close" id="approx-cash-to-close" v-model="funding.approx_cash_to_close" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="tc-in-place" class="block text-sm font-semibold leading-6 text-gray-900">TC in place? If so what is their name?</label>
          <input type="text" name="tc-in-place" id="tc-in-place" v-model="funding.tc_in_place" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="tc-contact" class="block text-sm font-semibold leading-6 text-gray-900">TC's phone number & email</label>
          <input type="text" name="tc-contact" id="tc-contact" v-model="funding.tc_contact" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="amount-needed" class="block text-sm font-semibold leading-6 text-gray-900">Amount of money needed?</label>
          <input type="number" name="amount-needed" id="amount-needed" v-model="funding.amount_needed" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="purpose-of-funds" class="block text-sm font-semibold leading-6 text-gray-900">Purpose of funds?</label>
          <textarea id="purpose-of-funds" name="purpose-of-funds" rows="3" v-model="funding.purpose_of_funds" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
        <div class="sm:col-span-2">
          <label for="llc" class="block text-sm font-semibold leading-6 text-gray-900">Do you have an LLC? If so what is the name of the LLC?</label>
          <input type="text" name="llc" id="llc" v-model="funding.llc" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="experience" class="block text-sm font-semibold leading-6 text-gray-900">What is your experience?</label>
          <textarea id="experience" name="experience" rows="3" v-model="funding.experience" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
        <div v-if="funding.type_of_funding === 'PML' || funding.type_of_funding === 'Transactional Lending'">
          <label for="lien-position" class="block text-sm font-semibold leading-6 text-gray-900">What lien position (1st, 2nd, 3rd)?</label>
          <input type="text" name="lien-position" id="lien-position" v-model="funding.lien_position" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div v-if="funding.type_of_funding === 'PML' || funding.type_of_funding === 'Transactional Lending'" class="sm:col-span-2">
          <label for="exit-strategy" class="block text-sm font-semibold leading-6 text-gray-900">What is the exit strategy?</label>
          <textarea id="exit-strategy" name="exit-strategy" rows="3" v-model="funding.exit_strategy" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
        <div v-if="funding.type_of_funding === 'PML' || funding.type_of_funding === 'Transactional Lending'" class="sm:col-span-2">
          <label for="how-paid" class="block text-sm font-semibold leading-6 text-gray-900">How do we get paid?</label>
          <textarea id="how-paid" name="how-paid" rows="3" v-model="funding.how_paid" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
        <div class="sm:col-span-2">
          <label for="purchase-contract" class="block text-sm font-semibold leading-6 text-gray-900">Purchase Contract</label>
          <input type="file" name="purchase-contract" id="purchase-contract" @change="handleFileUpload" class="mt-2.5 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
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

const funding = ref({
  name: '',
  best_time_to_contact: '',
  best_contact_method: '',
  email: '',
  phone_number: '',
  address: '',
  type_of_funding: '',
  subject_property: '',
  under_contract: '',
  title_company: '',
  inspection_in_place: '',
  have_pictures: '',
  coe_date: '',
  mortgage_documents: null,
  mortgage_balance: '',
  type_of_loan: '',
  loan_maturity: '',
  interest_rate: '',
  arrears_or_liens: '',
  approx_cash_to_close: '',
  tc_in_place: '',
  tc_contact: '',
  amount_needed: '',
  purpose_of_funds: '',
  llc: '',
  experience: '',
  lien_position: '',
  exit_strategy: '',
  how_paid: '',
  purchase_contract: null
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  const field = event.target.name
  funding.value[field] = file
}

const submitFundingRequest = async () => {
  const webhookUrl = 'https://hooks.zapier.com/hooks/catch/19030450/2yi7wgn/'
  const childKey = 'funding'

  const headers = {
    'Content-Type': 'application/json'
  }

  let payload = { [childKey]: funding.value }

  const body = JSON.stringify(payload)

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: headers,
      body: body
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Funding request added successfully via Zapier:', data)
    // Handle success (e.g., show a success message, clear the form, etc.)
  } catch (error) {
    console.error('Error adding funding request via Zapier webhook:', error)
    // Handle error (e.g., show an error message)
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
