<template>
    <div class="container mx-auto pt-3">
        <form @submit.prevent="handleSubmit">
      <div class="space-y-12">
        <div class="border-b border-white/10 pb-4" :class="property.address ? 'pb-8' : 'pb-0'">
            <div>
            <h2 class="text-base font-semibold leading-7 text-indigo-600">Data in your hands</h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Realty Radar</p>
            <p class="mt-6 text-base leading-7 text-gray-600">Seach an address and get an instant in depth report.</p>
          </div>
           <!-- Toggle for apartment -->
        <div>
          <div class="mt-5 flex items-center">
          <input v-model="data.form.is_appartment" type="checkbox" id="is_appartment" class="mr-2">
          <label for="is_appartment" class="block text-sm font-medium leading-6">Is it an apartment or condo?</label>
          </div>

          <!-- Unit Number and Property Type -->
          <div v-if="data.form.is_appartment" class="mt-3 flex space-x-4">
            <div class="flex-1">
              <label for="type" class="block text-sm font-medium leading-6">Property Type</label>
              <select v-model="data.form.type" id="type" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <option value="">Select Property Type</option>
                <option value="SUITE">Suite</option>
                <option value="UNIT">Unit</option>
                <option value="APARTMENT">Apartment</option>
                <option value="RM">Room</option>
              </select>
            </div>
            <div class="flex-1">
              <label for="unit-number" class="block text-sm font-medium leading-6">Unit Number</label>
              <input v-model="data.form.unit_number" type="text" id="unit-number" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Unit Number">
            </div>
          </div>

          <div class="mt-5">
            <mapbox-search-box
                :access-token="access_token"
                placeholder="Search Address"
                :options="{
                  country: 'US',
                  limit:6,
                  bbox: [-171.791110603, 18.91619, -66.96466, 71.3577635769],
                }"
                types="address"
                @retrieve="handleRetrieve"
                proximity="ip"
              >
            </mapbox-search-box>
          </div>

          <GoogleMap ref="mapRef" :api-key="googleMapsApiKey" class="map" :zoom="15">
        </GoogleMap>
        </div>

        </div>
  
      </div>
        </form>
    </div>
    
</template>

<script setup>
import { ref } from 'vue';
import { usePropertiesStore } from '~/store/DataStore'
import { GoogleMap, Marker } from 'vue3-google-map';

definePageMeta({
        layout: 'main'
    });


const config = useRuntimeConfig()

const access_token = config.public.MAPBOX_API_TOKEN;
const zillowApiKey = config.public.ZILLOW_API_KEY;
const googleMapsApiKey = config.public.GOOGLE_MAPS_API_KEY;


const mapRef = ref(null);

const data = reactive({
  loading: false,
  errors: {},
  form: {
    latitude: null,
    longitude: null,
    address: null,
    unit_number: null,
    is_appartment: null,
    type: null,
    loading: false
  },
});


const property = ref({
    address: null
});


const apiUrl = ref(`https://zillow-com1.p.rapidapi.com/property?address=`);

const triggerApiRequests = async () => {
    let fullAddress = data.form.address;
    if (data.form.is_appartment && data.form.unit_number) {
        fullAddress += `, ${data.form.type} ${data.form.unit_number}`;
    }
    property.value.address = fullAddress;

    data.loading = true;
    apiUrl.value = `https://zillow-com1.p.rapidapi.com/property?address=${encodeURIComponent(fullAddress)}`;
    await fetchPropertyData();
    await fetchNearbyPlaces(data.form.latitude, data.form.longitude, 'hospital');
    // await fetchNearbyPlaces(coordinates.latitude, coordinates.longitude, 'school');
    data.loading = false;
};



watch(
  () => property.value.balance_to_close,
  (newBalanceToClose) => {
    if (Number(newBalanceToClose > 0)) {
      property.value.price = Number(newBalanceToClose);
    }
  }
);

const fetchPropertyData = async () => {
  const { data, error } = await $fetch(apiUrl.value, {
    headers: {
      'X-RapidAPI-Key': zillowApiKey,
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    },
    onRequest({ request, options }) {
      // Set the request headers
      options.headers = options.headers || {};
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.error('Request error:', error);
    },
    onResponse({ request, response, options }) {
      // Process the response data
      if (response.ok) {
        fetchPropertyImages(response._data.zpid);
        property.value = response._data
      } else {
        console.error('Response error:', response.status);
      }
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.error('Response error:', response.status);
    }
  });
};

const handleSubmit = async (e) => {
  data.form.loading = true;
  const propertiesStore = usePropertiesStore();
  

  if (props.property && props.property.ID) {
    // update the existing property
    let propertyToSubmit = {
    ...property.value,
    images: JSON.stringify(property.value.images),
  };
    console.log('Updating property...', propertyToSubmit);
    await propertiesStore.store({ property: propertyToSubmit });
  } else {
    // create a new property
    let propertyToSubmit = {
    ...property.value,
    nearby_hospitals: JSON.stringify(property.value.nearby_hospitals),
    nearby_schools: JSON.stringify(property.value.nearby_schools),
    images: JSON.stringify(property.value.images),
    nearby_homes: JSON.stringify(property.value.nearby_homes),
    price_history: JSON.stringify(property.value.price_history),
    tax_history: JSON.stringify(property.value.tax_history)
  };
    console.log('Creating new property...', propertyToSubmit);
    await propertiesStore.store({ property: propertyToSubmit });
  }
  data.form.loading = false;
  await navigateTo('/admin/');
};

const handleRetrieve = async (event) => {
  if (event.detail.features.length) {
    data.form.latitude = event.detail.features[0].properties.coordinates.latitude;
    data.form.longitude = event.detail.features[0].properties.coordinates.longitude;
    data.form.address = event.detail.features[0].properties.full_address;
    triggerApiRequests();
    if (data.form.is_appartment && data.form.unit_number) {
      property.value.address += ` Unit ${data.form.unit_number}, ${data.form.type}`;
    }
   
  } else {
    alert('You must search a location and select from the dropdown menu.');
  }
};

const fetchPropertyImages = async (zpid) => {
  const apiUrl = `https://zillow-com1.p.rapidapi.com/images?zpid=${zpid}`;
  const response = await $fetch(apiUrl, {
    headers: {
      'X-RapidAPI-Key': zillowApiKey,
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    }
  });
  if (response.images.length) {
    property.value.images = response.images.slice(0, 12);
  } else {
    console.error('Error fetching images');
  }
  
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const fetchNearbyPlaces = async (latitude, longitude, type) => {
  const service = new google.maps.places.PlacesService(mapRef.value.map);
  const request = {
    location: new google.maps.LatLng(latitude, longitude),
    radius: '5000',
    type: [type],
  };
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const places = results.map((place) => ({
        name: place.name,
        address: place.vicinity,
        rating: place.rating || 'No rating',
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        distance: calculateDistance(latitude, longitude, place.geometry.location.lat(), place.geometry.location.lng()).toFixed(2) // Distance in kilometers
      }));

      // Depending on the type, append to the appropriate property field
      if (type === 'hospital') {
        property.value.nearby_hospitals = [...(property.value.nearby_hospitals || []), ...places];
      } else if (type === 'school') {
        property.value.nearby_schools = [...(property.value.nearby_schools || []), ...places];
      }
    } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      console.log('No places found within the specified radius.');
    } else {
      console.error('Error with API status:', status);
    }
  });
};





</script>
