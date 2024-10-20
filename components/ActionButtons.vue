<template>
    <div class="mb-6 space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          @click="openStreetView"
          type="button"
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <MapIcon class="h-5 w-5 mr-2" />
          Street View
        </button>
        <button
          @click="openZillow"
          type="button"
          class="flex w-full items-center justify-center rounded-md border border-indigo-600 bg-white px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <HomeIcon class="h-5 w-5 mr-2" />
          View on Zillow
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <button
          @click="handleSendLead"
          type="button"
          class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Send me this lead
        </button>
        <button
          @click="openShareModal"
          type="button"
          class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <ShareIcon class="h-5 w-5 mr-2" />
          Share
        </button>
        <button
          @click="printDetails"
          type="button"
          class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PrinterIcon class="h-5 w-5 mr-2" />
          Print
        </button>
        <button
          @click="contactOwner"
          type="button"
          class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PhoneIcon class="h-5 w-5 mr-2" />
          Contact Owner
        </button>
      </div>
      <ShareModal :is-open="isShareModalOpen" :property-info="property" @close="closeShareModal" />
    </div>
  </template>
  
  <script setup>
  import { PhoneIcon, PlusIcon, MapIcon, HomeIcon, ShareIcon, PrinterIcon } from "@heroicons/vue/24/solid";

  const { $locally } = useNuxtApp()
  
  const props = defineProps({
    property: {
      type: Object,
      required: true,
    },
  });

  const isShareModalOpen = ref(false);

const openShareModal = () => {
  isShareModalOpen.value = true;
};

const closeShareModal = () => {
  isShareModalOpen.value = false;
};
  
  const openStreetView = () => {
    if (props.property && props.property.re.details.propertyInfo) {
      const { latitude, longitude } = props.property.re.details.propertyInfo;
      if (latitude && longitude) {
        const url = `https://www.google.com/maps/@${latitude},${longitude},3a,75y,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192`;
        window.open(url, '_blank');
      } else {
        console.error('Latitude or longitude is missing');
        // Show an error message to the user
      }
    } else {
      console.error('Property information is not available');
      // Show an error message to the user
    }
  };
  
  const openZillow = () => {
  if (props.property && props.property.zillow && props.property.zillow.zpid) {
    const zpid = props.property.zillow.zpid;
    const url = `https://www.zillow.com/homedetails/${zpid}_zpid/`;
    window.open(url, '_blank');
  } else if (props.property && props.property.re.details.propertyInfo && props.property.re.details.propertyInfo.address) {
    // Fallback to using the address if zpid is not available
    const { address } = props.property.re.details.propertyInfo;
    const encodedAddress = encodeURIComponent(address.label);
    const url = `https://www.zillow.com/homes/${encodedAddress}`;
    window.open(url, '_blank');
  } else {
    console.error('Zillow property ID and address information are not available');
    // Show an error message to the user
  }
};
  
  const handleSendLead = async () => {
  $locally.deleteItem('formData')
  $locally.setItem('formData', {
    fullAddress: props.property.re.details.propertyInfo.address.label,
    streetAddress: props.property.re.details.propertyInfo.address.address,
    city: props.property.re.details.propertyInfo.address.city,
    state: props.property.re.details.propertyInfo.address.state,
    postalCode: props.property.re.details.propertyInfo.address.zip,

  })
  const url = '/send-me-a-lead/steps/0'
  window.open(url, '_blank')
}
  
  const shareProperty = () => {
    // Implement share functionality
    console.log('Share clicked');
  };
  
  const printDetails = () => {
    // Implement print functionality
    window.print();
  };
  
  const contactOwner = () => {
  if (props.property.re.skip_trace && 
      props.property.re.skip_trace.output && 
      props.property.re.skip_trace.output.identity && 
      props.property.re.skip_trace.output.identity.phones && 
      props.property.re.skip_trace.output.identity.phones.length > 0) {
    
    const firstPhone = props.property.re.skip_trace.output.identity.phones[0];
    const phoneNumber = firstPhone.phone;
    
    // Create a tel: URI
    const telUri = `tel:${phoneNumber}`;
    
    // Attempt to initiate the call
    window.location.href = telUri;
    
    console.log(`Initiating call to: ${firstPhone.phoneDisplay} (${firstPhone.phoneType})`);
  } else {
    console.log('No phone numbers available from skip trace data');
  }
};
  </script>