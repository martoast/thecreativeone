<template>
    <div class="bg-gray-50 min-h-screen">
      <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="pb-4">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">Find your next property</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Property listings</p>
        </div>
  
        <!-- Toggle Switch for Sold/Available Filter -->
        <div class="mb-4 flex items-center">
          <label for="soldToggle" class="text-gray-900 mr-2">Show Available properties</label>
          <Switch v-model="showSold" :class="[!showSold ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
            <span class="sr-only">Show Sold Properties</span>
            <span aria-hidden="true" :class="[!showSold ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
          </Switch>
          <button @click="resetShowSold" type="button" class="ml-3 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Show All</button>
        </div>
  
        <Listings v-if="propertiesReady" :properties="properties" />
  
        <!-- Pagination controls -->
        <div class="mt-8 flex justify-between items-center">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-gray-900 bg-indigo-600 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <p class="text-gray-900">
            Page {{ currentPage }} of {{ totalPages }}
          </p>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-gray-900 bg-indigo-600 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
  
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { usePropertiesStore } from '~/store/DataStore'
  import { Switch } from '@headlessui/vue'
  
  definePageMeta({
    layout: 'main'
  })
  
  const store = usePropertiesStore()
  
  const currentPage = ref(1)
  const itemsPerPage = 10
  const showSold = ref(false)
  const propertiesReady = ref(false)
  
  const { data, pending, error, refresh } = await useAsyncData(
      'properties',
      () => store.get(currentPage.value, itemsPerPage, showSold.value)
    )
  
  const totalPages = computed(() => Math.ceil(store.total / itemsPerPage))
  
  const properties = computed(() => {
  if (!store.properties.length) return []
  return store.properties.map(property => ({
    ...property,
    images: property.images && property.images.length ? JSON.parse(property.images) : []
  }))
})
  
  watch(data, () => {
    propertiesReady.value = true
  })
  
  const nextPage = async () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      await refresh()
    }
  }
  
  const prevPage = async () => {
    if (currentPage.value > 1) {
      currentPage.value--
      await refresh()
    }
  }
  
  watch(showSold, async () => {
    currentPage.value = 1
    propertiesReady.value = false
    await refresh()
    propertiesReady.value = true
  })
  
  const resetShowSold = async () => {
    showSold.value = null
    propertiesReady.value = false
    await refresh()
    propertiesReady.value = true
  }
  </script>