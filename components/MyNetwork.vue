<template>
  <div class="mt-32 overflow-hidden sm:mt-40">
    <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
        <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Real Success Stories</h2>
          <p class="mt-6 text-xl leading-8 text-gray-600">
            Our community is thriving with individuals who have transformed their lives through Real Estate. These success stories prove that our methods work for anyone willing to take action.
          </p>
          <p class="mt-6 text-base leading-7 text-gray-600">
            From experienced professionals to complete beginners, our members have achieved remarkable results. By following our step-by-step guidance, they've built impressive rental portfolios, mastered wholesaling, and created substantial passive income streams. These images showcase just a few of the many success stories within our community.
          </p>
          <div class="mt-8 flex pt-3">
            <a href="https://www.skool.com/creative-rei-2630/about" class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Join now <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>

        <!-- Mobile-friendly image layout (visible on small screens) -->
        <div class="lg:hidden">
          <div class="space-y-2">
            <img v-for="feature in features.slice(0, 2)" :key="feature.name" :src="feature.imageSrc" :alt="feature.imageAlt" class="w-full rounded-2xl bg-gray-50 object-cover" />
          </div>
        </div>


        <!-- Complex image layout (hidden on small screens, visible on large screens) -->
        <div class="hidden lg:contents">
          <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <img :src="features[0].imageSrc" :alt="features[0].imageAlt" class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
            </div>
            <div class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
              <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                <img :src="features[1].imageSrc" :alt="features[1].imageAlt" class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
              </div>
              <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                <img :src="features[2].imageSrc" :alt="features[2].imageAlt" class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
              </div>
              <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                <img :src="features[3].imageSrc" :alt="features[3].imageAlt" class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  {
    name: 'Main sleeve',
    description: 'Our flagship laptop sleeve, designed for maximum protection and style.',
    imageSrc: '/group7.jpg',
    imageAlt: 'Main laptop sleeve showcasing overall design',
  },
  {
    name: 'Minimal and thoughtful',
    description: 'Compact design that precisely fits 13" devices with easy access and storage.',
    imageSrc: '/group6.jpg',
    imageAlt: 'Compact laptop sleeve with front pouch',
  },
  {
    name: 'Refined details',
    description: 'High-quality materials and finishes for durability and aesthetic appeal.',
    imageSrc: '/group8.jpg',
    imageAlt: 'Close-up of laptop sleeve showing material and zipper details',
  },
  {
    name: 'Color variety',
    description: 'Available in a range of colors to suit your personal style.',
    imageSrc: '/group6.jpg',
    imageAlt: 'Various color options for laptop sleeves',
  },
];
</script>