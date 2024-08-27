<!-- SUB2EmailTemplate.vue -->
<template>
  <div class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900">SUB2 Email Template</h3>
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
        <button @click="createEmail" :disabled="!yourName" type="button" class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Create Email</button>
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

const yourName = ref('')

const emailBody = computed(() => {
  const p = props.property.re.details
  const z = props.property.zillow
  const address = p.propertyInfo.address.label
  const owedAmount = p.openMortgageBalance
  const estimatedValue = p.estimatedValue
  const zestimate = z.zestimate
  const commissionRate = 0.06 // 6% commission
  const breakEvenPrice = owedAmount / (1 - commissionRate)
  const netAtFullPrice = estimatedValue - owedAmount - (estimatedValue * commissionRate)
  const squareFeet = p.propertyInfo.livingSquareFeet
  const bedrooms = p.propertyInfo.bedrooms
  const bathrooms = p.propertyInfo.bathrooms
  const yearBuilt = p.propertyInfo.yearBuilt
  const lastSaleDate = new Date(p.lastSaleDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const lastSalePrice = p.lastSalePrice
  const daysOnMarket = z.timeOnZillow ? z.timeOnZillow.split(' ')[0] : 'Unknown'
  const rentZestimate = z.rentZestimate

  // Calculate average comp price and ARV
  const comps = p.comps.slice(0, 5) // Use first 5 comps
  const avgCompPrice = comps.reduce((sum, comp) => sum + parseFloat(comp.lastSaleAmount), 0) / comps.length
  const avgARV = comps.reduce((sum, comp) => sum + parseFloat(comp.estimatedValue), 0) / comps.length

  // Get current mortgage details
  const currentMortgage = p.currentMortgages[0]

  return `Good Evening,

I would like to submit an offer on your listing at ${address}.

Thank you for taking the time to review our offer. We understand that you and your client have had this property listed on the market for ${daysOnMarket} days now with few offers that are worth entertaining.

After reviewing public record, we noticed that your client owes ${$formatCurrency(owedAmount)} on their mortgage. As such, a cash offer below ${$formatCurrency(breakEvenPrice)} nets them $0.00 after 6% commission.

Even with a full price offer of ${$formatCurrency(estimatedValue)}, it seems that your client would only net ${$formatCurrency(netAtFullPrice)} assuming a 6% commission on the sale for both buyer and seller's side commissions.

We'd like to propose a Subject-To transaction where we take over the existing mortgage payments while relieving your client of all payment obligations. Here's a breakdown of the current mortgage situation:

Current Mortgage Details:
- Loan Type: ${currentMortgage.loanType}
- Lender: ${currentMortgage.lenderName}
- Current Balance: ${$formatCurrency(currentMortgage.amount)}
- Maturity Date: ${new Date(currentMortgage.maturityDate).toLocaleDateString()}

Key Property Details:
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}
- Square Footage: ${squareFeet}
- Year Built: ${yearBuilt}
- Last Sale Date: ${lastSaleDate}
- Last Sale Price: ${$formatCurrency(lastSalePrice)}
- Current Zillow Zestimate: ${$formatCurrency(zestimate)}
- Zillow Rent Estimate: ${$formatCurrency(rentZestimate)}/month

Market Analysis:
- Average Recent Comp Sale Price: ${$formatCurrency(avgCompPrice)}
- Average After Repair Value (ARV) of Comps: ${$formatCurrency(avgARV)}

Our Subject-To offer provides several benefits:
1. Immediate relief from mortgage payments
2. No out-of-pocket expenses for closing costs or commissions
3. Quick closing process (typically within 2-3 weeks)
4. Preservation of credit score as we'll ensure timely mortgage payments
5. Potential for profit sharing if we sell the property in the future for more than the current market value

We're prepared to:
- Take over the existing mortgage payments of ${$formatCurrency(currentMortgage.amount)}
- Cover all closing costs and realtor commissions
- Provide a cash consideration of ${$formatCurrency(estimatedValue * 0.03)} (3% of estimated value) at closing

If you feel that this offer could be beneficial to your client, we'd be happy to hop on a call to discuss next steps. We're open to adjusting terms to better meet your client's needs.

Looking forward to your response and the opportunity to create a win-win solution.

Best regards,
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

const createEmail = () => {
  const subject = `Subject-To Offer for ${props.property.re.details.propertyInfo.address.label}`
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody.value)}`
  window.location.href = mailtoLink
}
</script>