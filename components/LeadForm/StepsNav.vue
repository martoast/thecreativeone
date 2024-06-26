<template>
    <nav class="flex items-center justify-center mb-8" aria-label="Progress">
        <p class="text-sm font-medium">Step {{ currentStep + 1 }} of {{ totalSteps }}</p>
        <ol role="list" class="ml-8 flex items-center space-x-10">
          <li v-for="step in steps" :key="step.name">
            <div v-if="step.status === 'complete'" class="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900">
              <span class="sr-only">{{ step.name }}</span>
            </div>
            <div v-else-if="step.status === 'current'" class="relative flex items-center justify-center" aria-current="step">
              <span class="absolute flex h-5 w-5 p-px" aria-hidden="true">
                <span class="h-full w-full rounded-full bg-indigo-200" />
              </span>
              <span class="relative block h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
              <span class="sr-only">{{ step.name }}</span>
            </div>
            <div v-else class="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400">
              <span class="sr-only">{{ step.name }}</span>
            </div>
          </li>
        </ol>
      </nav>
</template>

<script setup>

const props = defineProps({
    currentStep: {
        type: Number,
        default: 0,
        required: true
    }
  });


const totalSteps = 6;

const steps = computed(() => [
    { id: '0', name: 'Contact', href: '/send-me-a-lead/steps/0', status: props.currentStep >= 0 ? 'complete' : 'upcoming' },
    { id: '1', name: 'Contact Info', href: '/send-me-a-lead/steps/1', status: props.currentStep >= 1 ? 'complete' : 'upcoming' },
    { id: '2', name: 'Property', href: '/send-me-a-lead/steps/2', status: props.currentStep >= 2 ? 'complete' : 'upcoming' },
    { id: '3', name: 'Specific Info', href: '/send-me-a-lead/steps/3', status: props.currentStep >= 3 ? 'complete' : 'upcoming' },
    { id: '4', name: 'Mortgage', href: '/send-me-a-lead/steps/4', status: props.currentStep >= 4 ? 'complete' : 'upcoming' },
    { id: '5', name: 'Additional Info', href: '/send-me-a-lead/steps/5', status: props.currentStep === 5 ? 'complete' : 'upcoming' },
  ]);

</script>