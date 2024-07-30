<template>
  <section aria-labelledby="details-heading" class="mt-12">
    <h2 id="details-heading" class="sr-only">Property details</h2>
    <div class="divide-y divide-gray-200 border-t">
      <Disclosure as="div" v-for="(detail, index) in propertyDetails" :key="index" v-slot="{ open }">
        <h3>
          <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left">
            <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">{{ detail.name }}</span>
            <span class="ml-6 flex items-center">
              <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
            </span>
          </DisclosureButton>
        </h3>
        <DisclosurePanel as="div" class="prose prose-sm pb-6">
          <dl class="divide-y divide-gray-200">
            <div v-for="(item, itemKey) in detail.items" :key="itemKey" class="flex justify-between py-3 text-sm">
              <dt class="text-gray-500">{{ itemKey }}</dt>
              <dd class="text-gray-900">{{ item }}</dd>
            </div>
          </dl>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </section>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

const propertyDetails = computed(() => [
  {
    name: 'Property Information',
    items: {
      'Type': props.property.zillow.homeType || 'N/A',
      'Year Built': props.property.zillow.yearBuilt || 'N/A',
      'Bedrooms': props.property.zillow.bedrooms || 'N/A',
      'Bathrooms': props.property.zillow.bathrooms || 'N/A',
      'Living Area': `${props.property.zillow.livingArea || 'N/A'} sq ft`,
      'Lot Size': props.property.zillow.lotSize || 'N/A',
    }
  },
  {
    name: 'Financial Details',
    items: {
      'Estimated value': props.property.re.details.estimatedValue && props.property.zillow.zestimate ? formatCurrency((props.property.re.details.estimatedValue + props.property.zillow.zestimate) / 2) : 'N/A',
      'EstimatedRent': formatCurrency(props.property.zillow.rentZestimate),
      'Price per Square Foot': props.property.zillow.pricePerSquareFoot ? formatCurrency(props.property.zillow.pricePerSquareFoot) : 'N/A',
      'Property Tax': props.property.zillow.taxAnnualAmount? formatCurrency(props.property.zillow.taxAnnualAmount) : 'N/A',
      'Tax Rate': props.property.zillow.propertyTaxRate ? `${parseFloat(props.property.zillow.propertyTaxRate)}%` : 'N/A',
    }
  },
  {
    name: 'Lot Info',
    items: {
      'APN': props.property.re.details.lotInfo.apn || 'N/A',
      'Zoning': props.property.re.details.lotInfo.zoning || 'N/A',
      'Census Block': props.property.re.details.lotInfo.censusBlock || 'N/A',
      'Census Block Group': props.property.re.details.lotInfo.censusBlockGroup || 'N/A',
      'Census Tract': props.property.re.details.lotInfo.censusTract || 'N/A',
      'Land Use': props.property.re.details.lotInfo.landUse || 'N/A',
      'Legal Description': props.property.re.details.lotInfo.legalDescription || 'N/A',
      'Lot Acres': props.property.re.details.lotInfo.lotAcres || 'N/A',
      'Lot Number': props.property.re.details.lotInfo.lotNumber || 'N/A',
      'Lot Square Feet': props.property.re.details.lotInfo.lotSquareFeet || 'N/A',
      'Property Class': props.property.re.details.lotInfo.propertyClass || 'N/A',
      'Property Use': props.property.re.details.lotInfo.propertyUse || 'N/A',
      'Subdivision': props.property.re.details.lotInfo.subdivision || 'N/A',
    }
  },
  {
    name: 'Owner',
    items: {
      'Full Name': props.property.re.skip_trace.output.identity.names[0]?.fullName || 'N/A',
      'First Name': props.property.re.skip_trace.output.identity.names[0]?.firstName || 'N/A',
      'Middle Name': props.property.re.skip_trace.output.identity.names[0]?.middleName || 'N/A',
      'Last Name': props.property.re.skip_trace.output.identity.names[0]?.lastName || 'N/A',
      'Formatted Address': props.property.re.skip_trace.output.identity.address?.formattedAddress || 'N/A',
      'City': props.property.re.skip_trace.output.identity.address?.city || 'N/A',
      'State': props.property.re.skip_trace.output.identity.address?.state || 'N/A',
      'Zip Code': props.property.re.skip_trace.output.identity.address?.zip || 'N/A',
      'Phone Numbers': props.property.re.skip_trace.output.identity.phones.map(phone => phone.phoneDisplay).join(', ') || 'N/A',
      'Gender': props.property.re.skip_trace.output.demographics.gender || 'N/A',
      'Job Title': props.property.re.skip_trace.output.demographics.jobs[0]?.title || 'N/A'
    }
  },
  {
    name: 'Mortgage Info',
    items: {
      'Equity': formatCurrency(props.property.re.details.equity),
      'Equity Percent': props.property.re.details.equityPercent ? `${props.property.re.details.equityPercent}%` : 'N/A',
      'Estimated Equity': formatCurrency(props.property.re.details.estimatedEquity),
      'Estimated Mortgage Balance': formatCurrency(props.property.re.details.estimatedMortgageBalance),
      'Estimated Mortgage Payment': formatCurrency(props.property.re.details.estimatedMortgagePayment)
    }
  },
  {
  name: 'Sale History',
  items: {
    'Buyer Names': props.property.re.details.lastSale.buyerNames || 'N/A',
    'Document Type': props.property.re.details.lastSale.documentType || 'N/A',
    'Document Type Code': props.property.re.details.lastSale.documentTypeCode || 'N/A',
    'Down Payment': props.property.re.details.lastSale.downPayment || 'N/A',
    'LTV': props.property.re.details.lastSale.ltv || 'N/A',
    'Owner Individual': props.property.re.details.lastSale.ownerIndividual || 'N/A',
    'Prior Owner Individual': props.property.re.details.lastSale.priorOwnerIndividual || 'N/A',
    'Prior Owner Months Owned': props.property.re.details.lastSale.priorOwnerMonthsOwned || 'N/A',
    'Purchase Method': props.property.re.details.lastSale.purchaseMethod || 'N/A',
    'Recording Date': props.property.re.details.lastSale.recordingDate || 'N/A',
    'Sale Amount': props.property.re.details.lastSale.saleAmount > 0 || 'N/A',
    'Sale Date': props.property.re.details.lastSale.saleDate || 'N/A',
    'Seller Names': props.property.re.details.lastSale.sellerNames || 'N/A',
    'Transaction Type': props.property.re.details.lastSale.transactionType || 'N/A',
    ...props.property.re.details.saleHistory.reduce((acc, sale, index) => {
      acc[`Sale ${index + 1}`] = `Date: ${sale.saleDate || 'N/A'}, Buyer: ${sale.buyerNames || 'N/A'}, Seller: ${sale.sellerNames || 'N/A'}, Document Type: ${sale.documentType || 'N/A'}, Transaction Type: ${sale.transactionType || 'N/A'}, Sale Amount: $${sale.saleAmount || 'N/A'}`;
      return acc;
    }, {})
  }
}

])
</script>
