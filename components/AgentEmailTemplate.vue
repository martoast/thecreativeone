<!-- AgentEmailTemplate.vue -->
<template>
    <div class="space-y-6">
      <h3 class="text-xl font-semibold text-gray-900">Agent Email Template</h3>
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
                  <input type="text" v-model="yourPhone" id="your-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label for="down-payment" class="block text-sm font-medium leading-6 text-gray-900">Down Payment</label>
                <div class="mt-2">
                  <input type="text" v-model="downPayment" id="down-payment" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label for="balloon-years" class="block text-sm font-medium leading-6 text-gray-900">Balloon (years)</label>
                <div class="mt-2">
                  <input type="text" v-model="balloonYears" id="balloon-years" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
  
  const agentData = computed(() => props.property.zillow.contact_recipients[0] || {})
  
  const agentName = computed(() => agentData.value.display_name || 'Agent')
  const agentBadgeType = computed(() => agentData.value.badge_type || '')
  const agentRating = computed(() => agentData.value.rating_average || 'N/A')
  const agentReviewCount = computed(() => agentData.value.review_count || 0)
  const agentPhone = computed(() => {
    const phone = agentData.value.phone
    return phone ? `(${phone.areacode}) ${phone.prefix}-${phone.number}` : 'N/A'
  })
  const agentImageUrl = computed(() => agentData.value.image_url || 'https://via.placeholder.com/150')
  
  const yourName = ref('')
  const yourPhone = ref('')
  const downPayment = ref('')
  const balloonYears = ref('')
  
  const emailBody = computed(() => {
    const p = props.property.re.details
    const address = p.propertyInfo.address.label
  
    const downPaymentSection = downPayment.value ? `- Down Payment: ${$formatCurrency(Number(downPayment.value))}` : ''
    const balloonSection = balloonYears.value ? `- Balloon in ${balloonYears.value} years (we get our own financing at that point)` : ''
  
    return `Hello ${agentName.value},
  
  Thanks again for chatting with me yesterday in regard to the property at ${address}. It's refreshing to speak to a ${agentBadgeType.value} that is open to creative options to help their sellers sell their home. I would hate to see a seller have to come out of pocket to sell their home.
  
  Terms:
  - Purchase Price: ${$formatCurrency(p.estimatedValue)}
  - Purchased subject to the existing loan
  ${downPaymentSection}
  ${balloonSection}
  - Agent Commission: 2.5% commission paid by buyer
  - Closing Costs paid by the buyer
  - Closing date is flexible, but we typically close in 30 days or less.
  - Servicing Company: [Servicing Company Name] [Servicing Company Email]
  - Title Company/Escrow Officer: [Title and Escrow Company; Escrow Officer Name] Use the Quick Reference Guide as needed Subto Quick-Reference Guide and Creative Friendly Title Companies By-State 09-2022
  
  Below are some common questions and concerns that sellers and agents typically bring up. I can discuss these further on a phone call/zoom
  
  1) Is subject to legal? Fill-able HUD-1 This is a standard form that title/escrow companies and attorneys use to build settling statements. Please note lines 203 and 503.  CFR-2012-title24-vol5-part3500-appA.pdf (govinfo.gov) This link is the instructions to fill out the HUD1. Note this is a Code of Federal Regulation (CFR) document. Page 396, second paragraph states: "Line 203 is used for cases in which the Borrower is assuming or taking title subject to an existing loan or lien on the property." Would the federal government put this in the Code of Federal Regulation if it was illegal? 
   
  2) Due on Sale Clause: This rarely happens, but if the bank sees the deed has been transferred, they could request the remaining loan balance be paid in one lump sum because they believe the property has been sold (hence the name due on sale). 
  Our solution:
  Purchase the property in a land trust. "A lender may not exercise its option pursuant to a due-on-sale clause upon a transfer into an inter vivos trust in which the borrower is and remains a beneficiary" (The Garn St. Germain Depository Institutions Act of 1982, (U.S.C.) 1701j-3(d)). We would create a land trust and note the seller as one of the beneficiaries. Our LLC would be the other beneficiary. (remove if not applicable)
  OTHER VERBIAGE I'VE USED: 
  2a) We have spoken to lenders before to describe the situation and they have rescinded their request because they ultimately care about their notes performing.
  2b) Land Sale Contract - Deed stays in Sellers name but the buyer has ownership rights to the property
  2c) Deed the property back into the seller's name and create a lease option where the purchase price is the remaining loan balance and the monthly payment mirrors the current payment.
  
  3) Default by the buyer: We would use a Deed in Lieu pre-signed and held at the servicing company. The house is effectively transferred back in the sellers name if I default over a 30 day period. At that time, the sellers keep my down payment and they can re-list the property and make profit again. An additional benefit is all improvements we make to the property are inherited. If I was ever hit by a bus or abducted by aliens, this is how it would play out. I can refer you and the sellers to owners we have worked with in the past year for testimonials. This includes *insert third party story* bonus if real! 
  
  4) How will this affect my DTI: We can speak on the phone about this more in depth. We can use a payment statement from the servicing company to show a lender that the loan is being serviced by someone else. After 12 months, 100% of the mortgage is removed from their DTI. 
  
  5) What if the market drops? We are not buying the Sellers property based on the value of the real estate, we are buying the property based on the Seller leaving the financing in place. With interest rates skyrocketing into the 7%+, a 3% interest rate is more valuable than any market shift. 
  
  6) How are utilities and insurance handled? We will have our insurance agent replace your current policy with our policy with the sellers added as an additional insured. So not only are we on the insurance policy but you will be on the insurance as well. We would swap the utilities into our name.
  
  I am completely willing to jump on a conference call or zoom to discuss this further with you and the seller. Feel free to reach out to me at ${yourPhone}.
  
  All the best,
  ${yourName.value}`
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