<template>
    <div class="bg-white py-16 sm:py-24">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32 text-center">
          <img class="mx-auto h-20 w-auto" src="/logo.svg" alt="Realty Radar" />
          <h2 class="pt-5 pb-2 mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Realty Radar</h2>
          <p class="pb-4 mx-auto mt-2 max-w-xl text-lg leading-8 text-gray-300">Search an address and get an instant <b>in-depth report</b>.</p>
          
          <div class="mx-auto max-w-md">
            <mapbox-search-box
              :access-token="access_token"
              placeholder="Search Address"
              :options="{
                country: 'US',
                limit: 6,
                bbox: [-171.791110603, 18.91619, -66.96466, 71.3577635769],
              }"
              types="address"
              @retrieve="handleRetrieve"
              proximity="ip"
              :theme="googleLikeTheme"
            >
            </mapbox-search-box>
          </div>
  
          <!-- Toggle for apartment -->
          <div class="mt-6 text-white">
            <div class="flex items-center justify-center">
              <input v-model="form.is_apartment" type="checkbox" id="is_apartment" class="mr-2">
              <label for="is_apartment" class="text-sm font-medium">Is it an apartment or condo?</label>
            </div>
            
            <!-- Unit Number and Property Type -->
            <div v-if="form.is_apartment" class="mt-3 flex space-x-4 max-w-md mx-auto">
              <div class="flex-1">
                <label for="type" class="block text-sm font-medium mb-1">Property Type</label>
                <select v-model="form.type" id="type" class="block w-full border-gray-300 rounded-md py-1.5 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="">Select Type</option>
                  <option value="SUITE">Suite</option>
                  <option value="UNIT">Unit</option>
                  <option value="APARTMENT">Apartment</option>
                  <option value="RM">Room</option>
                </select>
              </div>
              <div class="flex-1">
                <label for="unit-number" class="block text-sm font-medium mb-1">Unit Number</label>
                <input v-model="form.unit_number" type="text" id="unit-number" class="block w-full border-gray-300 rounded-md py-1.5 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Unit Number">
              </div>
            </div>
          </div>
  
          <Radar 
            class="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-20" 
            size="64rem"
            color="rgba(79, 70, 229, 0.35)"
            />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  definePageMeta({
    layout: 'main',
  });
  
  useServerSeoMeta({
    title: 'Realty Radar - Data in your hands',
    ogTitle: 'Realty Radar - Data in your hands',
    author: 'Realty Radar',
    description: "Search an address and get an instant in-depth report.",
    ogDescription: "Search an address and get an instant in-depth report.",
    robots: 'index, follow',
    ogImage: {
      url: '/realty_radar_logo.png'
    },
    ogType: 'website'
  })
  
  const config = useRuntimeConfig()
  const access_token = config.public.MAPBOX_API_TOKEN

  const { $locally } = useNuxtApp()
  
  const form = reactive({
    latitude: null,
    longitude: null,
    address: null,
    full_address: null,
    city: null,
    zip: null,
    state: null,
    country: null,
    unit_number: null,
    is_apartment: false,
    type: null,
  })
  
  const googleLikeTheme = computed(() => {
    return {
      variables: {
        unitHeader: '16px',
        fontFamily: '"Arial", sans-serif',
        border: '1px solid #dfe1e5',
        borderRadius: '24px',
        boxShadow: 'none',
        colorText: '#5F6368',
        colorPrimary: '#4F46E5',
        colorSecondary: '#4F46E5',
        colorBackground: '#FFFFFF'
      },
      cssText: `
        .Input {
          color: #5F6368;
          background-color: #FFFFFF;
          border: 1px solid #dfe1e5;
          border-radius: 24px;
          padding: 15px 20px 15px 40px;
          font-size: 16px;
          line-height: normal;
          width: 100%;
        }
        .Input:focus {
          border-color: #4F46E5;
          box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
          outline: none;
        }
        .Input:hover {
          box-shadow: 0 1px 6px rgba(32, 33, 36, 0.18);
        }
      `,
    };
  });
  
  const handleRetrieve = async (event) => {
    if (event.detail.features.length) {
        const savedPropertyData = $locally.getItem('propertyData')
        if (savedPropertyData) {
            $locally.deleteItem('propertyData')
        }

      const feature = event.detail.features[0]
      form.latitude = feature.properties.coordinates.latitude
      form.longitude = feature.properties.coordinates.longitude
      form.address = feature.properties.context.address.name
      form.city = feature.properties.context.place.name
      form.state = feature.properties.context.region.region_code
      form.zip = feature.properties.context.postcode.name
      form.country = feature.properties.context.country.name
      form.full_address = `${form.address}, ${form.city}, ${form.state} ${form.zip}`
  
      if (form.is_apartment && form.unit_number) {
        form.full_address += ` Unit ${form.unit_number}, ${form.type}`
      }
  
      // Navigate to the report page with form data as query parameters
      await navigateTo({
        path: '/realty-radar/report/' + form.address,
        query: { ...form }
      })
    } else {
      alert('You must search a location and select from the dropdown menu.')
    }
  }
  </script>
  
  <style scoped>
  [class*="--SearchBox"] {
    max-width: 600px;
    margin: auto;
  }
  </style>