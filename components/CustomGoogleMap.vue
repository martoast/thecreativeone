<template>
  <div style="position: relative;">
    <GoogleMap
      :api-key="googleMapsApiKey"
      :libraries="libraries"
      :style="{ width: '100%', height: height }"
      :center="center"
      :zoom="zoom"
    />
  </div>
</template>

<script setup>

const config = useRuntimeConfig()

const googleMapsApiKey = config.public.GOOGLE_MAPS_API_KEY;

const props = defineProps({
  libraries: {
    type: Array,
    default: () => ['places'],
  },
  center: {
    type: Object,
    required: true,
  },
  zoom: {
    type: Number,
    default: 10,
  },
  height: {
    type: String,
    default: '500px',
  },
});
</script>
