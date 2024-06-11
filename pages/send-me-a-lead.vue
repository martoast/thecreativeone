<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto py-12">
      <AlertComponent :show="showAlert" @update:show="showAlert = $event" message="Sent Successfully" />
      <div class="bg-white shadow sm:rounded-lg p-6">
        <form @submit.prevent="submitLead">
          <h2 class="text-lg font-semibold leading-7 text-gray-900 mb-6">Send Me a Lead Form</h2>

          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="address" class="block text-sm font-medium leading-6 text-gray-900 mb-2">Address</label>
              <div v-if="!addressSelected">
                <custom-places-auto-complete @updateAddress="handleUpdateAddress" />
              </div>
              <div v-else class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street Address</label>
                  <input type="text" name="street-address" id="street-address" v-model="lead.street_address" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <div>
                  <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                  <input type="text" name="city" id="city" v-model="lead.city" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <div>
                  <label for="state" class="block text-sm font-medium leading-6 text-gray-900">State</label>
                  <input type="text" name="state" id="state" v-model="lead.state" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <div class="sm:col-span-2">
                  <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">Postal Code</label>
                  <input type="text" name="postal-code" id="postal-code" v-model="lead.postal_code" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <button @click="resetAddress" type="button" class="text-sm font-semibold leading-6 text-indigo-600 sm:col-span-2">Change Address</button>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <input type="text" name="name" id="name" v-model="lead.full_name" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>

            <div class="sm:col-span-2">
              <label for="business-name" class="block text-sm font-medium leading-6 text-gray-900">Business Name</label>
              <input type="text" name="business-name" id="business-name" v-model="lead.business_name" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>

            <div class="sm:col-span-1">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <input id="email" name="email" type="email" v-model="lead.email" @input="validateEmail" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <span v-if="emailError" class="text-sm text-red-600">{{ emailError }}</span>
            </div>

            <div class="sm:col-span-1">
              <label for="phone-number" class="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
              <input type="text" name="phone-number" id="phone-number" v-model="lead.phone_number" @input="validatePhoneNumber" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <span v-if="phoneError" class="text-sm text-red-600">{{ phoneError }}</span>
            </div>

            <div class="sm:col-span-2">
              <label for="notes" class="block text-sm font-medium leading-6 text-gray-900">Notes</label>
              <div class="mt-2">
                <textarea id="notes" name="notes" rows="3" v-model="lead.notes" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900" @click="resetForm">Cancel</button>
            <button type="submit" :disabled="isSubmitting || !isFormValid" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'main'
})

const defaultLead = {
  first_name: null,
  last_name: null,
  full_name: null,
  street_address: null,
  full_address: null,
  postal_code: null,
  city: null,
  state: null,
  phone_number: null,
  email: null,
  business_name: null,
  opportunity_value: '1123',
  opportunity_source: 'Example source',
  tags: 'one,two,three,four',
  source: 'Send Me a Lead',
  notes: null
}

const lead = ref({ ...defaultLead })
const showAlert = ref(false)
const isSubmitting = ref(false)
const addressSelected = ref(false)

const emailError = computed(() => {
  if (!lead.value.email) return 'Email is required'
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(lead.value.email) ? null : 'Invalid email address'
})

const phoneError = computed(() => {
  if (!lead.value.phone_number) return 'Phone number is required'
  const phonePattern = /^\d{10}$/
  return phonePattern.test(lead.value.phone_number) ? null : 'Phone number must be 10 digits'
})

const isFormValid = computed(() => {
  return lead.value.full_name && lead.value.street_address && lead.value.city && lead.value.state && lead.value.postal_code && !emailError.value && !phoneError.value
})

const handleUpdateAddress = (data) => {
  lead.value.full_address = data.address
  const [street_address, city, state_zip] = data.address.split(', ')
  lead.value.street_address = street_address
  lead.value.city = city
  const [state, postal_code] = state_zip.split(' ')
  lead.value.state = state
  lead.value.postal_code = postal_code
  addressSelected.value = true
}

const resetAddress = () => {
  addressSelected.value = false
  lead.value.street_address = null
  lead.value.city = null
  lead.value.state = null
  lead.value.postal_code = null
  lead.value.full_address = null
}

const resetForm = () => {
  lead.value = { ...defaultLead }
  addressSelected.value = false
}

const submitLead = async () => {
  if (!isFormValid.value) {
    return
  }

  isSubmitting.value = true

  const backendUrl = '/.netlify/functions/forwardWebhook'
  const headers = {
    'Content-Type': 'application/json'
  }

  // Split the name to extract first name and last name
  const [first_name, last_name] = lead.value.full_name.split(' ', 2)
  lead.value.first_name = first_name
  lead.value.last_name = last_name

  const payload = {
    lead: lead.value
  }

  const { data, error } = await $fetch(backendUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  })

  if (error.value) {
    console.error('Error adding lead via serverless function:', error.value)
    // Handle error (e.g., show an error message)
  } else {
    console.log('Lead added successfully via serverless function:', data.value)
    showAlert.value = true
    resetForm()
  }

  isSubmitting.value = false
}
</script>
