<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact me</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Whether you're selling a property, looking for the next investment opportunity, or need funding for your real estate projects, we've got you covered.</p>
    </div>
    <form @submit.prevent="submitLead" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="contact-type" class="block text-sm font-semibold leading-6 text-gray-900">Type of Contact</label>
          <div class="mt-2.5">
            <select id="contact-type" v-model="contactType" @change="updateFormFields" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="default">Select</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="agent">Agent</option>
              <option value="lender">Lender</option>
              <option value="relativeOfOwner">Relative of Owner</option>
              <option value="potentialBuyer">Potential Buyer</option>
              <option value="verifiedOwner">Verified Owner</option>
            </select>
          </div>
        </div>
        
        <!-- Default Fields -->
        <div>
          <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">First name</label>
          <div class="mt-2.5">
            <input type="text" id="first-name" v-model="form.firstName" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
          <div class="mt-2.5">
            <input type="text" id="last-name" v-model="form.lastName" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
          <div class="mt-2.5">
            <input type="email" id="email" v-model="form.email" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">Phone</label>
          <div class="mt-2.5">
            <input type="tel" id="phone" v-model="form.phone" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- Wholesaler Specific Fields -->
        <div v-if="contactType === 'wholesaler'" class="sm:col-span-2">
          <label for="contract-holder" class="block text-sm font-semibold leading-6 text-gray-900">Are you the Contract Holder? Or connected to the Contract Holder?</label>
          <div class="mt-2.5">
            <input type="text" id="contract-holder" v-model="form.contractHolder" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'wholesaler'" class="sm:col-span-2">
          <label for="deal-type" class="block text-sm font-semibold leading-6 text-gray-900">What kind of deal is this?</label>
          <div class="mt-2.5">
            <input type="text" id="deal-type" v-model="form.dealType" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'wholesaler'" class="sm:col-span-2">
          <label for="qualified-lead" class="block text-sm font-semibold leading-6 text-gray-900">Have you Qualified this lead and have had a Conversation Before Passing to our Team to Close?</label>
          <div class="mt-2.5">
            <input type="text" id="qualified-lead" v-model="form.qualifiedLead" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- Relative of Owner Specific Fields -->
        <div v-if="contactType === 'relativeOfOwner'" class="sm:col-span-2">
          <label for="why-sell" class="block text-sm font-semibold leading-6 text-gray-900">Why are you interested in selling to us?</label>
          <div class="mt-2.5">
            <input type="text" id="why-sell" v-model="form.whySell" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'relativeOfOwner'" class="sm:col-span-2">
          <label for="asking-price" class="block text-sm font-semibold leading-6 text-gray-900">Asking Price</label>
          <div class="mt-2.5">
            <input type="text" id="asking-price" v-model="form.askingPrice" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'relativeOfOwner'" class="sm:col-span-2">
          <label for="sell-time" class="block text-sm font-semibold leading-6 text-gray-900">How soon are you looking to sell?</label>
          <div class="mt-2.5">
            <input type="text" id="sell-time" v-model="form.sellTime" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        

        <!-- Verified Owner Specific Fields -->
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="why-sell" class="block text-sm font-semibold leading-6 text-gray-900">Why are you interested in selling to us?</label>
          <div class="mt-2.5">
            <input type="text" id="why-sell" v-model="form.whySell" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="asking-price" class="block text-sm font-semibold leading-6 text-gray-900">Asking Price</label>
          <div class="mt-2.5">
            <input type="text" id="asking-price" v-model="form.askingPrice" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="sell-time" class="block text-sm font-semibold leading-6 text-gray-900">How soon are you looking to sell?</label>
          <div class="mt-2.5">
            <input type="text" id="sell-time" v-model="form.sellTime" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="property-condition" class="block text-sm font-semibold leading-6 text-gray-900">What Condition is the Property in?</label>
          <div class="mt-2.5">
            <input type="text" id="property-condition" v-model="form.propertyCondition" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="repairs-updates-needed" class="block text-sm font-semibold leading-6 text-gray-900">Repairs/ Updates Needed</label>
          <div class="mt-2.5">
            <input type="text" id="repairs-updates-needed" v-model="form.repairsUpdatesNeeded" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="roof-replacement" class="block text-sm font-semibold leading-6 text-gray-900">When is the last time the Roof was replaced?</label>
          <div class="mt-2.5">
            <input type="text" id="roof-replacement" v-model="form.roofReplacement" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="kitchen-update" class="block text-sm font-semibold leading-6 text-gray-900">When is the last time the Kitchen has been updated?</label>
          <div class="mt-2.5">
            <input type="text" id="kitchen-update" v-model="form.kitchenUpdate" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="bathroom-update" class="block text-sm font-semibold leading-6 text-gray-900">When is the last time the Bathroom(s) have been updated/ Remodeled?</label>
          <div class="mt-2.5">
            <input type="text" id="bathroom-update" v-model="form.bathroomUpdate" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="foundation-condition" class="block text-sm font-semibold leading-6 text-gray-900">What Condition is the foundation in?</label>
          <div class="mt-2.5">
            <input type="text" id="foundation-condition" v-model="form.foundationCondition" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="plumbing-issues" class="block text-sm font-semibold leading-6 text-gray-900">Are There Any Issues With The Plumbing?</label>
          <div class="mt-2.5">
            <input type="text" id="plumbing-issues" v-model="form.plumbingIssues" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="plumbing-explain" class="block text-sm font-semibold leading-6 text-gray-900">If Plumbing problems, please explain</label>
          <div class="mt-2.5">
            <input type="text" id="plumbing-explain" v-model="form.plumbingExplain" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="electricity-issues" class="block text-sm font-semibold leading-6 text-gray-900">Are there issues with the Electricity, or any inactive Outlets?</label>
          <div class="mt-2.5">
            <input type="text" id="electricity-issues" v-model="form.electricityIssues" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="electricity-explain" class="block text-sm font-semibold leading-6 text-gray-900">If electrical problems, Please explain</label>
          <div class="mt-2.5">
            <input type="text" id="electricity-explain" v-model="form.electricityExplain" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="hvac-issues" class="block text-sm font-semibold leading-6 text-gray-900">Are there any Issues with HVAC?</label>
          <div class="mt-2.5">
            <input type="text" id="hvac-issues" v-model="form.hvacIssues" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="hvac-explain" class="block text-sm font-semibold leading-6 text-gray-900">If HVAC Problems, Please Explain</label>
          <div class="mt-2.5">
            <input type="text" id="hvac-explain" v-model="form.hvacExplain" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="furnace-issues" class="block text-sm font-semibold leading-6 text-gray-900">Are there any Issues with the Furnace?</label>
          <div class="mt-2.5">
            <input type="text" id="furnace-issues" v-model="form.furnaceIssues" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="furnace-explain" class="block text-sm font-semibold leading-6 text-gray-900">If Furnace Issues, Please Explain</label>
          <div class="mt-2.5">
            <input type="text" id="furnace-explain" v-model="form.furnaceExplain" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="sewer-line-issues" class="block text-sm font-semibold leading-6 text-gray-900">Are there any issues with the Sewer Line?</label>
          <div class="mt-2.5">
            <input type="text" id="sewer-line-issues" v-model="form.sewerLineIssues" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="sewer-line-explain" class="block text-sm font-semibold leading-6 text-gray-900">If Issues with the sewer Line, Please Explain</label>
          <div class="mt-2.5">
            <input type="text" id="sewer-line-explain" v-model="form.sewerLineExplain" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="ac-issues" class="block text-sm font-semibold leading-6 text-gray-900">Are there any Issues with the A/C Unit?</label>
          <div class="mt-2.5">
            <input type="text" id="ac-issues" v-model="form.acIssues" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="ac-explain" class="block text-sm font-semibold leading-6 text-gray-900">If Issues with the A/C Unit, Please Explain</label>
          <div class="mt-2.5">
            <input type="text" id="ac-explain" v-model="form.acExplain" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="additional-info" class="block text-sm font-semibold leading-6 text-gray-900">Any information that you have that we'd need to know! - Including condition (link to photos if possible) Fill this out as much as you possibly can. In a bullet point format.</label>
          <div class="mt-2.5">
            <textarea id="additional-info" v-model="form.additionalInfo" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="loan-type" class="block text-sm font-semibold leading-6 text-gray-900">Loan Type</label>
          <div class="mt-2.5">
            <input type="text" id="loan-type" v-model="form.loanType" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="loan-amount" class="block text-sm font-semibold leading-6 text-gray-900">Loan Amount</label>
          <div class="mt-2.5">
            <input type="number" id="loan-amount" v-model="form.loanAmount" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="interest-rate" class="block text-sm font-semibold leading-6 text-gray-900">Interest Rate</label>
          <div class="mt-2.5">
            <input type="number" id="interest-rate" v-model="form.interestRate" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div v-if="contactType === 'verifiedOwner'" class="sm:col-span-2">
          <label for="piti" class="block text-sm font-semibold leading-6 text-gray-900">PITI</label>
          <div class="mt-2.5">
            <input type="number" id="piti" v-model="form.piti" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <button type="submit" :disabled="isSubmitting" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Submit
        </button>
      </div>
      <div v-if="showAlert" class="mt-4">
        <p class="text-sm font-semibold text-green-600">Lead submitted successfully!</p>
      </div>
    </form>
  </div>
</template>


<script setup>

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  whySell: '',
  askingPrice: '',
  sellTime: '',
  propertyCondition: '',
  repairsUpdatesNeeded: '',
  roofReplacement: '',
  kitchenUpdate: '',
  bathroomUpdate: '',
  foundationCondition: '',
  plumbingIssues: '',
  plumbingExplain: '',
  electricityIssues: '',
  electricityExplain: '',
  hvacIssues: '',
  hvacExplain: '',
  furnaceIssues: '',
  furnaceExplain: '',
  sewerLineIssues: '',
  sewerLineExplain: '',
  acIssues: '',
  acExplain: '',
  additionalInfo: '',
  loanType: '',
  loanAmount: '',
  interestRate: '',
  piti: ''
})

const contactType = ref('default')
const isSubmitting = ref(false)
const showAlert = ref(false)

const router = useRouter()

const updateFormFields = () => {
  // Clear all specific fields when contact type changes
  Object.keys(form.value).forEach(key => form.value[key] = '')
}

const submitLead = async () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.phone) {
    return
  }

  isSubmitting.value = true

  const backendUrl = '/.netlify/functions/forwardWebhook'
  const headers = {
    'Content-Type': 'application/json'
  }

  const payload = {
    contactType: contactType.value,
    ...form.value
  }

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })

    const data = await response.json()
    console.log('Lead added successfully via serverless function:', data)
    showAlert.value = true
    Object.keys(form.value).forEach(key => form.value[key] = '') // Reset form
  } catch (error) {
    console.error('Error adding lead via serverless function:', error)
  }

  isSubmitting.value = false
}

if (router.currentRoute.value.query.type) {
  contactType.value = router.currentRoute.value.query.type
  updateFormFields()
}
</script>

