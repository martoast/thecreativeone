<template>
    <div class="bg-white py-18 sm:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">I Buy and Share the Best Deals in Real Estate</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">Leveraging creative finance strategies, I help you find and secure top real estate opportunities. Whether you're looking to sell, invest, or get funded, I'm here to guide you through the process with expert advice and tailored solutions.</p>
        </div>

        <!-- <CustomGoogleMap
            :libraries="['places']"
            :center="{ lat: 40.712776, lng: -74.005974 }"
            :zoom="10"
            height="500px"
          /> -->
          
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div v-for="feature in features" :key="feature.name" class="flex flex-col">
              <dt class="text-base font-semibold leading-7 text-gray-900">
                <div class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                {{ feature.name }}
              </dt>
              <dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ feature.description }}</p>
                <p class="mt-6">
                  <a :href="feature.href" class="text-sm font-semibold leading-6 text-indigo-600">Learn more <span aria-hidden="true">→</span></a>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { PaperAirplaneIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'

    definePageMeta({
        layout: 'main'
    });

    const features = [
    {
        name: 'Send Me a Lead',
        description: 'Have a Property for Sale? I\'m buying. Submit your property details below for immediate consideration.',
        href: '/send-me-a-lead',
        icon: PaperAirplaneIcon,
    },
    {
        name: "Get On My Investor's List",
        description: 'Your next investment opportunity is a click away! Sign up for exclusive access to low-cost, high-return properties.',
        href: '/get-on-my-investors-list',
        icon: UserGroupIcon,
    },
    {
        name: 'Get Funded',
        description: 'Quick and easy funding for your next real estate investment.',
        href: '/get-funded',
        icon: CurrencyDollarIcon,
    },
    ]
    </script>
