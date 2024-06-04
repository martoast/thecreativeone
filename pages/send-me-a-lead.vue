<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto py-12">
        <div class="bg-white shadow sm:rounded-lg p-6">
            <form @submit.prevent="submitLead">
            <h2 class="text-lg font-semibold leading-7 text-gray-900 mb-6">Send Me a Lead Form </h2>

            
            
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label for="address" class="block text-sm font-medium leading-6 text-gray-900 mb-2">Address</label>
                  <custom-places-auto-complete @updateAddress="handleUpdateAddress" style="margin-bottom: 1rem;" />
                <!-- <input type="text" name="address" id="address" v-model="lead.address" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
                </div>

                <div class="sm:col-span-2">
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <input type="text" name="name" id="name" v-model="lead.name" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
    
                <div class="sm:col-span-2">
                    <label for="best-time-to-contact" class="block text-sm font-medium leading-6 text-gray-900">Best time to contact</label>
                    <input type="time" name="best-time-to-contact" id="best-time-to-contact" v-model="lead.best_time_to_contact" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                <div class="sm:col-span-2">
                    <label for="best-contact-method" class="block text-sm font-medium leading-6 text-gray-900">Best contact method</label>
                    <select id="best-contact-method" name="best-contact-method" v-model="lead.best_contact_method" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option value="">Select a method</option>
                    <option value="Phone">Phone</option>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                    </select>
                </div>
    
                <div class="sm:col-span-1">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <input id="email" name="email" type="email" v-model="lead.email" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
    
                <div class="sm:col-span-1">
                <label for="phone-number" class="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
                <input type="text" name="phone-number" id="phone-number" v-model="lead.phone_number" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
    
                
    
                <div class="sm:col-span-1">
                <label for="type-of-deal" class="block text-sm font-medium leading-6 text-gray-900">Type of deal</label>
                <select id="type-of-deal" name="type-of-deal" v-model="lead.type_of_deal" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>Wholesale cash</option>
                    <option>Subto</option>
                    <option>Hybrid</option>
                    <option>Other</option>
                </select>
                </div>
    
                <div class="sm:col-span-1">
                <label for="under-contract" class="block text-sm font-medium leading-6 text-gray-900">Under contract?</label>
                <select id="under-contract" name="under-contract" v-model="lead.under_contract" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>Yes</option>
                    <option>No</option>
                </select>
                </div>
    
                <div class="sm:col-span-1">
                <label for="emd-in" class="block text-sm font-medium leading-6 text-gray-900">EMD IN?</label>
                <select id="emd-in" name="emd-in" v-model="lead.emd_in" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>Yes</option>
                    <option>No</option>
                </select>
                </div>
    
                <div class="sm:col-span-2">
                <label for="title-company" class="block text-sm font-medium leading-6 text-gray-900">Name of Title Company</label>
                <input type="text" name="title-company" id="title-company" v-model="lead.title_company" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
    
                <div class="sm:col-span-1">
                <label for="inspection-in-place" class="block text-sm font-medium leading-6 text-gray-900">Inspection in place?</label>
                <select id="inspection-in-place" name="inspection-in-place" v-model="lead.inspection_in_place" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>Yes</option>
                    <option>No</option>
                </select>
                </div>
    
                <div class="sm:col-span-1">
                <label for="have-pictures" class="block text-sm font-medium leading-6 text-gray-900">Do you have pictures?</label>
                <select id="have-pictures" name="have-pictures" v-model="lead.have_pictures" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>Yes</option>
                    <option>No</option>
                </select>
                </div>
    
                <div class="sm:col-span-1">
                <label for="coe-date" class="block text-sm font-medium leading-6 text-gray-900">C.O.E</label>
                <input type="date" name="coe-date" id="coe-date" v-model="lead.coe_date" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
    
                <div class="sm:col-span-2">
                <label for="mortgage-documents" class="block text-sm font-medium leading-6 text-gray-900">Mortgage Documents</label>
                <input type="file" name="mortgage-documents" id="mortgage-documents" @change="handleFileUpload" class="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                </div>
    
                <div class="sm:col-span-1">
                <label for="mortgage-balance" class="block text-sm font-medium leading-6 text-gray-900">What is the mortgage balance?</label>
                <input type="number" name="mortgage-balance" id="mortgage-balance" v-model="lead.mortgage_balance" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
    
                <div class="sm:col-span-1">
                <label for="type-of-loan" class="block text-sm font-medium leading-6 text-gray-900">Type of loan?</label>
                <input type="text" name="type-of-loan" id="type-of-loan" v-model="lead.type_of_loan" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
    
                <div class="sm:col-span-1">
                <label for="loan-maturity" class="block text-sm font-medium leading-6 text-gray-900">Loan maturity?</label>
                <input type="date" name="loan-maturity" id="loan-maturity" v-model="lead.loan_maturity" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
    
                <div class="sm:col-span-1">
                <label for="interest-rate" class="block text-sm font-medium leading-6 text-gray-900">Interest rate?</label>
                <input type="number" step="0.01" name="interest-rate" id="interest-rate" v-model="lead.interest_rate" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
    
                <div class="sm:col-span-2">
                <label for="arrears-or-liens" class="block text-sm font-medium leading-6 text-gray-900">Any arrears or liens?</label>
                <textarea id="arrears-or-liens" name="arrears-or-liens" rows="3" v-model="lead.arrears_or_liens" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
    
                <div class="sm:col-span-1">
                <label for="approx-cash-to-close" class="block text-sm font-medium leading-6 text-gray-900">Approx cash to close</label>
                <input type="number" name="approx-cash-to-close" id="approx-cash-to-close" v-model="lead.approx_cash_to_close" class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
    
            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
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


const config = useRuntimeConfig()

const zillowApiKey = config.public.ZILLOW_API_KEY;

  
  const lead = ref({
    name: '',
    best_time_to_contact: '',
    best_contact_method: '',
    email: '',
    phone_number: '',
    address: '',
    type_of_deal: '',
    under_contract: '',
    emd_in: '',
    title_company: '',
    inspection_in_place: '',
    have_pictures: '',
    coe_date: '',
    mortgage_documents: null,  // For file upload handling
    mortgage_balance: '',
    type_of_loan: '',
    loan_maturity: '',
    interest_rate: '',
    arrears_or_liens: '',
    approx_cash_to_close: ''
  })
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    lead.value.mortgage_documents = file
  }
  
  const submitLead = async () => {
  const backendUrl = '/.netlify/functions/forwardWebhook';

  const headers = {
    'Content-Type': 'application/json'
  };

  const payload = {
    name: lead.value.name,
    best_time_to_contact: lead.value.best_time_to_contact,
    best_contact_method: lead.value.best_contact_method,
    email: lead.value.email,
    phone_number: lead.value.phone_number,
    address: lead.value.address,
    type_of_deal: lead.value.type_of_deal,
    under_contract: lead.value.under_contract,
    emd_in: lead.value.emd_in,
    title_company: lead.value.title_company,
    inspection_in_place: lead.value.inspection_in_place,
    have_pictures: lead.value.have_pictures,
    coe_date: lead.value.coe_date,
    mortgage_balance: lead.value.mortgage_balance,
    type_of_loan: lead.value.type_of_loan,
    loan_maturity: lead.value.loan_maturity,
    interest_rate: lead.value.interest_rate,
    arrears_or_liens: lead.value.arrears_or_liens,
    approx_cash_to_close: lead.value.approx_cash_to_close
  };

  const { data, error } = await useFetch(backendUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  });

  if (error.value) {
    console.error('Error adding lead via serverless function:', error.value);
    // Handle error (e.g., show an error message)
  } else {
    console.log('Lead added successfully via serverless function:', data.value);
    // Handle success (e.g., show a success message, clear the form, etc.)
  }
};


  const handleUpdateAddress = (data) => {
    // fetchPropertyData(data.address);

    lead.value.address = data.address

  };

  // const fetchPropertyData = async (address) => {
  //   let apiUrl = `https://zillow-com1.p.rapidapi.com/property?address=${encodeURIComponent(address)}`;
  //   const { data, error } = await $fetch(apiUrl, {
  //   headers: {
  //     'X-RapidAPI-Key': zillowApiKey,
  //     'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
  //   },
  //   onRequest({ request, options }) {
  //     // Set the request headers
  //     options.headers = options.headers || {};
  //   },
  //   onRequestError({ request, options, error }) {
  //     // Handle the request errors
  //     console.error('Request error:', error);
  //   },
  //   onResponse({ request, response, options }) {
  //     // Process the response data
  //     if (response.ok) {
  //       console.log(response._data)
  //       lead.value.price = response._data.price;
  //       lead.value.bedrooms = response._data.bedrooms;
  //       lead.value.bathrooms = response._data.bathrooms;
      
  //       lead.value.rent_zestimate = response._data.rentZestimate;
  //       lead.value.zestimate = response._data.zestimate;
  //       lead.value.property_type = response._data.homeType;
  //       lead.value.zoning = response._data.zoning ? response._data.zoning : response._data.resoFacts.zoning;
  //       lead.value.lot_size = response._data.lotSize ? response._data.lotSize : null;
  //       lead.value.living_area = response._data.livingArea;
  //       lead.value.year_built = response._data.yearBuilt;
  //       lead.value.price_per_square_foot = response._data.resoFacts.pricePerSquareFoot;
  //       // Update other properties as needed
  //     } else {
  //       console.error('Response error:', response.status);
  //     }
  //   },
  //   onResponseError({ request, response, options }) {
  //     // Handle the response errors
  //     console.error('Response error:', response.status);
  //   }
  // });

  // }
  </script>
  

  