<template>
  <div class="bg-white py-12">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <p class="text-lg font-semibold">Loading property details...</p>
    </div>
    <div v-else-if="error" class="flex justify-center items-center h-64">
      <p class="text-lg font-semibold text-red-500">{{error}}</p>
    </div>
    <div v-else-if="property" class="pt-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BreadCrumbs />

        <!-- Image Gallery -->
        <div class="mt-6 max-w-7xl mx-auto cursor-pointer">
          <div
            v-if="property.zillow.images && property.zillow.images.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <!-- Main Image (always visible) -->
            <div
              class="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2 aspect-w-3 aspect-h-2 overflow-hidden rounded-lg"
              @click="openModal(0)"
            >
              <img
                :src="property.zillow.images[0]"
                :alt="property.zillow.address.streetAddress"
                class="h-full w-full object-cover object-center"
              />
            </div>

            <!-- Additional Images (visible on larger screens) -->
            <template v-if="property.zillow.images.length > 1">
              <div
                v-for="(image, index) in property.zillow.images.slice(1, 5)"
                :key="index"
                class="hidden sm:block overflow-hidden rounded-lg"
                @click="openModal(index + 1)"
              >
                <img
                  :src="image"
                  :alt="`${property.zillow.address.streetAddress} - Image ${
                    index + 2
                  }`"
                  class="h-full w-full object-cover object-center"
                />
              </div>
            </template>

            <!-- "View All Photos" button (visible when there are more than 5 images) -->
            <div
              v-if="property.zillow.images.length > 5"
              class="hidden sm:flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer"
              @click="openModal(0)"
            >
              <p class="text-lg font-semibold text-gray-800">
                +{{ property.zillow.images.length - 5 }} more
              </p>
            </div>
          </div>

          <!-- Fallback for no images -->
          <div
            v-else
            class="bg-gray-100 h-64 flex items-center justify-center rounded-lg"
          >
            <p class="text-gray-500 text-lg">No images available</p>
          </div>
        </div>
        <ModalCarousel
          :showModal="isModalOpen"
          :images="property.zillow.images"
          :startIndex="selectedImageIndex"
          @close="isModalOpen = false"
        />

        

        <!-- Property Header -->
        <div class="mt-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            {{ property.zillow.address.streetAddress }},
            {{ property.zillow.address.city }},
            {{ property.zillow.address.state }}
            {{ property.zillow.address.zipcode }}
          </h1>
          <p class="mt-2 text-lg text-gray-500">
            {{ property.zillow.bedrooms }} bed |
            {{ property.zillow.bathrooms }} bath |
            {{ property.zillow.livingArea }} sqft | Built in
            {{ property.zillow.yearBuilt }}
          </p>
        </div>

      
        <ActionButtons class="mt-8" :property="property" />

        <!-- Key Details Section (Updated) -->
        <div class="mt-8 bg-gray-50 p-6 rounded-lg shadow">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Key Details</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <div>
              <p class="text-sm font-medium text-gray-500">Estimated Value</p>
              <p class="text-lg font-semibold">
                {{
                  property.re.details.estimatedValue
                    ? formatCurrency(property.re.details.estimatedValue)
                    : "N/A"
                }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Estimated Rent</p>
              <p class="text-lg font-semibold">
                {{
                  property.re.details.demographics.suggestedRent
                    ? formatCurrency(
                        property.re.details.demographics.suggestedRent
                      )
                    : "N/A"
                }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Equity</p>
              <p class="text-lg font-semibold">
                {{
                  property.re.details.equity
                    ? formatCurrency(property.re.details.equity)
                    : "N/A"
                }}
                <span class="text-sm font-normal text-gray-600">
                  ({{ property.re.details.equityPercent }}%)
                </span>
              </p>
              <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  class="bg-primary h-2.5 rounded-full"
                  :style="{
                    width: `${property.re.details.equityPercent}%`,
                  }"
                ></div>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">
                Open Mortgage Balance
              </p>
              <p class="text-lg font-semibold">
                {{
                  property.re.details.openMortgageBalance
                    ? formatCurrency(property.re.details.openMortgageBalance)
                    : "N/A"
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Comprehensive Owner Information Section -->
        <div class="mt-8 bg-gray-50 p-6 rounded-lg shadow">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            Skip Trace Results
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p class="text-sm font-medium text-gray-500">Primary Owner</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ property.re.details.ownerInfo.owner1FullName }}
              </p>
            </div>
            <div v-if="property.re.details.ownerInfo.owner2FullName">
              <p class="text-sm font-medium text-gray-500">Secondary Owner</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ property.re.details.ownerInfo.owner2FullName }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Owner Occupied</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ property.re.details.ownerInfo.ownerOccupied ? "Yes" : "No" }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Ownership Length</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ property.re.details.ownerInfo.ownershipLength }} months
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Absentee Owner</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ property.re.details.ownerInfo.absenteeOwner ? "Yes" : "No" }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Corporate Owned</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{
                  property.re.details.ownerInfo.corporateOwned ? "Yes" : "No"
                }}
              </p>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Contact Information
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="(phone, index) in property.re.skip_trace.output.identity
                  .phones"
                :key="index"
                class="flex items-center"
              >
                <PhoneIcon class="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p class="font-medium">{{ phone.phoneDisplay }}</p>
                  <p class="text-sm text-gray-500">{{ phone.phoneType }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lot Information -->
        <div class="mt-8 bg-gray-50 p-6 rounded-lg shadow">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            Lot Information
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <div>
              <p class="text-sm font-medium text-gray-500">Property Type</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ property.re.details.propertyType }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Lot Size</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ formatNumber(property.re.details.lotInfo.lotSquareFeet) }}
                sqft
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">APN</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ property.re.details.lotInfo.apn }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Zoning</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ property.re.details.lotInfo.zoning }}
              </p>
            </div>
          </div>
        </div>

        <!-- Financial Overview Section -->
        <div class="mt-8 bg-gray-50 p-6 rounded-lg shadow">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">
            Financial Overview
          </h2>

          <!-- Property Value and Equity -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            <div>
              <p class="text-sm font-medium text-gray-500">Estimated Value</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ formatCurrency(property.re.details.estimatedValue) }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Estimated Equity</p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ formatCurrency(property.re.details.equity) }}
                <span class="text-sm font-normal text-gray-600">
                  ({{ property.re.details.equityPercent }}%)
                </span>
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">
                Open Mortgage Balance
              </p>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ formatCurrency(property.re.details.openMortgageBalance) }}
              </p>
            </div>
          </div>

          <!-- Latest Mortgage Summary -->
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Current Mortgage
          </h3>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            <div>
              <p class="text-sm font-medium text-gray-500">
                Latest Mortgage Amount
              </p>
              <p class="text-base font-semibold">
                {{
                  property.re.details.mortgageHistory.length
                    ? formatCurrency(
                        property.re.details.mortgageHistory[0].amount
                      )
                    : "N/A"
                }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">
                Latest Mortgage Date
              </p>
              <p class="text-base font-semibold">
                {{
                  property.re.details.mortgageHistory.length
                    ? formatDate(
                        property.re.details.mortgageHistory[0].documentDate
                      )
                    : "N/A"
                }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Latest Lender</p>
              <p class="text-base font-semibold">
                {{
                  property.re.details.mortgageHistory.length
                    ? property.re.details.mortgageHistory[0].lenderName
                    : "N/A"
                }}
              </p>
            </div>
          </div>

          <!-- Mortgage History Table -->
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Mortgage History
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Document Date
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Lender
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Loan Type
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Term
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="mortgage in property.re.details.mortgageHistory"
                  :key="mortgage.mortgageId"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    {{ formatDate(mortgage.documentDate) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ formatCurrency(mortgage.amount) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ mortgage.lenderName }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ mortgage.loanType }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ mortgage.term }} {{ mortgage.termType }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Sale History -->
        <div class="mt-8 bg-gray-50 p-6 rounded-lg shadow">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            Sale History
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p class="text-sm font-medium text-gray-500">Last Sale Date</p>
              <p class="text-base font-semibold">
                {{ formatDate(property.re.details.lastSale.saleDate) }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Last Sale Price</p>
              <p class="text-base font-semibold">
                {{ formatCurrency(property.re.details.lastSale.saleAmount) }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Transaction type</p>
              <p class="text-base font-semibold">
                {{ property.re.details.lastSale.transactionType }}
              </p>
            </div>
            <!-- Add more details as needed -->
          </div>
          <div class="overflow-x-auto mt-8">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Buyer
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Seller
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="sale in property.re.details.saleHistory"
                  :key="sale.documentNumber"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(sale.saleDate) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(sale.saleAmount) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ sale.buyerNames }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ sale.sellerNames }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Comparable Properties -->
        <ComparableProperties :property="property" class="mb-6" />

        <ReportTabsHorizontal :property="property" />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { useRoute } from 'vue-router'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import { PhoneIcon } from "@heroicons/vue/24/solid";

definePageMeta({
  layout: 'main'
});



const route = useRoute()
const { $locally } = useNuxtApp()

const loading = ref(true)
const property = ref({
  zillow: {
    zpid: null,
    address: {
      streetAddress: null
    },
    images: [],
    description: '',
    price: 0,
    yearBuilt: 0,
    livingArea: 0,
    lotSize: '',
    bedrooms: 0,
    bathrooms: 0,
    contact_recipients: [],
    resoFacts: {
      atAGlanceFacts: [],
    },
  },
  // nearby_places: {
  //   hospitals: [],
  // },
  re: {
    skip_trace: null,
    details: null,
  }
})

// Computed properties for meta tags
const metaTitle = computed(() => `${property.value?.zillow?.address?.streetAddress || 'Property'} | TheCreativeOne`)
const metaDescription = computed(() => property.value?.zillow?.description || 'Property details')
const metaImage = computed(() => property.value?.zillow?.images?.[0] || '')

// Use computed properties in useSeoMeta
useSeoMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  ogImage: metaImage,
  twitterCard: 'summary_large_image',
})
const error = ref(null);

const isModalOpen = ref(false);
const selectedImageIndex = ref(0);

function openModal(index) {
  selectedImageIndex.value = index;
  isModalOpen.value = true;
}

const triggerApiRequests = async (formData) => {
  try {
    let zillow_result = await useZillowPropertyDetails(formData.full_address)
    if (zillow_result){
      property.value.zillow = zillow_result
    }
    if (property.value.zillow.zpid) {
      let zillow_images_result = await useZillowImages(property.value.zillow.zpid)

      if (zillow_images_result) {
        property.value.zillow.images = zillow_images_result.images
      }
    }

    property.value.re.details = await usePropertyDetail(formData.full_address)


    if (formData.city && formData.state && formData.zip) {
      property.value.re.skip_trace = await useSkipTrace(
        formData.address,
        formData.city,
        formData.state,
        formData.zip
      )
    }

    $locally.setItem('propertyData', property.value)
  } catch (error) {
    console.error('Error:', error)
    error.value = error
  } finally {
    loading.value = false
  }
}

const getCurrentYear = () => new Date().getFullYear()

const getEquityColor = (equityPercent) => {
  if (equityPercent >= 50) return 'green'
  if (equityPercent >= 20) return 'blue'
  return 'red'
}

const getAgeColor = (yearBuilt) => {
  const age = getCurrentYear() - yearBuilt
  if (age <= 10) return 'green'
  if (age <= 30) return 'yellow'
  return 'red'
}


const formatNumber = (value, decimalPlaces = 0) => {
  if (typeof value !== "number") return "N/A";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
};

const formatCurrency = (value) => {
  if (typeof value !== "number" && typeof value !== "string") return "N/A";
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numValue);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


onMounted(async () => {
  if (route.query.address && route.query.city && route.query.zip && route.query.state) {
    const savedPropertyData = $locally.getItem('propertyData')

    if (savedPropertyData) {
      property.value = savedPropertyData
      loading.value = false
      console.log('Loaded property data from local storage')
    } else {
      console.log('No local property data found, fetching from API')
      const formData = route.query
      if (Object.keys(formData).length) {
        await triggerApiRequests(formData)
      } else {
        console.error('No form data provided in URL')
        loading.value = false
      }
    }
  } else {
    await navigateTo({ path: '/realty-radar/' })
  }
})
</script>
