<template>
  <div>
    <!-- Content section -->
    <div ref="aboutSection" id="aboutSection" class="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About me</h2>
        <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
            <p class="text-xl leading-8 text-gray-600">
              Hi, I am Esteban Ibarra. For over a decade, I've been immersed in the real estate world, perfecting my skills in loans and lending, especially when it comes to reverse mortgages.
            </p>
            <div class="mt-10 max-w-xl text-base leading-7 text-gray-700">
              <p>
                I believe in building lasting relationships based on trust, transparency, and mutual success. By offering personalized services and tailored solutions, I aim to help you navigate the complexities of the real estate market with confidence. Whether you're a seasoned investor or just starting out, my mission is to empower you to reach new heights in your real estate journey.
              </p>
            </div>
          </div>
          <div class="lg:flex lg:flex-auto lg:justify-center">
            <dl class="w-full space-y-8 xl:w-80">
              <div v-for="stat in animatedStats" :key="stat.label" class="flex flex-col-reverse gap-y-4">
                <dt class="text-base leading-7 text-gray-600">{{ stat.label }}</dt>
                <dd class="text-5xl font-semibold tracking-tight text-gray-900">{{ stat.displayValue }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mt-32 sm:mt-40 mb-12 sm:mb-24 xl:mx-auto xl:max-w-7xl xl:px-8">
      <img src="https://green-junior-chickadee-977.mypinata.cloud/ipfs/QmSabPGPR2dFEZBAw4sLAfKVUQJcCxAugjctWqECPkZcKo" alt="" class="aspect-[5/2] w-full object-cover object-top xl:rounded-3xl" />
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stats = [
  { label: 'Doors Owned', value: 30, displayValue: '0+' },
  { label: 'Total investment deals closed', value: 50000000, displayValue: '0+' },
  { label: 'New clients annually', value: 100, displayValue: '0+' },
];

const animatedStats = ref(stats.map(stat => ({ ...stat })));

const animateCount = (targets, duration) => {
  targets.forEach((stat, index) => {
    const startValue = 0;
    const endValue = stat.value;
    const increment = endValue / (duration / 16); // 16ms per frame for 60fps

    let currentValue = startValue;

    const counter = () => {
      if (currentValue < endValue) {
        currentValue += increment;
        animatedStats.value[index].displayValue = formatValue(Math.min(Math.ceil(currentValue), endValue)) + '+';
        requestAnimationFrame(counter);
      } else {
        animatedStats.value[index].displayValue = formatValue(endValue) + '+';
      }
    };

    counter();
  });
};

const formatValue = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(0)} million`;
  }
  return value.toString();
};

const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.disconnect(); // Stop observing once the section is visible
      animateCount(stats, 2000); // Adjust the duration as needed
    }
  });
};

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.1,
  });

  const aboutSection = document.querySelector('#aboutSection');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
});
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
