<template>
  <div class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
    <TabGroup as="div">
      <div class="border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <TabList class="-mb-px flex space-x-8 px-4">
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
          <Tab as="template" v-slot="{ selected }">
            <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800', 'whitespace-nowrap border-b-2 py-6 text-sm font-medium']">
              LOI Email
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
        <TabPanel class="pt-10">
          <LOIEmailTemplate :property="property" />
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

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}

/* Add fade effect to indicate more content */
.overflow-x-auto {
  position: relative;
}
.overflow-x-auto::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 30px;
  background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));
  pointer-events: none;
}

@media (min-width: 1024px) {
  .overflow-x-auto::after {
    display: none;
  }
}
</style>