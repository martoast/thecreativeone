<template>
  <div class="container mx-auto px-3 mt-8">
    <BreadCrumbs class="mb-6"/>
    <div v-if="loading">Loading...</div>
    <div v-else-if="property.zillow.zpid">
      <!-- Property Details Section -->
      <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <!-- Property image -->
        <div class="lg:col-span-4 lg:row-end-1">
          <!-- Image gallery -->
          <TabGroup as="div" class="flex flex-col-reverse">
            <!-- Image selector -->
            <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList class="grid grid-cols-4 gap-6">
                <Tab 
                  v-for="(image, index) in property.zillow.images" 
                  :key="index" 
                  class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" 
                  v-slot="{ selected }"
                >
                  <span class="sr-only">{{ index }}</span>
                  <span class="absolute inset-0 overflow-hidden rounded-md">
                    <img :src="image" alt="" class="h-full w-full object-cover object-center" />
                  </span>
                  <span 
                    :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" 
                    aria-hidden="true" 
                  />
                </Tab>
              </TabList>
            </div>

            <TabPanels class="aspect-h-1 aspect-w-1 w-full">
              <TabPanel v-for="(image, index) in property.zillow.images" :key="image.id">
                <img :src="image" :alt="image.alt" class="h-full w-full object-cover object-center sm:rounded-lg" />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>

        <!-- Property details -->
        <div class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
          <div class="flex flex-col-reverse">
            <div class="mt-4">
              <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ property.re.details.propertyInfo.address.label }}</h1>
              <p class="mt-2 text-gray-500">
                {{ property.re.details.propertyInfo.bedrooms }} bed | 
                {{ property.re.details.propertyInfo.bathrooms }} bath | 
                {{ property.re.details.propertyInfo.livingSquareFeet }} sqft | 
                {{ property.re.details.lotInfo.lotSquareFeet }} lot sqft | 
                {{ property.re.details.propertyInfo.yearBuilt }} year built 
              </p>
            </div>
          </div>

          <div class="mt-3">
            <h2 class="sr-only">Property price</h2>
            <p class="text-3xl tracking-tight text-gray-900">{{ $formatCurrency(property.zillow.price) }}</p>
          </div>

          <div class="mt-2">
            <h2 class="sr-only">Property AVM</h2>
            <p class="text-xl tracking-tight text-gray-900">AVM: {{ $formatCurrency(property.re.details.reapiAvm) }}</p>
          </div>
          <div class="mt-2">
            <h2 class="sr-only">Property Rent</h2>
            <p class="text-xl tracking-tight text-gray-900">Rent: {{ $formatCurrency(property.zillow.rentZestimate) }}</p>
          </div>

          <p class="mt-6 text-gray-500">{{ property.zillow.description }}</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <a target="_blank" :href="'https://www.zillow.com' + property.zillow.url" class="m-0 p-0">
              <button type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                View on Zillow
              </button>
            </a>

              <button @click="handleSendLead" type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-700 px-8 py-3 text-base font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                Send me this lead
              </button>
          </div>
          
          <ReportTabs :property="property"/>

         


          <div class="mt-10  border-t pt-10">
            <h3 class="text-sm font-medium text-gray-900 pb-3">Listing Provided by</h3>
            <div class="flex items-center space-x-4">
              <img :src="property.zillow.contact_recipients[0].image_url" alt="Agent" class="w-16 h-16 rounded-full">
              <div>
                <h4 class="text-lg font-semibold">{{ property.zillow.contact_recipients[0].display_name }}</h4>
                <p class="text-sm text-gray-500">{{ property.zillow.contact_recipients[0].badge_type }}</p>
                <p class="text-sm text-gray-500">Phone: {{ property.zillow.contact_recipients[0].phone.areacode + '-' + property.zillow.contact_recipients[0].phone.prefix + '-' + property.zillow.contact_recipients[0].phone.number}}</p>
              </div>
            </div>
            
            </div>
        </div>
        <ReportTabsHorizontal :property="property"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { useRoute } from 'vue-router'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'

definePageMeta({
  layout: 'main'
});

const route = useRoute()
const { $locally, $formatCurrency } = useNuxtApp()

const loading = ref(true)
const property = ref({
  zillow: {
    zpid: null,
    address: null,
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
  nearby_places: {
    hospitals: [],
  },
  re: {
    skip_trace: null,
    details: null,
    comps: []
  }
})

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

    // property.value.re.comps = await usePropertyComps(formData.full_address)


    
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
  } finally {
    loading.value = false
  }
}

const handleSendLead = async () => {
  $locally.deleteItem('formData')
  $locally.setItem('formData', {
    fullAddress: property.value.re.details.propertyInfo.address.label,
    streetAddress: property.value.re.details.propertyInfo.address.address,
    city: property.value.re.details.propertyInfo.address.city,
    state: property.value.re.details.propertyInfo.address.state,
    postalCode: property.value.re.details.propertyInfo.address.zip,

  })
  const url = '/send-me-a-lead/steps/0'
  window.open(url, '_blank')
}



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
        triggerApiRequests(formData)
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