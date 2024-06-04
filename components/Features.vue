<template>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h2 class="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">All-in-one solutions</p>
            <p class="mt-6 text-base leading-7 text-gray-600">From closing deals to transactional lending and property acquisition, we provide expert guidance and tailored solutions to help you achieve your investment goals efficiently and effectively.</p>
          </div>
          <dl class="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
            <div v-for="feature in features" :key="feature.name" class="relative pl-9">
              <dt class="font-semibold text-gray-900">
                <CheckIcon class="absolute left-0 top-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
                {{ feature.title }}
              </dt>
              <dd class="mt-2">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { CheckIcon } from '@heroicons/vue/20/solid'
  
  const features = [
  {
    name: 'rocket_launch',
    title: 'Closing Deals',
    description: 'Every transaction has its complexities, and I\'m here to simplify that process. My expertise lies in ensuring that every deal is closed efficiently, with all parties feeling satisfied.',
  },
  {
    name: 'devices',
    title: 'Partnering on Deals',
    description: 'For those looking to collaborate, I\'m always open to partnering on deals. Leveraging our combined strengths, we can explore lucrative opportunities together.',
  },
  {
    name: 'account_balance',
    title: 'Transactional Lending',
    description: 'Financing is a crucial part of any real estate transaction. I offer transactional lending services, ensuring that funds flow seamlessly, keeping deals on track.',
  },
  {
    name: 'attach_money',
    title: 'Property Acquisition for Investors',
    description: 'Investors looking to expand their portfolio can benefit from my expertise. I assist in sourcing and adding valuable properties to their inventory, ensuring they\'re positioned for long-term growth.',
  },
];

  </script>