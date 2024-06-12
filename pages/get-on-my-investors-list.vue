<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get on My Investor List</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Stay updated with the latest investment opportunities.</p>
    </div>
    <form @submit.prevent="submitInvestorListRequest" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
          <input type="text" name="name" id="name" v-model="investor.name" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="phone-number" class="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
          <input type="text" name="phone-number" id="phone-number" v-model="investor.phone_number" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div>
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
          <input id="email" name="email" type="email" v-model="investor.email" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="best-way-to-send-deals" class="block text-sm font-semibold leading-6 text-gray-900">Best way to send deals?</label>
          <input type="text" name="best-way-to-send-deals" id="best-way-to-send-deals" v-model="investor.best_way_to_send_deals" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="type-of-deals" class="block text-sm font-semibold leading-6 text-gray-900">What type of deals do you like?</label>
          <input type="text" name="type-of-deals" id="type-of-deals" v-model="investor.type_of_deals" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="market" class="block text-sm font-semibold leading-6 text-gray-900">What market?</label>
          <input type="text" name="market" id="market" v-model="investor.market" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="percent-arv" class="block text-sm font-semibold leading-6 text-gray-900">What percent of ARV do you buy at?</label>
          <input type="number" name="percent-arv" id="percent-arv" v-model="investor.percent_arv" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="sm:col-span-2">
          <label for="preferred-entry-percent" class="block text-sm font-semibold leading-6 text-gray-900">What’s your preferred entry percent for creative deals?</label>
          <input type="number" name="preferred-entry-percent" id="preferred-entry-percent" v-model="investor.preferred_entry_percent" class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div class="mt-10">
        <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'main'
})

const investor = ref({
  name: '',
  phone_number: '',
  email: '',
  best_way_to_send_deals: '',
  type_of_deals: '',
  market: '',
  percent_arv: '',
  preferred_entry_percent: ''
})

const submitInvestorListRequest = async () => {
  const webhookUrl = 'https://hooks.zapier.com/hooks/catch/19030450/2yi7wgn/'
  const headers = {
    'Content-Type': 'application/json'
  }

  let payload = { investor: investor.value }
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
    console.log('Investor list request added successfully via Zapier:', data)
    // Handle success (e.g., show a success message, clear the form, etc.)
  } catch (error) {
    console.error('Error adding investor list request via Zapier webhook:', error)
    // Handle error (e.g., show an error message)
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
