<template>
  <div class="container mx-auto max-w-2xl">
    <nav class="flex items-center justify-center mb-8" aria-label="Progress">
      <p class="text-sm font-medium">Step {{ currentStep }} of {{ totalSteps }}</p>
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

    <form @submit.prevent="submitStep" class="mt-8">
      <div v-if="currentStep === 1">
        <!-- Step 1: Basic Information -->
        <div class="space-y-4">
          <div>
            <label for="contact-type" class="block text-sm font-medium text-gray-700">Type of Contact</label>
            <select id="contact-type" v-model="form.contactType" @change="updateFormFields" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
              <option value="default">Select</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="agent">Agent</option>
              <option value="relativeOfOwner">Relative of Owner</option>
              <option value="potentialBuyer">Potential Buyer</option>
              <option value="verifiedOwner">Verified Owner</option>
            </select>
            <p v-if="validationErrors.contactType" class="mt-2 text-sm text-red-600">{{ validationErrors.contactType }}</p>
          </div>

          <div>
            <label for="lead-type" class="block text-sm font-medium text-gray-700">What type of lead is this?</label>
            <select id="lead-type" v-model="form.leadType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
              <option value="">Select</option>
              <option value="directToSellerOffMarket">Direct to Seller (off-market)</option>
              <option value="directToSellerOnMarket">Direct to Seller (on-market)</option>
              <option value="fsbo">FSBO</option>
              <option value="freeAndClear">Free & Clear</option>
              <option value="directToAgentOnMarket">Direct to Agent (on market)</option>
              <option value="jvDeal">JV deal</option>
            </select>
            <p v-if="validationErrors.leadType" class="mt-2 text-sm text-red-600">{{ validationErrors.leadType }}</p>
          </div>

          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="first-name" v-model="form.firstName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <p v-if="validationErrors.firstName" class="mt-2 text-sm text-red-600">{{ validationErrors.firstName }}</p>
          </div>
          <div>
            <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="last-name" v-model="form.lastName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" v-model="form.email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" id="phone" v-model="form.phone" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
        </div>
      </div>

      <div v-else-if="currentStep === 2">
        <!-- Step 2: Address Information -->
        <div class="space-y-4">
          <div v-if="!addressSelected">
            <label class="block text-sm font-medium text-gray-700 mb-3">Lead property address</label>
            <custom-places-auto-complete @updateAddress="handleUpdateAddress" />
          </div>
          <div v-else class="space-y-4">
            <div>
              <label for="street-address" class="block text-sm font-medium text-gray-700">Street Address *</label>
              <input 
                type="text" 
                id="street-address" 
                v-model="form.streetAddress" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
              <p v-if="validationErrors.streetAddress" class="mt-2 text-sm text-red-600">{{ validationErrors.streetAddress }}</p>
            </div>
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">City *</label>
              <input 
                type="text" 
                id="city" 
                v-model="form.city" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
              <p v-if="validationErrors.city" class="mt-2 text-sm text-red-600">{{ validationErrors.city }}</p>
            </div>
            <div>
              <label for="state" class="block text-sm font-medium text-gray-700">State *</label>
              <input 
                type="text" 
                id="state" 
                v-model="form.state" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
              <p v-if="validationErrors.state" class="mt-2 text-sm text-red-600">{{ validationErrors.state }}</p>
            </div>
            <div>
              <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal Code *</label>
              <input 
                type="text" 
                id="postal-code" 
                v-model="form.postalCode" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
              <p v-if="validationErrors.postalCode" class="mt-2 text-sm text-red-600">{{ validationErrors.postalCode }}</p>
            </div>
            <button @click="resetAddress" type="button" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Change Address</button>
          </div>
        </div>
      </div>

      <div v-else-if="currentStep === 3">
        <!-- Step 3: Contact Type Specific Information -->
        <div class="space-y-4">
          <!-- Wholesaler Specific Fields -->
          <template v-if="form.contactType === 'wholesaler'">
            <div>
              <label for="contract-holder" class="block text-sm font-medium text-gray-700">Are you the Contract Holder? Or connected to the Contract Holder?</label>
              <input type="text" id="contract-holder" v-model="form.contractHolder" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div>
              <label for="deal-type" class="block text-sm font-medium text-gray-700">What kind of deal is this?</label>
              <input type="text" id="deal-type" v-model="form.dealType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div>
              <label for="qualified-lead" class="block text-sm font-medium text-gray-700">Have you Qualified this lead and have had a Conversation Before Passing to our Team to Close?</label>
              <input type="text" id="qualified-lead" v-model="form.qualifiedLead" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </template>

          <!-- Verified Owner Specific Fields -->
          <template v-if="form.contactType === 'verifiedOwner'">
            <div>
              <label for="why-sell" class="block text-sm font-medium text-gray-700">Why are you interested in selling to us?</label>
              <input type="text" id="why-sell" v-model="form.whySell" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div>
              <label for="asking-price" class="block text-sm font-medium text-gray-700">Asking Price</label>
              <input type="text" id="asking-price" v-model="form.askingPrice" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div>
              <label for="sell-time" class="block text-sm font-medium text-gray-700">How soon are you looking to sell?</label>
              <input type="text" id="sell-time" v-model="form.sellTime" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <!-- Add more verified owner fields here -->
          </template>

          <!-- Add more contact type specific fields here -->
        </div>
      </div>

      <div v-else-if="currentStep === 4">
        <!-- Step 4: Mortgage Information -->
        <div class="space-y-4">
          <div>
            <label for="has-mortgage" class="block text-sm font-medium text-gray-700">Is there mortgage in place?</label>
            <select id="has-mortgage" v-model="form.hasMortgage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <template v-if="form.hasMortgage === 'yes'">
            <div>
              <label for="mortgage-balance" class="block text-sm font-medium text-gray-700">Mortgage Balance</label>
              <input type="number" id="mortgage-balance" v-model="form.mortgageBalance" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div>
              <label for="loan-type" class="block text-sm font-medium text-gray-700">Type of Loan</label>
              <input type="text" id="loan-type" v-model="form.loanType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div>
              <label for="interest-rate" class="block text-sm font-medium text-gray-700">Interest Rate</label>
              <input type="number" id="interest-rate" v-model="form.interestRate" step="0.01" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div>
              <label for="piti" class="block text-sm font-medium text-gray-700">PITI</label>
              <input type="number" id="piti" v-model="form.piti" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div>
              <label for="maturity-date" class="block text-sm font-medium text-gray-700">Maturity Date</label>
              <input type="date" id="maturity-date" v-model="form.maturityDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </template>
        </div>
      </div>

      <div v-else-if="currentStep === 5">
        <!-- Step 5: Additional Information -->
        <div class="space-y-4">
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
            <textarea id="notes" v-model="form.notes" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-between">
        <button v-if="currentStep > 1" @click="prevStep" type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Previous
        </button>
        <button 
          v-else 
          type="button" 
          disabled 
          class="rounded-md border border-gray-200 bg-gray-100 py-2 px-4 text-sm font-medium text-gray-400 cursor-not-allowed opacity-50"
        >
          Previous
        </button>
        <button v-if="currentStep < totalSteps" @click="validateAndProceed" type="button" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Next
        </button>
        <button v-if="currentStep === totalSteps" type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import debounce from 'lodash.debounce'

const route = useRoute();

const props = defineProps({
  currentStep: Number,
  initialFormData: Object
});

const emit = defineEmits(['update:current-step', 'update:form-data', 'submit-lead']);

const form = ref({ ...props.initialFormData });

const validationErrors = ref({});

const requiredFields = {
  1: ['contactType', 'leadType', 'firstName', 'lastName', 'email', 'phone'],
  2: ['streetAddress', 'city', 'state', 'postalCode'],
  3: {
    wholesaler: ['contractHolder', 'dealType', 'qualifiedLead'],
    verifiedOwner: ['whySell', 'askingPrice', 'sellTime'],
    // ... add required fields for other contact types
  },
  4: ['hasMortgage'],
  5: [] // No required fields for additional information
};

// Watch for changes in initialFormData and update form accordingly
watch(() => props.initialFormData, (newFormData) => {
  form.value = { ...form.value, ...newFormData };
}, { deep: true });

const debouncedEmitFormData = debounce((newFormData) => {
  emit('update:form-data', newFormData);
}, 300);

watch(form, (newFormData) => {
  debouncedEmitFormData(newFormData);
}, { deep: true });

const totalSteps = 5;

const steps = computed(() => [
  { id: '1', name: 'Contact Info', href: '/send-me-a-lead/steps/1', status: props.currentStep >= 1 ? 'complete' : 'upcoming' },
  { id: '2', name: 'Property', href: '/send-me-a-lead/steps/2', status: props.currentStep >= 2 ? 'complete' : 'upcoming' },
  { id: '3', name: 'Specific Info', href: '/send-me-a-lead/steps/3', status: props.currentStep >= 3 ? 'complete' : 'upcoming' },
  { id: '4', name: 'Mortgage', href: '/send-me-a-lead/steps/4', status: props.currentStep >= 4 ? 'complete' : 'upcoming' },
  { id: '5', name: 'Additional Info', href: '/send-me-a-lead/steps/5', status: props.currentStep === 5 ? 'complete' : 'upcoming' },
]);

const addressSelected = ref(false);

// Modify the updateFormFields function
const updateFormFields = () => {
  const preservedFields = {
    contactType: form.value.contactType,
    leadType: form.value.leadType,
    streetAddress: form.value.streetAddress,
    city: form.value.city,
    state: form.value.state,
    postalCode: form.value.postalCode,
    fullAddress: form.value.fullAddress
  };

  // Clear all specific fields except the preserved fields when contact type changes
  Object.keys(form.value).forEach(key => {
    if (!Object.keys(preservedFields).includes(key)) {
      form.value[key] = '';
    }
  });

  // Restore the preserved fields
  Object.assign(form.value, preservedFields);
};

const handleUpdateAddress = (data) => {
  form.value.fullAddress = data.address;
  const [streetAddress, city, stateZip] = data.address.split(', ');
  form.value.streetAddress = streetAddress;
  form.value.city = city;
  const [state, postalCode] = stateZip.split(' ');
  form.value.state = state;
  form.value.postalCode = postalCode;
  addressSelected.value = true;
};

const resetAddress = () => {
  addressSelected.value = false;
  form.value.streetAddress = null;
  form.value.city = null;
  form.value.state = null;
  form.value.postalCode = null;
  form.value.fullAddress = null;
};

const validateStep = (step) => {
  const errors = {};
  let stepFields = requiredFields[step];
  
  if (step === 3) {
    stepFields = requiredFields[3][form.value.contactType] || [];
  }

  stepFields.forEach(field => {
    if (!form.value[field] || form.value[field].trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()} is required`;
    }
  });

  validationErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const validateAndProceed = () => {
  if (validateStep(props.currentStep)) {
    nextStep();
  } else {
    // Display a general error message
    alert('Please fill in all required fields before proceeding.');
  }
};

const findFirstIncompleteStep = () => {
  for (let step = 1; step <= totalSteps; step++) {
    if (!validateStep(step)) {
      return step;
    }
  }
  return null;
};

const nextStep = () => {
  const nextIncompleteStep = findFirstIncompleteStep();
  if (nextIncompleteStep) {
    emit('update:current-step', nextIncompleteStep);
  } else if (props.currentStep < totalSteps) {
    emit('update:current-step', props.currentStep + 1);
  }
};


const prevStep = () => {
  if (props.currentStep > 1) {
    emit('update:current-step', props.currentStep - 1);
  }
};

const submitStep = async () => {
  if (props.currentStep < totalSteps) {
    validateAndProceed();
  } else {
    if (validateStep(props.currentStep)) {
      emit('submit-lead', form.value);
    } else {
      alert('Please fill in all required fields before submitting.');
    }
  }
};

onMounted(() => {
  const { fullAddress, streetAddress, city, state, postalCode } = route.query;
  
  if (fullAddress && streetAddress && city && state && postalCode) {
    form.value = {
      ...form.value,
      fullAddress,
      streetAddress,
      city,
      state,
      postalCode
    };
    addressSelected.value = true;
  } else if (form.value.fullAddress) {
    handleUpdateAddress({ address: form.value.fullAddress });
  }
});
</script>

