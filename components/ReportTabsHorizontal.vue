<template>
  <div class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
    <TabGroup as="div">
      <div class="border-b border-gray-200">
        <TabList class="-mb-px flex space-x-8">
          <Tab as="template" v-slot="{ selected }">
            <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">
              MAO Calculation
            </button>
          </Tab>
          
          <Tab as="template" v-slot="{ selected }">
            <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">
              SUB2 Email
            </button>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">
              Agent Email
            </button>
          </Tab>
        </TabList>
      </div>
      <TabPanels as="template">
        <TabPanel class="pt-10">
          <MAOCalculator :property="property" />
        </TabPanel>
        
        <TabPanel class="pt-10">
          <SUB2EmailTemplate :property="property" />
        </TabPanel>
        <TabPanel class="pt-10">
          <AgentEmailTemplate :property="property" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})
</script>