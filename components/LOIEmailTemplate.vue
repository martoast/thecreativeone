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
                <textarea v-model="emailBody" id="email-body" rows="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button @click="copyToClipboard" type="button" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Copy to Clipboard</button>
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
    const address = p.propertyInfo.address.label
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  
    return `${currentDate}
  
  ${sellerName.value}
  [Seller's Address]
  
  Subject: Letter of Intent Regarding ${address}
  
  Dear ${sellerName.value},
  
  ${buyerName.value} ("Buyer") offers to purchase the Property (as hereinafter defined) in accordance with the following terms and conditions, subject to the execution of a definitive and mutually acceptable purchase and sale agreement ("Purchase Agreement") within [time period] after the date this letter ("Letter of Intent") is executed (such interim period, the "Negotiation Period"):
  
  1. Seller. ${sellerName.value}
  
  2. Buyer. ${buyerName.value}. Buyer may assign this Letter of Intent in Buyer's sole discretion.
  
  3. Property. The property ("Property") is located at ${address} and more particularly described in Exhibit A, attached hereto and made a part hereof. Together with the Property, Buyer would also purchase all of Seller's right, title, and interest in and to [insert additional components of purchase], including, to the extent transferable, any land use entitlements, government permits and allocations, and other such government and agency approvals as may exist concerning the property.
  
  4. Purchase Price. ${$formatCurrency(p.estimatedValue)}
  
  5. Additional Terms of Purchase. [Insert any additional summary terms.]
  
  6. Escrow. The escrow agent ("Escrow Agent") shall be [name of title company]. The Purchase Agreement shall be mutually prepared and executed by Buyer and Seller no later than [number of days] business days following the execution of this Letter of Intent.
  
  7. Initial Deposit. Upon full execution of the Purchase Agreement, Buyer shall deposit into the Escrow with the Title Company an amount equal to [Dollar amount] as a [non]refundable deposit toward and applicable to the Purchase Price ("the Initial Deposit").
  
  8. Investigation Period. Buyer shall have until [number of days, which will be set forth in the Purchase Agreement] to perform all feasibility and due diligence investigations regarding the Property. Seller shall reasonably cooperate with Buyer's due diligence and feasibility investigations.
  
  9. Conditions Precedent to Closing. Among other conditions to be specified in the Purchase Agreement, Buyer's obligation to close the transaction shall be subject to the satisfaction of the following conditions: (A) Buyer's receipt of a title insurance policy in the full amount of the Purchase Price showing good and marketable title vested in Buyer, solely subject to such exceptions as Buyer approves, and (B) Buyer's receipt of title to the Property free and clear of liens.
  
  10. Other Provisions. The Purchase Agreement will contain other terms, provisions, and conditions.
  
  11. Non-Solicitation. During the Contract Negotiation Period (i.e., that period of time between the execution of this Letter of Intent and the Purchase Agreement), Seller shall not solicit other offers. If Seller receives a competing offer during the Contract Negotiation Period, Seller shall promptly, and in any case within [NUMBER] business days, notify Buyer of all material terms of such offer.
  
  12. Closing Date. The closing date shall be on or before [enter date], or such date as the Buyer and Seller mutually agree to.
  
  13. Formal Purchase Agreement. Upon acceptance by the Seller of the Letter of Intent, the Buyer will prepare a Purchase Agreement incorporating the terms and conditions of this Letter of Intent, and containing the usual agreements, representations, warranties, indemnifications, and other provisions commonly found in such agreements, which will be presented to the Seller for review. The Seller and Buyer shall act in good faith and use their best efforts to negotiate and enter into the Purchase Agreement based upon this Letter of Intent.
  
  14. Effect of the Letter of Intent. Notwithstanding that this Letter of Intent contains many of the essential points regarding the transactions described herein, this is not intended to be a legally enforceable agreement and no cause of action shall arise in respect of the signing hereof.
  
  15. Offer Expiration. If not executed by Seller, this Letter of Intent shall be automatically terminated as of ${offerExpiration.value}.
  
  Each of Buyer and Seller acknowledge and agree that this Letter of Intent shall be superseded by the Purchase Agreement. Until such time as the Purchase Agreement is executed, each of Buyer and Seller agree to proceed in accordance with the terms, conditions, and provisions outlined in this Letter of Intent. If the Purchase Agreement is not fully executed within the Contract Negotiation Period, this Letter of Intent shall expire, be of no further force and effect, and neither Buyer nor Seller shall have any further rights or duties hereunder. In the event this Letter of Intent is terminated and the Purchase Agreement is not executed, each of Buyer and Seller agree to return promptly to the applicable party all documentation provided pursuant to this Letter of Intent.
  
  Please sign the enclosed copy of this Letter of Intent and return it to us on or before ${offerExpiration.value}, as confirmation of the status of our negotiations. We will then begin drafting the Purchase Agreement.
  
  BUYER:
  ${buyerName.value}
  
  Name: _________________
  Date: _________________
  Contact Information: _________________
  
  Acknowledged and Agreed:
  
  SELLER:
  ${sellerName.value}
  
  Name: _________________
  Date: _________________
  Contact Information: _________________`
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
  </script>