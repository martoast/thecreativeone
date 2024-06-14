<template>
  <contact-form :initial-contact-type="initialContactType" :address="address" />
</template>

<script setup>

definePageMeta({
  layout: 'main'
})

const route = useRoute()
const initialContactType = route.query.type || 'default'
const address = route.query.address || null
</script>
