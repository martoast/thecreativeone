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
    title: 'Maximizing Your Real Estate Investments: Tips and Strategies',
    href: '#',
    description:
      'Discover proven strategies to enhance your real estate investment portfolio. From identifying high-potential properties to effective management practices, learn how to maximize your returns.',
    imageUrl:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=3600&q=80',
    date: 'June 1, 2024',
    datetime: '2024-06-01',
    author: {
      name: 'Esteban Ibarra',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'How to Secure Funding for Your Deals',
    href: '#',
    description:
      'Learn about the various funding options available for real estate investors. Understand the pros and cons of each method and find the best fit for your next project.',
    imageUrl:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
    date: 'June 15, 2024',
    datetime: '2024-06-15',
    author: {
      name: 'Esteban Ibarra',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'The Importance of Due Diligence in Real Estate Transactions',
    href: '#',
    description:
      'Due diligence is a critical step in any real estate transaction. Learn about the essential checks and balances to ensure you make informed and profitable investment decisions.',
    imageUrl:
      'https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-1.2.1&auto=format&fit=crop&w=3600&q=80',
    date: 'July 1, 2024',
    datetime: '2024-07-01',
    author: {
      name: 'Esteban Ibarra',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
  },
  // More posts...
];


</script>