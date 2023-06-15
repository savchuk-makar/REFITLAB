<template>
  <div class="relative dark:bg-gray-900 pt-16 px-4 sm:px-6 lg:pt-24 lg:px-8">
    <div class="absolute inset-0">
      <div class="dark:bg-gray-900 h-1/3 sm:h-2/3"></div>
    </div>
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-extrabold dark:text-white sm:text-4xl">
          Наши работы
        </h2>
        <p class="mt-3 mx-auto text-xl dark:text-white sm:mt-4">
          Наши работы бля бля бля... хуй знает что сюда.
        </p>
      </div>

      <!-- component -->
      <div class="relative min-h-screen flex flex-col items-center justify-center">
        <picture-swipe :items="images"></picture-swipe>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonBtn1 from "@/components/button-btn-1.vue";
import PictureSwipe from "vue3-picture-swipe";
import { onMounted, ref } from "vue";
const images = ref([]);

onMounted(() => {
  for (let i = 1; i <= 24; i++) {
    const element = {
      src: `/images/${i}.jpg`,
      thumbnail: `/images/${i}.jpg`,
      w: 1000,
      h: 1000,
      alt: "some numbers on a grey background", // optional alt attribute for thumbnail image
    };
    images.value.push(element);
  }
});
</script>
<style>
.my-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
