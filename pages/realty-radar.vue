<template>
  <div class="container mx-auto px-3 mt-8">
    <div class="space-y-12">
      <div class="border-b border-white/10 pb-4" :class="!data.loading && property.zpid ? 'pb-4' : 'pb-0'">
        <div>
          <h2 class="text-base font-semibold leading-7 text-indigo-600">Data in your hands</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Realty Radar</p>
          <p class="mt-6 text-base leading-7 text-gray-600">Search an address and get an instant in-depth report.</p>
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

      <!-- Detailed Property Report Section -->
      <div v-if="!data.loading && property.zpid" class="mt-4">
        <div class="border-t border-gray-200 pt-6">
          <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            <!-- Property image -->
            <div class="lg:col-span-4 lg:row-end-1">
              <div class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                <img :src="property.images && property.images.length ? property.images[0] : ''" alt="Main property image" class="object-cover object-center" />
              </div>
            </div>

            <!-- Property details -->
            <div class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div class="flex flex-col-reverse">
                <div class="mt-4">
                  <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ property.address.streetAddress }}</h1>
                  <p class="mt-2 text-sm text-gray-500">{{ property.address.city }}, {{ property.address.state }} {{ property.address.zipcode }}</p>
                </div>

              
              </div>

              <!-- Info Sections -->
              <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <!-- General Information -->
                <section>
                  <h3 class="text-xl font-semibold text-gray-900">General Information</h3>
                  <div class="space-y-2 text-base text-gray-600 mt-2">
                    <p><span class="font-medium">Property Type:</span> {{ property.homeType ?? 'N/A' }}</p>
                    <p><span class="font-medium">Bedrooms:</span> {{ property.bedrooms ?? 'N/A' }}</p>
                    <p><span class="font-medium">Bathrooms:</span> {{ property.bathrooms ?? 'N/A' }}</p>
                    <p><span class="font-medium">Year Built:</span> {{ property.yearBuilt ?? 'N/A' }}</p>
                    <p><span class="font-medium">Lot Size:</span> {{ property.lotSize ?? 'N/A' }}</p>
                    <p><span class="font-medium">Living Area:</span> {{ property.livingArea ?? 'N/A' }}</p>
                  </div>
                </section>

                <!-- Financial Information -->
                <section>
                  <h3 class="text-xl font-semibold text-gray-900">Financial Information</h3>
                  <div class="space-y-2 text-base text-gray-600 mt-2">
                    <p><span class="font-medium">Rent Zestimate:</span> {{ property.rentZestimate ? formatCurrency(property.rentZestimate) : 'N/A' }}</p>
                    <p><span class="font-medium">Zestimate:</span> {{ property.zestimate ? formatCurrency(property.zestimate) : 'N/A' }}</p>
                    <p><span class="font-medium">Price per Square Foot:</span> {{ property.pricePerSquareFoot ? formatCurrency(property.pricePerSquareFoot) : 'N/A' }}</p>
                    <p><span class="font-medium">Zoning:</span> {{ property.zoning ?? 'N/A' }}</p>
                    <p><span class="font-medium">Annual Property Tax:</span> {{ property.taxAnnualAmount ? formatCurrency(property.taxAnnualAmount) : 'N/A' }}</p>
                    <p><span class="font-medium">Property Tax Rate:</span> {{ property.propertyTaxRate ? `${parseFloat(property.propertyTaxRate)}%` : 'N/A' }}</p>
                    <p><span class="font-medium">Annual Homeowners Insurance:</span> {{ property.annualHomeownersInsurance ? formatCurrency(property.annualHomeownersInsurance) : 'N/A' }}</p>
                    <p><span class="font-medium">Mortgage Rate:</span> {{ property.mortgageRates?.thirtyYearFixedRate ? `${property.mortgageRates.thirtyYearFixedRate}%` : 'N/A' }}</p>
                  </div>
                </section>
              </div>


              <p class="mt-6 text-gray-500">{{ property.description }}</p>

              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <a target="_blank" :href="'https://www.zillow.com' + property.url" class="m-0 p-0">
                  <button @click="handleViewOnZillow" type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">View on Zillow</button>
                </a>
              </div>

              <div class="mt-10 border-t border-gray-200 pt-10">
                <h3 class="text-sm font-medium text-gray-900">Highlights</h3>
                <div class="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    <li v-for="highlight in property.otherFacts" :key="highlight.value">{{ highlight.value }}</li>
                  </ul>
                </div>
              </div>

              <!-- <div class="mt-10 border-t border-gray-200 pt-10">
                <h3 class="text-sm font-medium text-gray-900">Listing Provided by</h3>
                <p class="mt-4 text-sm text-gray-500">{{ property.contact_recipients[0].display_name }}</p>
              </div> -->

              
            </div>

            <div class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
              <TabGroup as="div">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8">
                    <Tab as="template" v-slot="{ selected }">
                      <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">Property Details</button>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                      <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">Nearby Hospitals</button>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                      <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">MAO Calculation</button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel class="-mb-10">
                    <h3 class="sr-only">Property Details</h3>
                    <div class="prose prose-sm mt-4 max-w-none text-gray-500">
                      <ul role="list">
                        <li v-for="fact in property.resoFacts.atAGlanceFacts" :key="fact.factLabel">{{ fact.factLabel }}: {{ fact.factValue }}</li>
                      </ul>
                    </div>
                  </TabPanel>

                  <TabPanel class="text-sm text-gray-500">
                    <h3 class="sr-only">Nearby Hospitals</h3>
                    <div>
                      <div class="sm:flex sm:items-center mt-3">
                        <div class="sm:flex-auto">
                          <h1 class="text-base font-semibold leading-6 text-gray-900">Nearby Hospitals</h1>
                        </div>
                      </div>
                      <div class="mt-2 flow-root">
                        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full divide-y divide-gray-300">
                              <thead>
                                <tr>
                                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rating</th>
                                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Distance (km)</th>
                                </tr>
                              </thead>
                              <tbody class="divide-y divide-gray-200">
                                <tr v-for="hospital in property.nearby_hospitals" :key="hospital.name">
                                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ hospital.name }}</td>
                                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ hospital.rating }}</td>
                                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ hospital.distance }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>


                  <TabPanel class="pt-10">
                    <h3 class="sr-only">MAO Calculation</h3>
                    <div class="text-right">
                      <h4 class="mb-0">Maximum Allowable Offer (MAO):</h4>
                      <p id="maoDisplay" class="mb-0 text-lg">--</p>
                    </div>
                    <form class="mb-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div class="sm:col-span-2">
                        <label for="customRange3" class="block text-sm font-semibold leading-6 text-gray-900">Percentage for MAO Calculation*</label>
                        <div class="mt-2.5">
                          <span id="percentageDisplay" class="float-right">{{ percentage }}%</span>
                          <input type="range" id="customRange3" min="50" max="100" step="1" v-model="percentage" class="block w-full">
                        </div>
                      </div>
                      <div>
                        <label for="arvInput" class="block text-sm font-semibold leading-6 text-gray-900">After Repair Value (ARV)*</label>
                        <div class="mt-2.5">
                          <div class="relative rounded-md shadow-sm">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span class="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input type="text" id="arvInput" v-model="arv" placeholder="Select comps to view" class="block w-full rounded-md border-0 pl-7 pr-12 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          </div>
                        </div>
                      </div>
                      <div>
                        <label for="repairCostInput" class="block text-sm font-semibold leading-6 text-gray-900">Cost of Repairs*</label>
                        <div class="mt-2.5">
                          <div class="relative rounded-md shadow-sm">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span class="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input type="number" id="repairCostInput" v-model="repairCost" placeholder="Cost of Repairs" class="block w-full rounded-md border-0 pl-7 pr-12 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          </div>
                        </div>
                      </div>
                      <div>
                        <label for="assignmentFeeInput" class="block text-sm font-semibold leading-6 text-gray-900">Assignment Fee*</label>
                        <div class="mt-2.5">
                          <div class="relative rounded-md shadow-sm">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span class="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input type="number" id="assignmentFeeInput" v-model="assignmentFee" placeholder="Assignment Fee" class="block w-full rounded-md border-0 pl-7 pr-12 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          </div>
                        </div>
                      </div>
                      <div class="sm:col-span-2">
                        <button type="button" @click="calculateMAO" class="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                          Calculate MAO
                        </button>
                      </div>
                    </form>
                  </TabPanel>

                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="data.loading">
            Loading...
          </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { usePropertiesStore } from '~/store/DataStore';
import { GoogleMap, Marker } from 'vue3-google-map';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';

definePageMeta({
  layout: 'main',
});

const config = useRuntimeConfig();

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
    loading: false,
  },
});

const property = ref({
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
  nearby_hospitals: [],
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
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
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
        console.log(response._data)
        fetchPropertyImages(response._data.zpid);
        property.value = response._data;
        arv.value = property.value.price;
      } else {
        console.error('Response error:', response.status);
      }
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.error('Response error:', response.status);
    },
  });
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
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
    },
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
  const dLon = toRad(lon1 - lon2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
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
        distance: calculateDistance(latitude, longitude, place.geometry.location.lat(), place.geometry.location.lng()).toFixed(2), // Distance in kilometers
      }));

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

function formatCurrency(value) {
    if (typeof value !== 'number') {
      return value;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

const percentage = ref(70);
const arv = ref('');
const repairCost = ref('');
const assignmentFee = ref('');

const calculateMAO = () => {
  const arvValue = parseFloat(arv.value) || 0;
  const repairCostValue = parseFloat(repairCost.value) || 0;
  const assignmentFeeValue = parseFloat(assignmentFee.value) || 0;
  const mao = ((arvValue * (percentage.value / 100)) - repairCostValue - assignmentFeeValue).toFixed(2);
  document.getElementById('maoDisplay').textContent = "$" + mao.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
};


</script>

<style scoped>
/* Add your custom styles here */
</style>
