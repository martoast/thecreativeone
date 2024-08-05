<template>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grades</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(school, index) in schools" :key="index" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ school.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ school.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ school.grades }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ school.rating }}/10</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  defineProps({
    schools: {
      type: Array,
      required: true
    }
  })
  </script>