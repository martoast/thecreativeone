<template>
    <!-- Blog section -->
    <div class="mx-auto my-24 max-w-7xl px-6 sm:my-32 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">Stay updated with the latest insights and tips in real estate investment, financing, and property management.</p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="post in blogPosts" :key="post.id" class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
            <img :src="post.imageUrl" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

            <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <time :datetime="post.datetime" class="mr-8">{{ post.date }}</time>
              <div class="-ml-4 flex items-center gap-x-4">
                <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div class="flex gap-x-2.5">
                  <img :src="post.author.imageUrl" alt="" class="h-6 w-6 flex-none rounded-full bg-white/10" />
                  {{ post.author.name }}
                </div>
              </div>
            </div>
            <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
              <a :href="post.href">
                <span class="absolute inset-0" />
                {{ post.title }}
              </a>
            </h3>
          </article>
        </div>
      </div>
</template>

<script setup>

const blogPosts = [
  {
    id: 1,
    title: 'Assisted Living vs Nursing Homes: Which Is Best for Your Loved Ones?',
    href: 'https://www.harmonylivingcare.com/assisted-living-vs-nursing-homes-which-is-best-for-your-loved-ones',
    description:
      'When it comes to senior care options, assisted living and nursing homes are two common choices. Understanding the differences between the two can help individuals and families make informed decisions about the best care setting for their loved ones.',
    imageUrl:
      'https://www.harmonylivingcare.com/wp-content/uploads/2024/07/img4-2.jpg',
    date: 'June 1, 2024',
    datetime: '2024-06-01',
    author: {
      name: 'Esteban Ibarra',
      imageUrl:
        'https://storage.googleapis.com/msgsndr/6eHA3fFhXeHfBA3vyTQj/media/66a2a40936ef386fead947b3.jpeg',
    },
  },
  {
    id: 2,
    title: 'Essential Guide: Hassle-Free Sober Living Home Manager License Application',
    href: 'https://www.harmonylivingcare.com/essential-guide-hassle-free-sober-living-home-manager-license-application',
    description:
      'Are you considering starting a structured sober living home and need guidance on obtaining your manager license? This comprehensive guide will walk you through the application process, addressing specific requirements and procedures to help you successfully obtain your license.',
    imageUrl:
      'https://www.harmonylivingcare.com/wp-content/uploads/2024/07/img1-1.jpg',
    date: 'June 15, 2024',
    datetime: '2024-05-15',
    author: {
      name: 'Esteban Ibarra',
      imageUrl:
        'https://www.harmonylivingcare.com/essential-guide-hassle-free-sober-living-home-manager-license-application',
    },
  },
  {
    id: 3,
    title: 'Senior Care Showdown: Assisted Living vs Independent Living Explained',
    href: 'https://www.harmonylivingcare.com/senior-care-showdown-assisted-living-vs-independent-living-explained',
    description:
      'Are you or a loved one considering a move to a senior living community? This article will help you understand the differences between assisted living and independent living, providing valuable insights to help you make an informed decision.',
    imageUrl:
      'https://www.harmonylivingcare.com/wp-content/uploads/2024/07/img4-1.jpg',
    date: 'July 1, 2024',
    datetime: '2024-04-01',
    author: {
      name: 'Esteban Ibarra',
      imageUrl:
        'https://storage.googleapis.com/msgsndr/6eHA3fFhXeHfBA3vyTQj/media/66a2a40936ef386fead947b3.jpeg',
    },
  },
  // More posts...
];


</script>