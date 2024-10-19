<template>
  <div class="space-y-6 mt-6">
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-2xl font-semibold text-gray-900 mb-6">
        Comparable Properties
      </h3>
      <div class="relative">
        <button
          @click="scrollLeft"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div
          ref="scrollContainer"
          class="flex overflow-x-auto space-x-6 py-4 hide-scrollbar"
        >
          <div
            v-for="comp in property.re.details.comps"
            :key="comp.id"
            class="flex-none w-96"
          >
            <div
              @click="handlePropertyDetails(comp)"
              class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-200 transform hover:scale-105 cursor-pointer"
            >
              <div class="relative">
                <img
                  :src="getStreetViewImageUrl(comp)"
                  :alt="comp.address.address"
                  class="w-full h-64 object-cover"
                />
                <div
                  class="absolute top-0 left-0 bg-indigo-600 text-white px-4 py-2 m-4 rounded-lg text-sm font-bold shadow-md"
                >
                  {{ formatCurrency(comp.estimatedValue) }}
                </div>
                <div
                  class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6"
                >
                  <h5 class="text-xl font-bold text-white mb-2 truncate">
                    {{ comp.address.address }}
                  </h5>
                  <div
                    class="flex items-center space-x-2 text-sm text-gray-200"
                  >
                    <span>{{ removeTrailingZeros(comp.bedrooms) }} bed</span>
                    <span>&bull;</span>
                    <span>{{ removeTrailingZeros(comp.bathrooms) }} bath</span>
                    <span>&bull;</span>
                    <span
                      >{{
                        comp.squareFeet
                          ? comp.squareFeet.toLocaleString()
                          : "N/A"
                      }}
                      sqft</span
                    >
                    <span>&bull;</span>
                    <span
                      >{{ comp.yearBuilt ? comp.yearBuilt : "N/A" }} year
                      built</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="scrollRight"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
});

const config = useRuntimeConfig();
const google_api_key = config.public.GOOGLE_MAPS_API_KEY;

const { $locally } = useNuxtApp();

const scrollContainer = ref(null);

const formatCurrency = (value) => {
  if (typeof value !== "number" && typeof value !== "string") return "N/A";
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numValue);
};

const removeTrailingZeros = (value) => {
  if (typeof value === "string") {
    value = value.trim();
    if (!isNaN(parseFloat(value))) {
      return value.replace(/(\.\d*?[1-9])0+$|\.0+$/, "$1");
    }
  }
  return value;
};

const scrollLeft = () => {
  scrollContainer.value.scrollBy({ left: -320, behavior: "smooth" });
};

const scrollRight = () => {
  scrollContainer.value.scrollBy({ left: 320, behavior: "smooth" });
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

const getStreetViewImageUrl = (property) => {
  if (!property.latitude || !property.longitude) return "/placeholder.png";
  return `https://maps.googleapis.com/maps/api/streetview?location=${property.latitude},${property.longitude}&size=400x300&key=${google_api_key}`;
};

const handlePropertyDetails = async (comp) => {
  try {
    $locally.deleteItem(`propertyData`);
    await navigateTo({
      path: '/realty-radar/report/' + comp.address.address,
      redirectCode: 301,
      query: {
        full_address: comp.address.address,
        address: comp.address.street,
        city: comp.address.city,
        state: comp.address.state,
        zip: comp.address.zip,
        longitude: comp.longitude,
        latitude: comp.latitude,
      }
    })
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
