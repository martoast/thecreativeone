<template>
  <div>
    <Disclosure as="nav" class="bg-white shadow z-50" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="-ml-2 mr-2 flex items-center md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton id="hambuger-menu-btn" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                to="/send-me-a-lead/steps/0"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/send-me-a-lead'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/send-me-a-lead')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Send me a lead</NuxtLink>
              <NuxtLink
                to="/get-funded"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/get-funded'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/get-funded')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Get funding</NuxtLink>
              <NuxtLink
                to="/get-on-my-investors-list"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/get-on-my-investors-list'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/get-on-my-investors-list')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Get on my investors list</NuxtLink>
              <NuxtLink
                to="/land"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/land'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/land')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Land Sale</NuxtLink>
              <NuxtLink
                to="/walk"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/walk'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/walk')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >Walk Property</NuxtLink>
              <NuxtLink
                to="/jv"
                :class="{'border-indigo-500 text-gray-900': isActiveRoute('/jv'), 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActiveRoute('/jv')}"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              >JV</NuxtLink>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <button @click="handleNavigation" type="button" class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <MagnifyingGlassIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Checkout PropQuest.ai
              </button>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 pb-3 pt-2">
          <DisclosureButton as="a" href="/" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Home</DisclosureButton>
          <DisclosureButton as="a" href="/listings" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/listings'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/listings')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Listings</DisclosureButton>
          <DisclosureButton as="a" href="/send-me-a-lead/steps/0" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/send-me-a-lead'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/send-me-a-lead')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Send me a lead</DisclosureButton>
          <DisclosureButton as="a" href="/get-funded" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/get-funded'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/get-funded')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Get funding</DisclosureButton>
          <DisclosureButton as="a" href="/get-on-my-investors-list" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/get-on-my-investors-list'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/get-on-my-investors-list')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Get on my investors list</DisclosureButton>
          <DisclosureButton as="a" href="/land" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/land'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/land')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Land Sale</DisclosureButton>
          <DisclosureButton as="a" href="/walk" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/walk'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/walk')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">Walk Property</DisclosureButton>
          <DisclosureButton as="a" href="/jv" :class="{'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700': isActiveRoute('/jv'), 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700': !isActiveRoute('/jv')}" class="block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6">JV</DisclosureButton>

        </div>
      </DisclosurePanel>
    </Disclosure>
    <slot />
    <Footer/>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const router = useRouter()

const isActiveRoute = (route) => {
  const currentPath = router.currentRoute.value.path;
  
  // Special case for home route
  if (route === '/' && currentPath === '/') {
    return true;
  }
  
  // For other routes, check if the current path starts with the given route
  return currentPath.startsWith(route) && (currentPath === route || currentPath.charAt(route.length) === '/');
};

const handleNavigation = () => {
  window.location.href = 'https://propquest.ai/'
}
</script>