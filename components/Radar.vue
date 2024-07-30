<template>
    <div class="radar" :style="radarStyle">
      <div class="radar__dot"></div>
      <div class="radar__dot"></div>
      <div class="radar__dot"></div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    size: {
      type: String,
      default: '60vmin'
    },
    color: {
      type: String,
      default: 'rgb(80, 255, 0)'
    }
  });
  
  const radarStyle = computed(() => ({
    '--radar-size': props.size,
    '--radar-color': props.color
  }));
  </script>
  
  <style scoped>
  .radar {
    position: absolute;
    width: var(--radar-size, 60vmin);
    height: var(--radar-size, 60vmin);
    background: 
      repeating-radial-gradient(
        transparent,
        transparent 4.5%,
        var(--radar-color, rgba(80, 255, 0, 0.35)) 5%,
        transparent 5.5%
      ) content-box,
      linear-gradient(
        transparent 49.7%,
        var(--radar-color, rgba(80, 255, 0, 0.2)) 49.9%,
        var(--radar-color, rgba(80, 255, 0, 0.2)) 50.1%,
        transparent 50.3%
      ) content-box,
      linear-gradient(
        to right,
        transparent 49.7%,
        var(--radar-color, rgba(80, 255, 0, 0.2)) 49.9%,
        var(--radar-color, rgba(80, 255, 0, 0.2)) 50.1%,
        transparent 50.3%
      ) content-box,
      radial-gradient(#002500, #000500) content-box,
      linear-gradient(to bottom right, #ccc, #666) border-box;
    border: calc(var(--radar-size, 60vmin) * 0.0416) solid transparent;
    border-radius: 50%;
    box-sizing: border-box;
    overflow: hidden;
    filter: drop-shadow(calc(var(--radar-size, 60vmin) * 0.0166) calc(var(--radar-size, 60vmin) * 0.0166) calc(var(--radar-size, 60vmin) * 0.0166) rgba(0, 0, 0, 0.4));
  }
  
  .radar::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: conic-gradient(transparent 90%, var(--radar-color, rgba(80, 255, 0, 0.35)));
    border-radius: 50%;
    box-shadow: inset 0 0 calc(var(--radar-size, 60vmin) * 0.0333) rgba(0, 0, 0, 0.9);
    animation: spin 2s linear infinite;
  }
  
  .radar__dot {
    position: absolute;
    width: 3%;
    height: 3%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: blink 2s ease-out infinite;
  }
  
  .radar__dot:first-of-type {
    top: 24%;
    left: 76%;
    animation-delay: 0.25s;
  }
  
  .radar__dot:nth-of-type(2) {
    top: 80%;
    left: 20%;
    animation-delay: 1.25s;
  }
  
  .radar__dot:last-of-type {
    top: 36%;
    left: 36%;
    animation-delay: 1.75s;
  }
  
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
  
  @keyframes blink {
    2%, 20% {
      background-color: var(--radar-color, rgba(80, 255, 0, 0.85));
      box-shadow: 0 0 calc(var(--radar-size, 60vmin) * 0.0166) var(--radar-color, rgba(80, 255, 0, 0.6));
    }
    90% {
      background-color: transparent;
    }
  }
  </style>