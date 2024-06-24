<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    
    <div class="mx-auto max-w-2xl text-center">
      <div class="mb-4">
          <a href="/" class="text-sm font-semibold leading-7 text-indigo-600"><span aria-hidden="true">&larr;</span> Back to home</a>
        </div>
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Send me a lead</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Whether you're buying or selling a property, we are interested.</p>
    </div>
  <SendMeLeadForm :initial-contact-type="initialContactType" :address="address" />
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'main'
})

const route = useRoute()
const initialContactType = route.query.type || 'default'
const address = route.query.address || null
</script>
