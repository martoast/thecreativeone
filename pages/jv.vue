<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <div class="mb-4">
        <a href="/" class="text-sm font-semibold leading-7 text-indigo-600"
          ><span aria-hidden="true">&larr;</span> Back to home</a
        >
      </div>
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Joint Venture Form
      </h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">
        Submit your joint venture proposal and we'll get back to you as soon as
        possible.
      </p>
    </div>

    <form
      @submit.prevent="submitJointVentureForm"
      class="mx-auto mt-16 max-w-xl sm:mt-20"
    >
      <AlertComponent
        :show="showAlert"
        @update:show="showAlert = $event"
        message="Sent Successfully"
      />
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <h3 class="text-lg font-semibold leading-7 text-gray-900">
            Contact info:
          </h3>
        </div>

        <!-- Name -->
        <div class="sm:col-span-2">
          <label
            for="name"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Name</label
          >
          <input
            type="text"
            name="name"
            id="name"
            v-model="form.name"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <!-- Number -->
        <div class="sm:col-span-2">
          <label
            for="phone_number"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Phone number</label
          >
          <input
            type="tel"
            name="phone_numbe "
            id="phone_number"
            v-model="form.phone_number"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <!-- Email -->
        <div class="sm:col-span-2">
          <label
            for="email"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            v-model="form.email"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <!-- Address -->
        <div class="sm:col-span-2">
          <label
            for="address"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Address</label
          >
          <div v-if="!form?.address?.selected">
            <custom-places-auto-complete @updateAddress="handleAddressUpdate" />
          </div>
          <div v-else class="mt-2.5">
            <p>{{ form.address.fullAddress }}</p>
            <button
              @click="resetAddress"
              type="button"
              class="text-sm font-semibold leading-6 text-indigo-600"
            >
              Change Address
            </button>
          </div>
        </div>

        <div class="sm:col-span-2 mt-5">
          <h3 class="text-lg font-semibold leading-7 text-gray-900">
            Property details:
          </h3>
        </div>

        <!-- Bed -->
        <div>
          <label
            for="bed"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Bed</label
          >
          <input
            type="number"
            name="bed"
            id="bed"
            v-model="form.bed"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <!-- Bath -->
        <div>
          <label
            for="bath"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Bath</label
          >
          <input
            type="number"
            name="bath"
            id="bath"
            v-model="form.bath"
            step="0.5"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <!-- Sqft. count -->
        <div>
          <label
            for="sqftCount"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Sqft. count</label
          >
          <input
            type="number"
            name="sqftCount"
            id="sqftCount"
            v-model="form.sqftCount"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <!-- Lot sqft -->
        <div>
          <label
            for="lotSqft"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Lot sqft</label
          >
          <input
            type="number"
            name="lotSqft"
            id="lotSqft"
            v-model="form.lotSqft"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <!-- Year built -->
        <div>
          <label
            for="yearBuilt"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Year built</label
          >
          <input
            type="number"
            name="yearBuilt"
            id="yearBuilt"
            v-model="form.yearBuilt"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <!-- Occupancy status -->
        <div class="sm:col-span-2">
          <label
            for="occupancyStatus"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Vacant?</label
          >
          <select
            id="occupancyStatus"
            name="occupancyStatus"
            v-model="form.occupancyStatus"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Please Select</option>
            <option value="occupied">Occupied</option>
            <option value="vacant">Vacant</option>
          </select>
        </div>

        <!-- Has HOA? -->
  <div class="sm:col-span-2">
    <label
      for="hasHoa"
      class="block text-sm font-semibold leading-6 text-gray-900"
    >Has HOA?</label>
    <select
      id="hasHoa"
      name="hasHoa"
      v-model="form.hasHoa"
      class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option value="">Please Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>

  <!-- Conditional HOA fields -->
  <div v-if="form.hasHoa === 'yes'" class="sm:col-span-2">
    <div class="mt-4">
      <label
        for="hoaName"
        class="block text-sm font-semibold leading-6 text-gray-900"
      >HOA Name</label>
      <input
        type="text"
        id="hoaName"
        name="hoaName"
        v-model="form.hoaDetails.name"
        class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
    
    <div class="mt-4">
      <label
        for="hoaAmount"
        class="block text-sm font-semibold leading-6 text-gray-900"
      >HOA Amount</label>
      <CurrencyInput
        name="hoaAmount"
        id="hoaAmount"
        v-model="form.hoaDetails.amount"
        class="mt-2.5"
      />
    </div>
    
    <div class="mt-4">
      <label
        for="hoaFrequency"
        class="block text-sm font-semibold leading-6 text-gray-900"
      >HOA Payment Frequency</label>
      <select
        id="hoaFrequency"
        name="hoaFrequency"
        v-model="form.hoaDetails.frequency"
        class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value="">Please Select</option>
        <option value="monthly">Monthly</option>
        <option value="semiannually">Semi-annually</option>
        <option value="annually">Annually</option>
      </select>
    </div>
  </div>

        <!-- Are you the contract holder? -->
        <div class="sm:col-span-2">
          <label
            for="contractHolder"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Are you the contract holder?</label
          >
          <select
            id="contractHolder"
            name="contractHolder"
            v-model="form.contractHolder"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <!-- Are you direct to the seller? -->
        <div class="sm:col-span-2">
          <label
            for="directToSeller"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Are you direct to the seller?</label
          >
          <select
            id="directToSeller"
            name="directToSeller"
            v-model="form.directToSeller"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <!-- Asking price -->
        <div class="sm:col-span-2">
          <label
            for="askingPrice"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Asking price</label
          >
          <CurrencyInput
            name="askingPrice"
            id="askingPrice"
            v-model="form.askingPrice"
          />
        </div>

        <!-- Type of deal -->
        <div class="sm:col-span-2">
          <label
            for="dealType"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Type of deal</label
          >
          <select
            id="dealType"
            name="dealType"
            v-model="form.dealType"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Please Select</option>
            <option value="subto">Subject To</option>
            <option value="sellerFinance">Seller Finance</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <!-- What are the terms? -->
        <div class="sm:col-span-2">
          <label
            for="terms"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >What are the terms?</label
          >
          <textarea
            id="terms"
            name="terms"
            v-model="form.terms"
            rows="3"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>

        <!-- ARV -->
        <div class="sm:col-span-2">
          <label
            for="arv"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >ARV (After Repair Value)</label
          >
          <CurrencyInput
            name="arv"
            id="arv"
            v-model="form.arv"
            class="mt-2.5"
          />
        </div>

        <!-- Cash to close? -->
        <div class="sm:col-span-2">
          <label
            for="cashToClose"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Cash to close?</label
          >
          <CurrencyInput
            name="cashToClose"
            id="cashToClose"
            v-model="form.cashToClose"
            class="mt-2.5"
          />
        </div>

        <!-- Rental comps -->
        <div class="sm:col-span-2">
          <label
            for="rentalComps"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Rental comps</label
          >
          <textarea
            id="rentalComps"
            name="rentalComps"
            v-model="form.rentalComps"
            rows="3"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>

        <!-- Enter recent comps if any -->
        <div class="sm:col-span-2">
          <label
            for="recentComps"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Enter recent comps if any</label
          >
          <textarea
            id="recentComps"
            name="recentComps"
            v-model="form.recentComps"
            rows="3"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>

        <!-- Condition -->
        <div class="sm:col-span-2">
          <label
            for="condition"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Condition</label
          >
          <select
            id="condition"
            name="condition"
            v-model="form.condition"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Please Select</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <!-- If it needs condition -->
        <div class="sm:col-span-2">
          <div class="sm:col-span-2">
            <label
              for="workNeeded"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Work Needed (Please describe any repairs or renovations
              required)</label
            >
            <textarea
              id="workNeeded"
              name="workNeeded"
              v-model="form.workNeeded"
              rows="3"
              class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
          <div class="mt-4">
            <label
              for="priceEstimate"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Price estimate (if available)</label
            >
            <CurrencyInput
              name="priceEstimate"
              id="priceEstimate"
              v-model="form.priceEstimate"
              class="mt-2.5"
            />
          </div>
        </div>

        <!-- Can our buyers access the home? -->
        <div class="sm:col-span-2">
          <label
            for="buyerAccess"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Can our buyers access the home? If so, how can we set up
            showings?</label
          >
          <textarea
            id="buyerAccess"
            name="buyerAccess"
            v-model="form.buyerAccess"
            rows="3"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>

        <div class="sm:col-span-2">
          <label
            for="emdAmount"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >EMD amount</label
          >
          <CurrencyInput
            name="emdAmount"
            id="emdAmount"
            v-model="form.emdAmount"
            class="mt-2.5"
          />
        </div>

        <div class="sm:col-span-2">
          <label
            for="emd"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >When does EMD go hard?</label
          >
          <textarea
            id="emd"
            name="emd"
            v-model="form.emd"
            rows="3"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>

        <div class="sm:col-span-2">
        <label
          for="emdAmount"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >expected assignment-under asking price</label
        >
        <CurrencyInput
          name="assingmentAskingPrice"
          id="assingmentAskingPrice"
          v-model="form.assingmentAskingPrice"
          class="mt-2.5"
        />
      </div>

      <div class="sm:col-span-2">
        <div class="sm:col-span-2">
          <label
            for="exit_strategy"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Best Exit strategy-under what are the terms</label
          >
          <textarea
            id="exit_strategy"
            name="exit_strategy"
            v-model="form.exit_strategy"
            rows="3"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
        
      </div>

        <!-- Date of closing -->
        <div class="sm:col-span-2">
          <label
            for="closingDate"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Date of closing</label
          >
          <input
            type="date"
            name="closingDate"
            id="closingDate"
            v-model="form.closingDate"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div class="sm:col-span-2">
          <div class="sm:col-span-2 mt-2">
            <label
              for="skool"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Are you a Skool member?</label
            >
            <select
              id="skool"
              name="skool"
              v-model="form.skool"
              class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Please Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <!-- Conditional split agreement question -->
        <div class="sm:col-span-2" v-if="form.skool !== ''">
          <label
            for="splitAgreement"
            class="block text-sm font-semibold leading-6 text-gray-900"
          >
            {{ getSplitAgreementQuestion }}
          </label>
          <select
            id="splitAgreement"
            name="splitAgreement"
            v-model="form.splitAgreement"
            class="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div class="sm:col-span-2 my-4">
        <label
          for="contracts"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Upload Contracts (PDF)</label
        >
        <input
          type="file"
          name="contracts"
          id="contracts"
          accept=".pdf"
          @change="(e) => handleFileUpload(e, 'contracts')"
          ref="contractsInput"
          multiple
          class="mt-2.5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>

      <div class="sm:col-span-2 my-4">
        <label
          for="images"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Upload Images</label
        >
        <input
          type="file"
          name="images"
          id="images"
          accept="image/*"
          @change="(e) => handleFileUpload(e, 'images')"
          ref="imagesInput"
          multiple
          class="mt-2.5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>

      <div class="mt-10">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span>{{ isSubmitting ? "Loading..." : "Submit" }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "main",
});

const addressDetails = ref(null);
const isLoading = ref(false);
const error = ref(null);

const contractsInput = ref(null);
const imagesInput = ref(null);

const form = ref({
  name: "",
  phone_number: "",
  email: "",
  contractHolder: "",
  directToSeller: "",
  askingPrice: null,
  dealType: "",
  terms: "",
  skool: "",
  arv: null,
  cashToClose: null,
  rentalComps: "",
  recentComps: "",
  address: {
    fullAddress: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    selected: false,
  },
  hasHoa: "",
  hoaDetails: {
    name: "",
    amount: null,
    frequency: "",
  },
  bed: null,
  bath: null,
  sqftCount: null,
  lotSqft: null,
  yearBuilt: null,
  occupancyStatus: "",
  condition: "",
  workNeeded: "",
  priceEstimate: null,
  buyerAccess: "",
  emdAmount: null,
  closingDate: "",
  splitAgreement: "",
  comps: null,
  currentMortgages: null,
  demographics: null,
  lastSale: null,
  lotInfo: null,
  emd: null,
  assingmentAskingPrice: null,
  exit_strategy: null,
});

const files = ref({
  images: null,
  contracts: null,
});

const isSubmitting = ref(false);
const showAlert = ref(false);

const router = useRouter();

const handleAddressUpdate = async (data) => {
  try {
    if (!data?.address) return;
    
    const [streetAddress, city, stateZip] = data.address.split(", ");
    const [state, postalCode] = stateZip ? stateZip.split(" ") : ["", ""];
    
    form.value.address = {
      fullAddress: data.address,
      street: streetAddress || "",
      city: city || "",
      state: state || "",
      postalCode: postalCode || "",
      selected: true
    };

    // Fetch address details
    if (data.address) {
      await fetchAddressDetails(data.address);
    }
  } catch (error) {
    console.error('Error updating address:', error);
  }
};

const fetchAddressDetails = async (address) => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const response = await $fetch('/api/re/property-details', {
      method: 'POST',
      body: { address }
    });

    if (response?.data) {
      addressDetails.value = response.data;
      
      // Preserve the address data when updating other form fields
      const currentAddress = form.value.address;
      
      // Update form fields while keeping the address intact
      form.value = {
        ...form.value, // Keep existing form values
        bed: response.data.propertyInfo?.bedrooms ?? '',
        bath: response.data.propertyInfo?.bathrooms ?? '',
        sqftCount: response.data.propertyInfo?.livingSquareFeet ?? '',
        lotSqft: response.data.propertyInfo?.lotSquareFeet ?? '',
        yearBuilt: response.data.propertyInfo?.yearBuilt ?? '',
        comps: response.data.comps ?? null,
        currentMortgages: response.data.currentMortgages ?? null,
        demographics: response.data.demographics ?? null,
        lastSale: response.data.lastSale ?? null,
        lotInfo: response.data.lotInfo ?? null,
        occupancyStatus: response.data.vacant ? 'vacant' : 'occupied',
        address: currentAddress // Preserve the address data
      };
    }
  } catch (err) {
    console.error('Error fetching address details:', err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};
const resetAddress = () => {
  form.value.address = {
    fullAddress: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    selected: false,
  };
  addressDetails.value = null;
  error.value = null;
};


const resetForm = () => {
  Object.keys(form.value).forEach((key) => {
    if (key === "address") {
      form.value.address = { 
        fullAddress: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        selected: false 
      };
    } else if (key === "hoaDetails") {
      form.value.hoaDetails = {
        name: "",
        amount: null,
        frequency: "",
      };
    } else if (Array.isArray(form.value[key])) {
      form.value[key] = [];
    } else if (typeof form.value[key] === "object" && form.value[key] !== null) {
      Object.keys(form.value[key]).forEach((subKey) => {
        form.value[key][subKey] = "";
      });
    } else if (typeof form.value[key] === "boolean") {
      form.value[key] = false;
    } else if (typeof form.value[key] === "number") {
      form.value[key] = null;
    } else {
      form.value[key] = "";
    }
  });

  // Reset file inputs in the ref
  files.value = { images: null, contracts: null };

  // Reset file input elements using Vue refs
  if (contractsInput.value) contractsInput.value.value = '';
  if (imagesInput.value) imagesInput.value.value = '';
};

const submitJointVentureForm = async () => {
  // Check if all fields are filled
  const requiredFields = [
    "name",
    "phone_number",
    "email",
    "contractHolder",
    "directToSeller",
    "askingPrice",
    "dealType",
    "terms",
    "arv",
    "cashToClose",
    "rentalComps",
    "recentComps",
    "hasHoa",
    "bed",
    "bath",
    "sqftCount",
    "lotSqft",
    "yearBuilt",
    "occupancyStatus",
    "condition",
    "workNeeded",
    "priceEstimate",
    "buyerAccess",
    "emdAmount",
    "closingDate",
    "skool",
    "splitAgreement",
  ];

  const emptyFields = requiredFields.filter((field) => !form.value[field]);

  if (emptyFields.length > 0 || !form.value.address.selected) {
    alert(
      `Please fill in all required fields. Missing fields: ${emptyFields.join(
        ", "
      )}${!form.value.address.selected ? ", address" : ""}`
    );
    return;
  }

  isSubmitting.value = true;

  try {
    // Create a new folder in Google Drive
    const folderName = `${form.value.name} | ${form.value.address.fullAddress}`;
    const folderId = await createFolder(
      folderName,
      "1RVnpNvy26p_xDhH_TmlJWsZWk7xVTCrv"
    );

    let uploadedFiles = {
      contracts: [],
      images: [],
    };

    // Function to upload files
    const uploadFiles = async (fileArray, type) => {
      for (const file of fileArray) {
        try {
          const fileId = await uploadFile(
            file.filename,
            file.content,
            folderId
          );
          uploadedFiles[type].push({
            fileId: fileId,
            fileName: file.filename,
          });
          console.log(`${type} uploaded successfully. File ID: ${fileId}`);
        } catch (error) {
          console.error(`Error uploading ${type}:`, error);
          // You might want to handle this error differently, e.g., continue with other files
        }
      }
    };

    // Upload contracts
    if (files.value.contracts && files.value.contracts.length > 0) {
      await uploadFiles(files.value.contracts, "contracts");
    }

    // Upload images
    if (files.value.images && files.value.images.length > 0) {
      await uploadFiles(files.value.images, "images");
    }

    // Prepare the payload for the webhook
    const payload = {
      lead: {
        ...form.value,
        address: form.value.address.fullAddress,
        uploadedFiles: uploadedFiles,
      },
    };

    // Submit the form data to the webhook
    const backendUrl = "/.netlify/functions/jointVentureWebhook";
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    alert("Submitted successfully!");

    resetForm();
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error submitting the form. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

const getSplitAgreementQuestion = computed(() => {
  if (form.value.skool === "yes") {
    return "Are you okay with a 70(you)/30(us) split?";
  } else {
    return "Are you okay with a 50(you)/50(us) split?";
  }
});

// Function to create a folder
async function createFolder(folderName, parentFolderId = null) {
  const response = await fetch("/.netlify/functions/createGoogleDriveFolder", {
    method: "POST",
    body: JSON.stringify({ folderName, parentFolderId }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to create folder");
  }
  return data.folderId;
}

// Function to upload a file
async function uploadFile(fileName, fileContent, folderId) {
  const response = await fetch("/.netlify/functions/uploadFileToGoogleDrive", {
    method: "POST",
    body: JSON.stringify({ fileName, fileContent, folderId }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to upload file");
  }
  return data.fileId;
}

const handleFileUpload = (event, type) => {
  const _files = Array.from(event.target.files);

  if (!files.value[type]) {
    files.value[type] = [];
  }

  _files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      files.value[type].push({
        filename: file.name,
        content: e.target.result.split(",")[1], // This gets the base64 part of the result
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  });
};
</script>
