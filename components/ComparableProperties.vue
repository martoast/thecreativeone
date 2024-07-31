<!-- CompsTable.vue -->
<template>
    <div>
      <h3 class="text-xl font-semibold text-gray-900 mb-3">Comparable Properties</h3>
      <div class="mt-8 space-y-20 lg:space-y-20">
        <article v-for="comp in comps" :key="comp.id" class="relative isolate flex flex-col gap-8 lg:flex-row cursor-pointer hover:bg-gray-50"
        @click="navigateToProperty(comp)">
          <div>
            <div class="flex items-center gap-x-4 text-xs">
              <span class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">{{ comp.landUse }}</span>
              <span v-if="comp.preForeclosure" class="relative z-10 rounded-full bg-red-400 px-3 py-1.5 font-medium text-gray-600">{{ comp.preForeclosure }}</span>
            </div>
            <div class="group relative max-w-xl">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                {{ comp.address.address }}
              </h3>
              <p class="mt-5 text-sm leading-6 text-gray-600">
                {{ removeTrailingZeros(comp.bedrooms) }} beds | {{ removeTrailingZeros(comp.bathrooms) }} baths | {{ comp.squareFeet }} sqft | {{comp.lotSquareFeet}} lot sqft | {{comp.yearBuilt}} year built
              </p>
            </div>
            <div class="mt-6 flex flex-wrap border-t border-gray-900/5 pt-6">
              <div class="relative flex items-center gap-x-4 mr-6 mb-4">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">Estimated value</p>
                  <p class="text-gray-600">{{ $formatCurrency(Number(comp.estimatedValue)) }}</p>
                </div>
              </div>
              <div class="relative flex items-center gap-x-4 mr-6 mb-4">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">Last Sale Amount</p>
                  <p class="text-gray-600">{{ $formatCurrency(Number(comp.lastSaleAmount)) }}</p>
                </div>
              </div>
              <div class="relative flex items-center gap-x-4 mr-6 mb-4">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">Equity</p>
                  <p class="text-gray-600">{{ comp.equityPercent }}%</p>
                </div>
              </div>
              <div class="relative flex items-center gap-x-4 mr-6 mb-4">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">Open Mortgage</p>
                  <p class="text-gray-600">{{ $formatCurrency(Number(comp.openMortgageBalance)) }}</p>
                </div>
              </div>
              
            </div>
          </div>
        </article>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    comps: {
      type: Array,
      required: true
    }
  })
  
  const { $formatCurrency, $locally } = useNuxtApp()

  
  const removeTrailingZeros = (value) => {
    if (typeof value === 'string') {
      value = value.trim()
      if (!isNaN(parseFloat(value))) {
        return value.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1')
      }
    }
    return value
  }

  const navigateToProperty = async (comp) => {
    $locally.deleteItem("propertyData")

    console.log("success")

    await navigateTo({
      path: '/realty-radar/report/' + comp.address.address,
      redirectCode: 301,
      query: {
        full_address: comp.address.address,
        address: comp.address.street,
        city: comp.address.city,
        state: comp.address.state,
        zip: comp.address.zip,
        longitude: comp.longitude,
        latitude: comp.latitude,
      }
    })
    
  }
  </script>