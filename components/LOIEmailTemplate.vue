<!-- LOIEmailTemplate.vue -->
<template>
  <div class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900">LOI Email Template</h3>
    <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <div class="px-4 py-6 sm:p-8">
        <div class="max-w-2xl space-y-6">
          <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <div>
              <label for="buyer-name" class="block text-sm font-medium leading-6 text-gray-900">Buyer Name</label>
              <div class="mt-2">
                <input type="text" v-model="buyerName" id="buyer-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label for="seller-name" class="block text-sm font-medium leading-6 text-gray-900">Seller Name</label>
              <div class="mt-2">
                <input type="text" v-model="sellerName" id="seller-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label for="offer-expiration" class="block text-sm font-medium leading-6 text-gray-900">Offer Expiration Date</label>
              <div class="mt-2">
                <input type="date" v-model="offerExpiration" id="offer-expiration" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
        <button @click="createEmail" :disabled="!sellerName || !buyerName" type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Email</button>
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

const buyerName = ref('')
const sellerName = ref('')
const offerExpiration = ref('')

const emailBody = computed(() => {
  const p = props.property.re.details
  const z = props.property.zillow
  const address = p.propertyInfo.address.label
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  // Calculate average ARV of comps
  const comps = p.comps.slice(0, 5) // Use first 5 comps
  const avgARV = comps.reduce((sum, comp) => sum + parseFloat(comp.estimatedValue), 0) / comps.length

  // Calculate our offer at 80% of ARV
  const ourOffer = avgARV * 0.8

  return `${currentDate}

${sellerName.value}
[Seller's Address]

Subject: Letter of Intent to Purchase Property at ${address}

Dear ${sellerName.value},

${buyerName.value} ("Buyer") hereby submits this Letter of Intent to purchase the property located at ${address} (the "Property") under the following terms and conditions:

1. Seller: ${sellerName.value}

2. Buyer: ${buyerName.value}. Buyer may assign this Letter of Intent at Buyer's sole discretion.

3. Property: The property located at ${address}, including all improvements thereon and appurtenances thereto.

4. Purchase Price: ${$formatCurrency(ourOffer)} (80% of the average After Repair Value of comparable properties)

5. Purchase Structure: All-cash offer

6. Deposit: Upon execution of a mutually agreeable Purchase Agreement, Buyer will deposit $10,000 into escrow as an earnest money deposit.

7. Due Diligence Period: Buyer shall have 14 days from the execution of the Purchase Agreement to conduct all necessary inspections and due diligence.

8. Closing: The closing shall occur within 21 days after the expiration of the Due Diligence Period.

9. Contingencies: This offer is contingent upon:
   a. Satisfactory review of all property documents
   b. Physical inspection of the Property
   c. Approval of Buyer's board of directors (if applicable)

10. Broker Commissions: Seller to pay listing broker 2.5%. Buyer is not represented by a broker.

11. Closing Costs: Buyer to pay all closing costs associated with the purchase.

12. Property Condition: The property is to be purchased in "as-is" condition.

13. Confidentiality: The terms of this Letter of Intent shall remain confidential between Buyer and Seller.

14. Non-Binding: This Letter of Intent is not a binding agreement and is subject to the negotiation and execution of a mutually acceptable Purchase Agreement.

15. Expiration: This Letter of Intent shall automatically expire if not accepted by Seller and returned to Buyer by ${offerExpiration.value}.

Key Benefits of Our Offer:
- Quick closing process (potential to close within 30 days)
- All-cash offer with no financing contingencies
- Purchase of the property in its current condition, with no repairs required
- Certainty of closing due to our financial capability

If the terms outlined in this Letter of Intent are acceptable, please sign below to indicate your agreement to proceed with negotiations toward a definitive Purchase Agreement. Upon receipt of the signed Letter of Intent, we will prepare a draft Purchase Agreement for your review.

Sincerely,

${buyerName.value}
[Buyer's Contact Information]

ACCEPTED AND AGREED:

__________________________________
${sellerName.value} (Seller)
Date: ___________________________

Please return the signed Letter of Intent to [Buyer's Email or Address].`
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(emailBody.value)
    alert('LOI content copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy text: ', err)
    alert('Failed to copy to clipboard. Please try again.')
  }
}

const createEmail = () => {
  const subject = `Letter of Intent for ${props.property.re.details.propertyInfo.address.label}`
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody.value)}`
  window.location.href = mailtoLink
}
</script>