<template>
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="relative z-10" @close="closeModal">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                    <ShareIcon class="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Share Property</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Share this property with others!</p>
                    </div>
                  </div>
                </div>
                <div class="mt-6 grid grid-flow-row-dense">
                  <button
                    type="button"
                    class="mb-3 inline-flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click="shareOnFacebook"
                  >
                  <svg class="h-5 w-5 mx-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
                  </svg>
                  Share on Facebook
                  
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click="copyLink"
                  >
                    <ClipboardIcon class="h-5 w-5 mr-2" aria-hidden="true" />
                    Copy Link
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
  import { ShareIcon, ClipboardIcon } from '@heroicons/vue/24/outline';
  
  const props = defineProps({
    isOpen: Boolean,
    property: Object,
  });

  const route = useRoute();
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };

  const getCurrentUrl = () => {
  const baseUrl = 'https://www.thecreativeone.io';
  // Simply use the route.fullPath as is since it already has the correct structure
  return `${baseUrl}${route.fullPath}`;
};
  
const copyLink = async () => {
  const url = getCurrentUrl();
  try {
    await navigator.clipboard.writeText(url);
    console.log('Link copied to clipboard:', url);
    // You might want to show a success message to the user here
  } catch (err) {
    console.error('Failed to copy link:', err);
    // You might want to show an error message to the user here
  }
  closeModal();
};
  
  const shareOnFacebook = () => {
    const url = encodeURIComponent(getCurrentUrl());
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookShareUrl, '_blank');
    closeModal();
  };
  </script>