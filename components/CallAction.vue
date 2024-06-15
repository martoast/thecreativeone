<template>
    <div class="bg-white py-24 sm:py-32">
      <div class="relative isolate">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
            <img class="absolute inset-0 h-full w-full object-cover object-top brightness-150 saturate-0" src="https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="" />
            <div class="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
            <div class="absolute -left-80 -top-56 transform-gpu blur-3xl" aria-hidden="true">
              <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
            </div>
            <div class="relative w-full flex-auto z-10">
              <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Elevate your real estate journey</h2>
              <p class="mt-6 text-lg leading-8 text-gray-300">Subscribe now to access exclusive courses, scripts, tools, daily insights, and a vibrant community hub.</p>
              <ul role="list" class="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2">
                <li v-for="benefit in benefits" :key="benefit" class="flex gap-x-3">
                  <CheckCircleIcon class="h-7 w-5 flex-none text-white" aria-hidden="true" />
                  {{ benefit }}
                </li>
              </ul>
              <div class="mt-10 flex">
                <a href="https://upgrade.chat/creative-rei" class="text-sm font-semibold leading-6 text-white">Subscribe now <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { CheckCircleIcon } from '@heroicons/vue/20/solid'
  
  const benefits = [
    'Dive into exclusive courses from basics to advanced strategies',
    'Master negotiations with proven scripts',
    'Make informed decisions with calculators',
    'Stay ahead with industry updates',
    'Connect, share, and grow with like-minded individuals',
  ]
  </script>
  