<!-- MAOCalculator.vue -->
<template>
    <div>
      <h3 class="sr-only">MAO Calculation</h3>
      <div class="text-right">
        <h4 class="mb-0">Maximum Allowable Offer (MAO):</h4>
        <p class="mb-0 text-lg">{{ formattedMAO }}</p>
      </div>
      <form class="mb-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="customRange3" class="block text-sm font-semibold leading-6 text-gray-900">Percentage for MAO Calculation*</label>
          <div class="mt-2.5">
            <span class="float-right">{{ percentage }}%</span>
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
              <input type="number" id="arvInput" v-model="arv" placeholder="After Repair Value" class="block w-full rounded-md border-0 pl-7 pr-12 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    property: {
      type: Object,
      required: true
    }
  })
  
  const { $formatCurrency } = useNuxtApp()
  
  const percentage = ref(70)
  const arv = ref('')
  const repairCost = ref('')
  const assignmentFee = ref('')
  
  const mao = computed(() => {
    const arvValue = parseFloat(arv.value) || 0
    const repairCostValue = parseFloat(repairCost.value) || 0
    const assignmentFeeValue = parseFloat(assignmentFee.value) || 0
    return ((arvValue * (percentage.value / 100)) - repairCostValue - assignmentFeeValue)
  })
  
  const formattedMAO = computed(() => {
    return $formatCurrency(mao.value)
  })
  </script>