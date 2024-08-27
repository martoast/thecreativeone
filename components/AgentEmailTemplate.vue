<!-- AgentEmailTemplate.vue -->
<template>
  <div class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900">Agent First Contact Email Template</h3>
    <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <div class="px-4 py-6 sm:p-8">
        <div class="max-w-2xl space-y-6">
          <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <div>
              <label for="your-name" class="block text-sm font-medium leading-6 text-gray-900">Your Name</label>
              <div class="mt-2">
                <input type="text" v-model="yourName" id="your-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label for="your-phone" class="block text-sm font-medium leading-6 text-gray-900">Your Phone</label>
              <div class="mt-2">
                <input type="text" v-model="yourPhone" id="your-phone" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label for="your-email" class="block text-sm font-medium leading-6 text-gray-900">Your Email</label>
              <div class="mt-2">
                <input type="email" v-model="yourEmail" id="your-email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
          <div>
            <label for="email-body" class="block text-sm font-medium leading-6 text-gray-900">Email Body</label>
            <div class="mt-2">
              <textarea v-model="emailBody" id="email-body" rows="30" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button @click="copyToClipboard" type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Copy to Clipboard</button>
        <button @click="createEmail" :disabled="!yourName || !yourPhone || !yourEmail" type="button" class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Create Email</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

const { $formatCurrency } = useNuxtApp()

const agentData = computed(() => props.property.zillow.contact_recipients[0] || {})

const agentName = computed(() => agentData.value.display_name || 'Agent')
const agentBadgeType = computed(() => agentData.value.badge_type || '')

const yourName = ref('')
const yourPhone = ref('')
const yourEmail = ref('')

const emailBody = computed(() => {
  const p = props.property.re.details
  const z = props.property.zillow
  const address = p.propertyInfo.address.label
  const currentMortgage = p.currentMortgages[0]

  // Calculate average ARV of comps
  const comps = p.comps.slice(0, 5) // Use first 5 comps
  const avgARV = comps.reduce((sum, comp) => sum + parseFloat(comp.estimatedValue), 0) / comps.length

  // Calculate our offer at 80% of ARV
  const ourOffer = avgARV * 0.8

  return `Hi ${agentName.value},

I hope this email finds you well. My name is ${yourName.value}, and I'm reaching out regarding your listing at ${address}. I've done some research on this property, and I believe it presents an interesting opportunity for a cash offer.

Here are some key details about the property:

Property Details:
- Year Built: ${z.yearBuilt}
- Bedrooms: ${z.bedrooms}
- Bathrooms: ${z.bathrooms}
- Square Feet: ${z.livingArea}
- Lot Size: ${p.lotInfo.lotAcres} acres

Based on my analysis of recent comparable sales in the area, I'd like to present a cash offer for your consideration:

Cash Offer: ${$formatCurrency(ourOffer)}

This offer is based on 80% of the average After Repair Value (ARV) of comparable properties in the area, which we've calculated to be ${$formatCurrency(avgARV)}. Our offer provides several advantages:

1. Quick Closing: We can close in as little as 7 days, or on the seller's timeline.
2. Cash Offer: No financing contingencies or appraisal required.
3. As-Is Purchase: We buy the property in its current condition, no repairs needed.
4. No Fees: We cover all closing costs.
5. Certainty: Once we agree on terms, the seller can count on a guaranteed sale.

I understand that every property and seller's situation is unique. If the seller is looking for a quick, hassle-free sale, our offer could be an excellent solution. However, if the goal is to maximize the sale price and the seller has the time and resources for a traditional sale, that might be a better path.

I'd be happy to discuss this offer in more detail and answer any questions you or the seller might have. Could we schedule a call at your convenience? I can be reached at ${yourPhone.value} or ${yourEmail.value}.

Thank you for your time and consideration. I look forward to the possibility of working together on this property.

Best regards,
${yourName.value}

P.S. If you have any other properties that might be a good fit for a cash offer, please don't hesitate to reach out. We're always looking for new opportunities.`
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(emailBody.value)
    alert('Email content copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy text: ', err)
    alert('Failed to copy to clipboard. Please try again.')
  }
}

const createEmail = () => {
  const subject = `Cash Offer for ${props.property.re.details.propertyInfo.address.label}`
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody.value)}`
  window.location.href = mailtoLink
}
</script>