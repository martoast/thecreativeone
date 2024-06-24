<template>
    <nav aria-label="Progress">
      <ol role="list" class="space-y-4 md:flex md:space-x-8 md:space-y-0">
        <li v-for="step in steps" :key="step.name" class="md:flex-1">
          <button
            @click="handleStepChange(step.id)"
            :class="[
              step.status === 'complete' ? 'border-indigo-600 hover:border-indigo-800' : '',
              step.status === 'current' ? 'border-indigo-600' : '',
              step.status === 'upcoming' ? 'border-gray-200 hover:border-gray-300' : '',
              'group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 w-full text-left'
            ]"
            :aria-current="step.status === 'current' ? 'step' : undefined"
          >
            <span
              :class="[
                step.status === 'complete' ? 'text-indigo-600 group-hover:text-indigo-800' : '',
                step.status === 'current' ? 'text-indigo-600' : '',
                step.status === 'upcoming' ? 'text-gray-500 group-hover:text-gray-700' : '',
                'text-sm font-medium'
              ]"
            >
              {{ step.id }}
            </span>
            <span class="text-sm font-medium">{{ step.name }}</span>
          </button>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    currentStep: {
      type: Number,
      required: true
    },
    totalSteps: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['update:current-step']);
  
  const steps = computed(() => [
    { id: '1', name: 'Basic Info', status: props.currentStep >= 1 ? 'complete' : 'upcoming' },
    { id: '2', name: 'Address', status: props.currentStep >= 2 ? 'complete' : 'upcoming' },
    { id: '3', name: 'Specific Info', status: props.currentStep >= 3 ? 'complete' : 'upcoming' },
    { id: '4', name: 'Mortgage', status: props.currentStep >= 4 ? 'complete' : 'upcoming' },
    { id: '5', name: 'Additional Info', status: props.currentStep === 5 ? 'complete' : 'upcoming' },
  ].map(step => ({
    ...step,
    status: parseInt(step.id) === props.currentStep ? 'current' : step.status
  })));
  
  const handleStepChange = (stepId) => {
    const newStep = parseInt(stepId);
    if (newStep <= props.currentStep) {
      emit('update:current-step', newStep);
    }
  };
  </script>