<!-- CompsTable.vue -->
<template>
    <div>
      <h3 class="text-xl font-semibold text-gray-900 mb-3">Comparable Properties</h3>
      <div class="mt-8 space-y-20 lg:space-y-20">
        <article v-for="comp in comps" :key="comp.id" class="relative isolate flex flex-col gap-8 lg:flex-row">
          <div>
            <div class="flex items-center gap-x-4 text-xs">
              <span class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">{{ comp.landUse }}</span>
              <!-- <span class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">{{ comp.zoning }}</span> -->
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
              <div class="relative flex items-center gap-x-4 mr-6 mb-4">
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-900">Pre Foreclosure</p>
                  <p class="text-gray-600">{{ $formatCurrency(comp.preForeclosure) }}</p>
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
  
  const { $formatCurrency } = useNuxtApp()
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  
  const removeTrailingZeros = (value) => {
    if (typeof value === 'string') {
      value = value.trim()
      if (!isNaN(parseFloat(value))) {
        return value.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1')
      }
    }
    return value
  }
  </script>