<template>
    <contact-form :initial-contact-type="initialContactType" />
  </template>
  
  <script setup>
  
  definePageMeta({
    layout: 'main'
  })
  
  const route = useRoute()
  const initialContactType = route.query.type || 'default'
  </script>
  