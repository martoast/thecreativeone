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
                  <a :href="'/contact?type=potentialBuyer&address=' + property.address" target="_blank">
                    <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get More Details</button>
                  </a>
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
  
              <!-- Nearby Homes -->
              <section class="mt-6">
                <h3 class="text-xl font-semibold text-gray-900">Nearby Homes</h3>
                <div class="overflow-x-auto mt-2">
                  <table class="min-w-full bg-white text-gray-600">
                    <thead>
                      <tr>
                        <th class="py-2 px-4 border-b border-gray-300">Address</th>
                        <th class="py-2 px-4 border-b border-gray-300">Price</th>
                        <th class="py-2 px-4 border-b border-gray-300">Lot Size</th>
                      </tr>
                    </thead>
                    <tbody v-if="property.nearby_homes.length">
                      <tr v-for="(home, index) in property.nearby_homes" :key="'property_' + index">
                        <td class="py-2 px-4 border-b border-gray-300">{{ home.address? home.address.streetAddress : 'N/A' }}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{{ formatCurrency(home.price) }}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{{ home.lotSize ?? 'N/A' }} {{ home.lotSize ? home.livingAreaUnits : ''}}</td>
                      </tr>
                    </tbody>
                  </table>
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
  
              <!-- Nearby Hospitals -->
              <section class="mt-6">
                <h3 class="text-xl font-semibold text-gray-900">Nearby Hospitals</h3>
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
                      <tr v-for="hospital in property.nearby_hospitals" :key="hospital.name">
                        <td class="py-2 px-4 border-b border-gray-300">{{ hospital.name }}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{{ hospital.rating }}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{{ hospital.distance }} km</td>
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
  
  const route = useRoute()
  const store = usePropertiesStore()

  console.log(route.params.id)
  
  await useAsyncData('property', () => store.find(route.params.id))
  
  const property = computed(() => ({
    ...store.property,
    nearby_hospitals: store.property.nearby_hospitals ? JSON.parse(store.property.nearby_hospitals) : [],
    nearby_schools: store.property.nearby_schools ? JSON.parse(store.property.nearby_schools) : [],
    nearby_homes : store.property.nearby_homes ? JSON.parse(store.property.nearby_homes) : [],
    images: store.property.images.length ? JSON.parse(store.property.images) : [],
    tax_history: store.property.tax_history ? JSON.parse(store.property.tax_history) : [],
    price_history: store.property.price_history ? JSON.parse(store.property.price_history) : [],
  }))
  
  const isModalOpen = ref(false)
  const selectedImageIndex = ref(0)

  console.log(property)
  
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
  </script>
  