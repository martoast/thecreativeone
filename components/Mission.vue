<template>
    <div>
        <!-- Content section -->
    <div class="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
          <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p class="text-xl leading-8 text-gray-600">Our mission is to empower real estate enthusiasts with the tools and resources they need to achieve their investment goals. We strive to provide exceptional service, valuable insights, and reliable support to help you navigate the real estate market with confidence and success.</p>
              <div class="mt-10 max-w-xl text-base leading-7 text-gray-700">
                <p>We believe in building lasting relationships based on trust, transparency, and mutual success. By offering personalized services and tailored solutions, we aim to help you navigate the complexities of the real estate market with confidence. Whether you're a seasoned investor or just starting out, our mission is to empower you to reach new heights in your real estate journey.</p>
                
              </div>
            </div>
            <div class="lg:flex lg:flex-auto lg:justify-center">
              <dl class="w-64 space-y-8 xl:w-80">
                <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse gap-y-4">
                  <dt class="text-base leading-7 text-gray-600">{{ stat.label }}</dt>
                  <dd class="text-5xl font-semibold tracking-tight text-gray-900">{{ stat.value }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="aspect-[5/2] w-full object-cover xl:rounded-3xl" />
      </div>
    </div>
</template>

<script setup>

const stats = [
  { label: 'Properties evaluated annually', value: '2,500+' },
  { label: 'Total investment deals closed', value: '$150 million' },
  { label: 'New clients annually', value: '1,200+' },
];


</script>