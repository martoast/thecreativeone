<template>
    <form @submit.prevent="submitLead" class="mx-auto mt-12 max-w-xl sm:mt-20">
      <AlertComponent :show="showAlert" @update:show="showAlert = $event" message="Sent Successfully" />

      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="contact-type" class="block text-sm font-semibold leading-6 text-gray-900">Type of Contact</label>
          <div class="mt-2.5">
            <select id="contact-type" v-model="contactType" @change="updateFormFields" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option value="default">Select</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="agent">Agent</option>
              <option value="relativeOfOwner">Relative of Owner</option>
              <option value="potentialBuyer">Potential Buyer</option>
              <option value="verifiedOwner">Verified Owner</option>
            </select>
          </div>
        </div>

        <!-- Address Fields -->
        <div class="sm:col-span-2">
          <label for="address" class="block text-sm font-medium leading-6 text-gray-900 mb-2">Address</label>
          <div v-if="!addressSelected">
            <custom-places-auto-complete @updateAddress="handleUpdateAddress" />
          </div>
          <div v-else class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street Address</label>
              <input type="text" name="street-address" id="street-address" v-model="form.streetAddress" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div>
              <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
              <input type="text" name="city" id="city" v-model="form.city" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div>
              <label for="state" class="block text-sm font-medium leading-6 text-gray-900">State</label>
              <input type="text" name="state" id="state" v-model="form.state" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div class="sm:col-span-2">
              <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">Postal Code</label>
              <input type="text" name="postal-code" id="postal-code" v-model="form.postalCode" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <button @click="resetAddress" type="button" class="text-sm font-semibold leading-6 text-indigo-600 sm:col-span-2">Change Address</button>
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
          <span>{{isSubmitting ? 'Loading...' : 'Submit'}}</span>
        </button>
      </div>
    </form>
</template>


<script setup>

const props = defineProps({
  initialContactType: {
    type: String,
    default: 'default'
  },
  address: {
    type: String,
    default: ''
  }
});

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  streetAddress: '',
  city: '',
  state: '',
  postalCode: '',
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

const pipelineIdMapping = {
  wholesaler: { pipelineId: 'lcpnUC4WGbo7AdpsGvbK', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
  agent: { pipelineId: 'CmoxROP6NCUPt3tNdVB3', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
  lender: { pipelineId: 'ChlY1BFP3YHcW5Rliaxn', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
  relativeOfOwner: { pipelineId: 'ggXgJdSyvjLdgCFNQfwp', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
  verifiedOwner: { pipelineId: 'ggXgJdSyvjLdgCFNQfwp', stageId: '9c6296d5-b6b7-4286-9e37-79629a18234d' },
  potentialBuyer: { pipelineId: 'hq6yosICCNVfFK6JaZNn', stageId: '3fcc83d0-7e37-46b1-912b-457cc032e140' }
};

const contactType = ref(props.initialContactType);
const isSubmitting = ref(false)
const showAlert = ref(false)

const addressSelected = ref(false)

const router = useRouter()

const updateFormFields = () => {
  const preservedAddress = {
    streetAddress: form.value.streetAddress,
    city: form.value.city,
    state: form.value.state,
    postalCode: form.value.postalCode,
    fullAddress: form.value.fullAddress
  };

  // Clear all specific fields except the address fields when contact type changes
  Object.keys(form.value).forEach(key => {
    if (!['streetAddress', 'city', 'state', 'postalCode', 'fullAddress'].includes(key)) {
      form.value[key] = '';
    }
  });

  // Restore the preserved address fields
  Object.assign(form.value, preservedAddress);
};




const submitLead = async () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.phone) {
    return;
  }

  isSubmitting.value = true;

  console.log(contactType.value)

  const backendUrl = contactType.value == 'potentialBuyer' ? '/.netlify/functions/buyerWebhook' : '/.netlify/functions/forwardWebhook';

  const headers = {
    'Content-Type': 'application/json'
  };

  const { pipelineId, stageId } = pipelineIdMapping[contactType.value] || {};

  const payload = {
    lead: {
      contactType: contactType.value,
      fullName: `${form.value.firstName} ${form.value.lastName}`,
      pipelineId: pipelineId,
      stage: stageId,
      source: 'website',
      ...form.value
    }
  };

  console.log(payload)

  try {
    const { data, error } = await $fetch(backendUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (error) {
      console.error('Error adding lead via serverless function:', error);
      // Handle error (e.g., show an error message)
    } else {
      showAlert.value = true;
      Object.keys(form.value).forEach(key => form.value[key] = ''); // Reset form
      window.open("https://beacons.ai/e_steban", "mozillaTab"); // Open new tab
    }
  } catch (err) {
    console.error('Error adding lead via serverless function:', err);
    // Handle error (e.g., show an error message)
  } finally {
    isSubmitting.value = false;
  }
};


const handleUpdateAddress = (data) => {
  form.value.fullAddress = data.address
  const [streetAddress, city, stateZip] = data.address.split(', ')
  form.value.streetAddress = streetAddress
  form.value.city = city
  const [state, postalCode] = stateZip.split(' ')
  form.value.state = state
  form.value.postalCode = postalCode
  addressSelected.value = true
}


const resetAddress = () => {
  addressSelected.value = false
  form.value.streetAddress = null
  form.value.city = null
  form.value.state = null
  form.value.postalCode = null
  form.value.fullAddress = null
}


if (router.currentRoute.value.query.type) {
  contactType.value = router.currentRoute.value.query.type
  updateFormFields()
}

onMounted(() => {
  if (props.initialContactType) {
    contactType.value = props.initialContactType;
    updateFormFields();
  }

  if (props.address) {
    console.log("here")
    handleUpdateAddress({ address: props.address });
  }
});
</script>

