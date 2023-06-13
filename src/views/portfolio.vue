<template>
  <div class="relative dark:bg-gray-900 pt-16  px-4 sm:px-6 lg:pt-24  lg:px-8">
  <div class="absolute inset-0">
    <div class="dark:bg-gray-900 h-1/3 sm:h-2/3"></div>
  </div>
  <div class="relative max-w-7xl mx-auto">
    <div class="text-center">
      <h2 class="text-3xl tracking-tight font-extrabold dark:text-white sm:text-4xl">Наши работы</h2>   
      <p class="mt-3 mx-auto text-xl dark:text-white sm:mt-4">Наши работы бля бля бля... хуй знает что сюда.</p>
    </div>

<!-- component -->
<div class="relative min-h-screen flex flex-col items-center justify-center "> 
<picture-swipe :items="images"></picture-swipe>
</div>
  </div>
</div>
</template>



<script setup>
import ButtonBtn1 from "@/components/button-btn-1.vue";
import PictureSwipe from 'vue3-picture-swipe';
</script>
