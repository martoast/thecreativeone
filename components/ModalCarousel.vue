<template>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" @click="closeModal">
    <div class="relative w-full h-full max-w-7xl p-4" @click.stop>
      <button class="absolute top-4 right-4 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors z-[60]" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Carousel wrapper -->
      <div class="relative h-full flex items-center justify-center z-[51]">
        <div v-for="(image, index) in images" :key="index" 
             :class="['absolute w-full h-full transition-opacity duration-300 ease-in-out flex items-center justify-center', 
                      currentIndex === index ? 'opacity-100 z-[52]' : 'opacity-0 z-[51]']">
          <img :src="image" :alt="`Image ${index + 1}`"
               :class="['max-w-full max-h-full object-contain', isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in']"
               @click="toggleZoom"
               :style="isZoomed ? 'transform: scale(1.5); transition: transform 0.3s ease-in-out;' : ''" />
        </div>
      </div>

      <!-- Image counter -->
      <div class="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full z-[60]">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>

      <!-- Slider controls -->
      <button v-if="images.length > 1" @click.stop="prevImage" 
              class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors z-[60]">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button v-if="images.length > 1" @click.stop="nextImage"
              class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors z-[60]">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <!-- Thumbnail navigation -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-full p-2 bg-gray-800 rounded-full z-[60]">
        <button v-for="(image, index) in images" :key="index" @click.stop="setCurrentIndex(index)"
                :class="['w-12 h-12 rounded-full overflow-hidden focus:outline-none', currentIndex === index ? 'ring-2 ring-white' : '']">
          <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  showModal: Boolean,
  images: Array,
  startIndex: Number
})

const emit = defineEmits(['close'])

const currentIndex = ref(props.startIndex)
const isZoomed = ref(false)

watch(() => props.startIndex, (newIndex) => {
  currentIndex.value = newIndex
})

function closeModal() {
  isZoomed.value = false
  emit('close')
}

function prevImage() {
  currentIndex.value = (currentIndex.value > 0) ? currentIndex.value - 1 : props.images.length - 1
  isZoomed.value = false
}

function nextImage() {
  currentIndex.value = (currentIndex.value < props.images.length - 1) ? currentIndex.value + 1 : 0
  isZoomed.value = false
}

function setCurrentIndex(index) {
  currentIndex.value = index
  isZoomed.value = false
}

function toggleZoom() {
  isZoomed.value = !isZoomed.value
}
</script>