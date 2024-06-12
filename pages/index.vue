<template>
  <div>
    <Hero/>
    <Mission/>
    <Testimonial/>
    <!-- <LogoCloud/> -->
    <Features/>

    <div class="bg-white py-18 sm:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Listings</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
            <div class="mt-10 flex items-center gap-x-6">
        <a href="/listings" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">View more</a>
      </div>
        </div>
          
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          
            <Listings :properties="properties" />
         
        </div>
      </div>
    </div>
    
    <Community/>
    
    <div class="bg-white py-18 sm:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Work with us</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">Whether you're selling a property, looking for the next investment opportunity, or need funding for your real estate projects, we've got you covered. Explore our services to get started on your next venture with ease and confidence.</p>
        </div>
          
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


    
    
    
    

    <ContactForm/>
    
    <Footer/>
  </div>
    
  </template>


  
  <script setup>
    import { PaperAirplaneIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'
    import { usePropertiesStore } from '~/store/DataStore'

    definePageMeta({
        layout: 'main'
    });

    const features = [
    {
        name: 'Send Me a Lead',
        description: 'Have a Property for Sale? I\'m buying. Submit your property details below for immediate consideration.',
        href: '/contact',
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

    const store = usePropertiesStore()
  
  const currentPage = ref(1)
  const itemsPerPage = 3 // Change this to the number of items you want per page
  const showSold = ref(null)
  
  const { data, pending, error, refresh } = await useAsyncData(
    'properties',
    () => store.get(currentPage.value, itemsPerPage, showSold.value)
  )
  
  
  const properties = computed(() => store.properties.map(property => ({
    ...property,
    images: property.images.length ? JSON.parse(property.images) : '[]' // Assuming 'images' is a JSON string of URLs
  })))
    </script>
