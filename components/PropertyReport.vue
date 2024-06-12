<template>
    <div class="container mx-auto pt-3">
      <div class="max-w-screen-lg mx-auto">
        <nav class="bg-white shadow-sm flex justify-between items-center py-4 px-6">
          <a class="flex items-center space-x-2" href="#">
            <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="Realty Radar">
            <span class="text-xl font-semibold">Realty Radar</span>
          </a>
          <button @click="printDocument" class="btn btn-primary flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">
            <span>Download PDF</span>
            <i class="fas fa-print"></i>
          </button>
        </nav>
  
        <div class="px-4">
          <h3 class="pt-3 text-2xl font-bold">{{ property.full_address }}</h3>
  
          <div class="flex justify-between items-start mt-4">
            <div class="bg-white shadow rounded mb-4 p-4 w-6/12">
              <img :src="property.imgSrc" class="w-full h-auto mb-3" alt="Property Image">
              <div class="flex justify-between">
                <a :href="property.url" class="btn btn-outline-primary text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-100" target="_blank">
                  <i class="fas fa-link"></i>
                  View on Zillow
                </a>
              </div>
            </div>
            
            <div class="bg-white shadow rounded mb-4 p-4 w-3/12">
              <h5 class="text-lg font-semibold flex items-center space-x-2">
                <i class="fas fa-home text-blue-500"></i>
                <span>Property Details</span>
              </h5>
              <div>
                <strong class="block">Price:</strong>
                <span>{{ property.price  }}</span>
              </div>
              <div>
                <strong class="block">Estimated Value:</strong>
                <span>{{ property.zestimate  }}</span>
              </div>
              <div>
                <strong class="block">MLS:</strong>
                <span>{{ property.mlsid }}</span>
              </div>
              <ul class="mt-2 space-y-1">
                <li><strong><i class="fas fa-building"></i> Home Type:</strong> <span>{{ property.homeType }}</span></li>
                <li><strong><i class="fas fa-bath"></i> Bathrooms:</strong> <span>{{ property.bathrooms }}</span></li>
                <li><strong><i class="fas fa-bed"></i> Bedrooms:</strong> <span>{{ property.bedrooms }}</span></li>
                <li><strong><i class="fas fa-hammer"></i> Year Built:</strong> <span>{{ property.yearBuilt }}</span></li>
                <li><strong><i class="fas fa-dollar-sign"></i> Last Sale Price:</strong> <span>{{ property.lastSalePrice  }}</span></li>
                <li><strong><i class="fas fa-calendar-day"></i> Last Sale Date:</strong> <span>{{ property.lastSaleDate }}</span></li>
              </ul>
            </div>
  
            <div class="bg-white shadow rounded mb-4 p-4 w-3/12">
              <h5 class="text-lg font-semibold flex items-center space-x-2">
                <i class="fas fa-info-circle text-blue-500"></i>
                <span>Opportunity</span>
              </h5>
              <ul class="mt-2 space-y-1">
                <li><strong><i class="fas fa-gavel"></i> Foreclosure:</strong> <span>{{ property.foreclosure ? 'Yes' : 'No' }}</span></li>
                <li><strong><i class="fas fa-dollar-sign"></i> Open Mortgage Balance:</strong> <span>{{ property.openMortgageBalance  }}</span></li>
                <li><strong><i class="fas fa-dollar-sign"></i> Gross Per Year:</strong> <span>{{ property.grossPerYear  }}</span></li>
                <li><strong><i class="fas fa-hourglass-half"></i> Days on Market:</strong> <span>{{ property.daysOnMarket }}</span></li>
              </ul>
              <h5 class="text-lg font-semibold flex items-center space-x-2 mt-4">
                <i class="fas fa-info-circle text-blue-500"></i>
                <span>Additional Info</span>
              </h5>
              <ul class="mt-2 space-y-1">
                <li><strong><i class="fas fa-file-contract"></i> Liens:</strong> <span>{{ property.lien ? 'Yes' : 'No' }}</span></li>
                <li><strong><i class="fas fa-key"></i> Owner Occupied:</strong> <span>{{ property.ownerOccupied ? 'Yes' : 'No' }}</span></li>
                <li><strong><i class="fas fa-warehouse"></i> Parking Available:</strong> <span>{{ property.parkingFeatures }}</span></li>
                <li><strong><i class="fas fa-hand-holding-usd"></i> HOA Fee:</strong> <span>{{ property.hoaFeeTotal }}</span></li>
                <li><strong><i class="fas fa-users"></i> Has Association:</strong> <span>{{ property.hasAssociation ? 'Yes' : 'No' }}</span></li>
              </ul>
              <h5 class="text-lg font-semibold flex items-center space-x-2 mt-4">
                <i class="fas fa-hand-holding-usd text-blue-500"></i>
                <span>Rent Information</span>
              </h5>
              <ul class="mt-2 space-y-1">
                <li><strong>Rent:</strong> <span>{{ property.rentZestimate  }}</span></li>
                <li><strong>Rent Range:</strong> <span>{{ property.rentRange }}</span></li>
                <li><strong>Average Comp Rent:</strong> <span>{{ property.averageCompRent  }}</span></li>
              </ul>
            </div>
          </div>
          <p id="mainDescription" class="mt-4 text-gray-700">{{ property.description }}</p>
        </div>
  
        <div id="mortgage-info" class="px-4">
          <div class="bg-white shadow rounded mb-4 p-4">
            <h5 class="text-lg font-semibold flex items-center space-x-2">
              <i class="fas fa-user text-blue-500"></i>
              <span>Owner Details</span>
            </h5>
            <ul class="mt-2 space-y-1">
              <li><strong><i class="fas fa-user"></i> Name:</strong> <span>{{ property.ownerFullName }}</span></li>
              <li><strong><i class="fas fa-user-tag"></i> Owner Type:</strong> <span>{{ property.ownerType }}</span></li>
              <li><strong><i class="fas fa-envelope"></i> Email:</strong> <span>{{ property.ownerEmail }}</span></li>
              <li><strong><i class="fas fa-phone"></i> Phones:</strong> <span>{{ property.ownerPhones }}</span></li>
            </ul>
          </div>
        </div>
  
        <div id="lot-info" class="px-4">
          <div class="bg-white shadow rounded mb-4 p-4">
            <h5 class="text-lg font-semibold flex items-center space-x-2">
              <i class="fas fa-th-large text-blue-500"></i>
              <span>Lot Information</span>
            </h5>
            <ul class="mt-2 space-y-1">
              <li><strong><i class="fas fa-map-marker-alt"></i> APN:</strong> <span>{{ property.parcelNumber }}</span></li>
              <li><strong><i class="fas fa-map-marker-alt"></i> Lot Size:</strong> <span>{{ property.lotSize }}</span></li>
              <li><strong><i class="fas fa-expand-arrows-alt"></i> Living Area:</strong> <span>{{ property.livingArea }}</span></li>
              <li><strong><i class="fas fa-ruler-combined"></i> Price per Square Foot:</strong> <span>{{ property.pricePerSquareFoot  }}</span></li>
              <li><strong><i class="fas fa-code-branch"></i> Subdivision:</strong> <span>{{ property.subdivisionName }}</span></li>
              <li><strong><i class="fas fa-gavel"></i> Zoning:</strong> <span>{{ property.zoning }}</span></li>
            </ul>
          </div>
        </div>
  
        <div class="px-4">
          <div class="bg-white shadow rounded mb-4 p-4">
            <h5 class="text-lg font-semibold flex items-center space-x-2">
              <i class="fas fa-info-circle text-blue-500"></i>
              <span>Tax History</span>
            </h5>
            <table class="min-w-full bg-white">
              <thead>
                <tr>
                  <th class="py-2 px-4 border-b">Year</th>
                  <th class="py-2 px-4 border-b">Tax Paid</th>
                  <th class="py-2 px-4 border-b">Value</th>
                  <th class="py-2 px-4 border-b">Value Increase Rate</th>
                  <th class="py-2 px-4 border-b">Tax Increase Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tax in property.taxHistory" :key="tax.time">
                  <td class="py-2 px-4 border-b">{{ new Date(tax.time).getFullYear() }}</td>
                  <td class="py-2 px-4 border-b">{{ tax.taxPaid  }}</td>
                  <td class="py-2 px-4 border-b">{{ tax.value  }}</td>
                  <td class="py-2 px-4 border-b">{{ (tax.valueIncreaseRate * 100).toFixed(2) }}%</td>
                  <td class="py-2 px-4 border-b">{{ (tax.taxIncreaseRate * 100).toFixed(2) }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <div class="px-4">
          <div class="bg-white shadow rounded mb-4 p-4">
            <h5 class="text-lg font-semibold flex items-center space-x-2">
              <i class="fas fa-info-circle text-blue-500"></i>
              <span>Nearby Homes</span>
            </h5>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="home in property.nearbyHomes" :key="home.zpid" class="bg-white shadow rounded p-4">
                <img :src="home.miniCardPhotos[0].url" class="w-full h-auto mb-2" alt="Nearby Home Image">
                <div>
                  <p><strong>Address:</strong> {{ home.address.streetAddress }}, {{ home.address.city }}, {{ home.address.state }} {{ home.address.zipcode }}</p>
                  <p><strong>Price:</strong> {{ home.price  }}</p>
                  <p><strong>Living Area:</strong> {{ home.livingArea }}</p>
                  <p><strong>Lot Size:</strong> {{ home.lotSize }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePropertiesStore } from '~/store/DataStore'
  
  const props = defineProps({
    property: Object
  });
  
  const property = ref({ ...props.property });
  
  const printDocument = () => {
    window.print();
  };
  
  // Filters
  const filters = {
    currency(value) {
      if (!value) return '$0';
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
  };
  
  for (const [key, filter] of Object.entries(filters)) {
    app.config.globalProperties.$filters[key] = filter;
  }
  </script>
  
  <style>
  .container {
    max-width: 1137px;
  }
  </style>
  