<template>
  <div>
    <Disclosure as="nav" class="bg-white shadow z-50" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="-ml-2 mr-2 flex items-center md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div class="flex flex-shrink-0 items-center">
              <a href="/" class="m-0 p-0">
                <img class="layout_logo" src="https://app.customesignature.com/upload/signature/complete/1056/1056.gif" width="45">
              </a>
            </div>
            <div class="hidden md:ml-6 md:flex md:space-x-8">
              <NuxtLink
                to="/"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Home</NuxtLink>
              <NuxtLink
                to="/listings"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/listings'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/listings')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Listings</NuxtLink>
              <NuxtLink
                to="/send-me-a-lead"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/send-me-a-lead'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/send-me-a-lead')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Send me a lead</NuxtLink>
              <NuxtLink
                to="/get-funded"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/get-funded'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/get-funded')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Get funded</NuxtLink>
              <NuxtLink
                to="/get-on-my-investors-list"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/get-on-my-investors-list'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/get-on-my-investors-list')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Get on my investors list</NuxtLink>
            </div>
          </div>
          <div v-if="!isActiveRoute('/realty-radar')" class="flex items-center">
            <div class="flex-shrink-0">
              <button @click="handleNavigation" type="button" class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Search address
              </button>
            </div>
            
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 pb-3 pt-2">
          <DisclosureButton as="a" href="/" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Home</DisclosureButton>
          <DisclosureButton as="a" href="/listings" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/listings'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/listings')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Listings</DisclosureButton>
          <DisclosureButton as="a" href="/contact" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/contact'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/contact')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Contact</DisclosureButton>
        </div>
        
      </DisclosurePanel>
    </Disclosure>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/20/solid'

const router = useRouter()
const isActiveRoute = (route) => {
  const currentPath = router.currentRoute.value.path;
  const routePattern = new RegExp(`^${route}(\/|$)`);
  return routePattern.test(currentPath);
};

const handleNavigation = async () => {
  await navigateTo('/realty-radar')
}

</script>

<style scoped>
/* Add any additional styles here */
</style>
