<template>
    <div class="bg-gray-50 min-h-screen">
      <div class="container mx-auto">
        <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          
          <div class="mb-4">
            <button @click="hanldeBackButton" type="button" class="rounded-full bg-indigo-600 p-2 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
          </div>
          <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <!-- Image gallery -->
            <TabGroup as="div" class="flex flex-col-reverse">
              <!-- Image selector -->
              <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList class="grid grid-cols-4 gap-6 mb-8">
                  <Tab
                    v-for="(image, index) in property.images"
                    :key="index"
                    class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-gray-200 text-sm font-medium uppercase text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    v-slot="{ selected }"
                  >
                    <span class="sr-only">Image {{ index + 1 }}</span>
                    <span class="absolute inset-0 overflow-hidden rounded-md">
                      <img
                        :src="image"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </span>
                    <span
                      :class="[
                        selected ? 'ring-indigo-600' : 'ring-transparent',
                        'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                      ]"
                      aria-hidden="true"
                    />
                  </Tab>
                </TabList>
              </div>
  
              <TabPanels class="aspect-h-1 aspect-w-1 w-full">
                <TabPanel
                  v-for="(image, index) in property.images"
                  :key="index"
                  @click="openModal(index)"
                >
                  <img
                    :src="image"
                    :alt="`Image ${index + 1}`"
                    class="h-full w-full object-cover object-center sm:rounded-lg cursor-pointer"
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>
  
            <!-- Property info -->
            <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                {{ property.address }}
              </h1>

              <div class="mt-4 border-t border-gray-200 pt-4">
                <h3 class="text-sm font-medium text-gray-900">Share</h3>
                <ul role="list" class="mt-4 flex items-center space-x-6">
                  <li>
                    <a :href="`https://www.facebook.com/sharer/sharer.php?u=https://www.thecreativeone.io/listings/${property.ID}&t=${encodeURIComponent('Check out this property!')}`" class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500" target="_blank">
                      <span class="sr-only">Share on Facebook</span>
                      <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  
                  <li>
                    <a :href="`https://twitter.com/intent/tweet?url=https://www.thecreativeone.io/listings/${property.ID}`" class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500" target="_blank">
                      <span class="sr-only">Share on Twitter</span>
                      <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

  
              <div class="mt-3">
                <h2 class="sr-only">Property information</h2>
                <p class="text-3xl font-semibold tracking-tight text-gray-900 mb-3">
                  {{ formatCurrency(property.price) }}
                </p>
                <p v-if="property.sold !== null" class="font-medium text-gray-600">
                  <span>Status:</span> 
                  <span class="font-bold" :class="property.sold ? 'text-red-600' : 'text-green-400'"> 
                    {{ property.sold ? 'Sold' : 'Available' }} 
                  </span> 
                </p>
                <div class="mt-4 sm:flex-none">
                    <button @click="handleGetMoreDetails" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get More Details</button>
                </div>
              </div>
  
              <!-- Info Sections -->
              <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <!-- General Information -->
                <section>
                  <h3 class="text-xl font-semibold text-gray-900">General Information</h3>
                  <div class="space-y-2 text-base text-gray-600 mt-2">
                    <p><span class="font-medium">Property Type:</span> {{ property.property_type }}</p>
                    <p><span class="font-medium">Bedrooms:</span> {{ property.bedrooms }}</p>
                    <p><span class="font-medium">Bathrooms:</span> {{ property.bathrooms }}</p>
                    <p><span class="font-medium">Year Built:</span> {{ property.year_built ?? 'N/A' }}</p>
                    <p><span class="font-medium">Lot Size:</span> {{ property.lot_size ?? 'N/A' }}</p>
                    <p><span class="font-medium">Living Area:</span> {{ property.living_area ?? 'N/A' }}</p>
                  </div>
                </section>
  
                <!-- Financial Information -->
                <section>
                  <h3 class="text-xl font-semibold text-gray-900">Financial Information</h3>
                  <div class="space-y-2 text-base text-gray-600 mt-2">
                    <p><span class="font-medium">Rent Zestimate:</span> {{ formatCurrency(property.rent_zestimate) ?? 'N/A'}}</p>
                    <p><span class="font-medium">Zestimate:</span> {{ formatCurrency(property.zestimate) ?? 'N/A'}}</p>
                    <p><span class="font-medium">Price per Square Foot:</span> {{ formatCurrency(property.price_per_square_foot) ?? 'N/A' }}</p>
                    <p><span class="font-medium">Zoning:</span> {{ property.zoning ?? 'N/A'}}</p>
                    <p><span class="font-medium">Purchase Price:</span> {{ formatCurrency(property.purchase_price) ?? 'N/A' }}</p>
                    <p><span class="font-medium">Balance to Close:</span> {{ formatCurrency(property.balance_to_close) ?? 'N/A' }}</p>
                    <p><span class="font-medium">Monthly Holding Cost:</span> {{ formatCurrency(property.monthly_holding_cost) ?? 'N/A' }}</p>
                    <p><span class="font-medium">Monthly HOA Fee:</span> {{ formatCurrency(property.monthly_hoa_fee) ?? 'N/A' }}</p>
                    <p><span class="font-medium">Interest Rate:</span> {{ property.interest_rate ? `${parseFloat(property.interest_rate)}%` : 'N/A' }}</p>
                  </div>
                </section>
              </div>
  
              <!-- Description -->
              <section class="mt-6">
                <h3 class="text-xl font-semibold text-gray-900">Description</h3>
                <div class="space-y-2 text-base text-gray-600 mt-2">
                  <p>{{ property.description }}</p>
                </div>
              </section>
  
             
  
              <!-- Price History -->
              <section class="mt-6">
                <h3 class="text-xl font-semibold text-gray-900">Price History</h3>
                <div class="overflow-x-auto mt-2">
                  <table class="min-w-full bg-white text-gray-600">
                    <thead>
                      <tr>
                        <th class="py-2 px-4 border-b border-gray-300">Date</th>
                        <th class="py-2 px-4 border-b border-gray-300">Event</th>
                        <th class="py-2 px-4 border-b border-gray-300">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="price in property.price_history" :key="price.date">
                        <td class="py-2 px-4 border-b border-gray-300">{{ new Date(price.date).toLocaleDateString() }}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{{ price.event }}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{{ formatCurrency(price.price) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
  
              <!-- Nearby Schools -->
              <section class="mt-6">
                <h3 class="text-xl font-semibold text-gray-900">Nearby schools</h3>
                <div class="overflow-x-auto mt-2">
                  <table class="min-w-full bg-white text-gray-600">
                    <thead>
                      <tr>
                        <th class="py-2 px-4 border-b border-gray-300">Name</th>
                        <th class="py-2 px-4 border-b border-gray-300">Rating</th>
                        <th class="py-2 px-4 border-b border-gray-300">Distance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="school in property.nearby_schools" :key="school.name">
                        <td class="py-2 px-4 border-b border-gray-300">{{ school.name }}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{{ school.rating }}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{{ convertMilesToKilometers(school.distance) }} km</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
  
            
  
              <!-- Tax History -->
              <section class="mt-6">
                <h3 class="text-xl font-semibold text-gray-900">Tax History</h3>
                <div class="overflow-x-auto mt-2">
                  <table class="min-w-full bg-white text-gray-600">
                    <thead>
                      <tr>
                        <th class="py-2 px-4 border-b border-gray-300">Year</th>
                        <th class="py-2 px-4 border-b border-gray-300">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="tax in property.tax_history" :key="tax.time">
                        <td class="py-2 px-4 border-b border-gray-300">{{ new Date(tax.time).getFullYear() }}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{{ formatCurrency(tax.taxPaid) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
  
            </div>
          </div>
        </div>
      </div>
      <ModalCarousel
        :showModal="isModalOpen"
        :images="property.images"
        :startIndex="selectedImageIndex"
        @close="isModalOpen = false"
      />
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  } from '@headlessui/vue'
  import { usePropertiesStore } from '~/store/DataStore'
  import ModalCarousel from '~/components/ModalCarousel.vue'

  definePageMeta({
        layout: 'main'
    });

  const { $locally } = useNuxtApp()

  let form = ref({
    fullAddress: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
  }); 
  
  const route = useRoute()
  const store = usePropertiesStore()
  
  await useAsyncData('property', () => store.find(route.params.id))
  
  const property = computed(() => ({
    ...store.property,
    nearby_schools: store.property.nearby_schools ? JSON.parse(store.property.nearby_schools) : [],
    images: store.property.images.length ? JSON.parse(store.property.images) : [],
    tax_history: store.property.tax_history ? JSON.parse(store.property.tax_history) : [],
    price_history: store.property.price_history ? JSON.parse(store.property.price_history) : [],
  }))
  
  const isModalOpen = ref(false)
  const selectedImageIndex = ref(0)
  
  function openModal(index) {
    selectedImageIndex.value = index
    isModalOpen.value = true
  }
  
  function formatCurrency(value) {
    if (typeof value !== 'number') {
      return value;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
  
  const hanldeBackButton = async () => {
    await navigateTo('/listings')
  }
  
  const convertMilesToKilometers = (miles) => {
    return (miles * 1.60934).toFixed(2);
  }

  const handleGetMoreDetails = async () => {
  // Split the full address into its components based on commas
  const addressParts = property.value.address.split(', ');

  // Function to find the state and postal code
  const findStateAndPostalCode = (str) => {
    const parts = str.split(' ');
    const postalCode = parts.pop(); // Remove and return the last element (postal code)
    const state = parts.join(' '); // Join the remaining parts (state name)
    return { state, postalCode };
  };

  const { state, postalCode } = findStateAndPostalCode(addressParts[2]);

  form.value = {
    fullAddress: property.value.address,
    streetAddress: addressParts[0],
    city: addressParts[1],
    state: state,
    postalCode: postalCode,
  };


  try {
    $locally.setItem('formData', form.value)
    await navigateTo('/send-me-a-lead/steps/0')
  } catch (error) {
    console.error('Error saving form data:', error)
    alert('An error occurred while saving your data. Please try again.')
  }
}
  </script>
  