<template>
    <div class="relative rounded-md shadow-sm">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span class="text-gray-500 sm:text-sm">$</span>
      </div>
      <input
        type="text"
        :name="name"
        :id="id"
        v-model="displayValue"
        @input="updateValue"
        @blur="formatValue"
        class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="0"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: [Number, String],
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const displayValue = ref('');
  
  watch(() => props.modelValue, (newValue) => {
    displayValue.value = newValue ? formatNumberToCurrency(newValue) : '';
  }, { immediate: true });
  
  const updateValue = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    emit('update:modelValue', value ? parseInt(value, 10) : '');
  };
  
  const formatValue = () => {
    displayValue.value = formatNumberToCurrency(props.modelValue);
  };
  
  const formatNumberToCurrency = (number) => {
    return number
      ? new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD', 
          minimumFractionDigits: 0, 
          maximumFractionDigits: 0 
        }).format(number)
      : '';
  };
  </script>