<template>
    <span class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
      <svg class="h-1.5 w-1.5" :class="colorClass" viewBox="0 0 6 6" aria-hidden="true">
        <circle cx="3" cy="3" r="3" />
      </svg>
      {{ text }}
    </span>
  </template>
  
  <script setup>
  const props = defineProps({
    color: {
      type: String,
      default: 'gray'
    },
    text: {
      type: String,
      required: true
    }
  })
  
  const colorClasses = {
    red: 'fill-red-500',
    green: 'fill-green-500',
    blue: 'fill-indigo-500',
    yellow: 'fill-yellow-500',
    gray: 'fill-gray-500',
    // Add more colors as needed
  }
  
  const colorClass = computed(() => colorClasses[props.color] || colorClasses.gray)
  </script>