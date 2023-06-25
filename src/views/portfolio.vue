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
        <p class="mt-3 mx-auto text-xl dark:text-white sm:mt-4 mb-8">
          Наши работы...
        </p>
      </div>

      <div class="relative min-h-screen flex flex-col items-center justify-center">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/1.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/2.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/3.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/4.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/5.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/6.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/7.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/8.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/9.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/10.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/11.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/12.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/13.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/14.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/15.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/16.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/17.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/18.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/19.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/20.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/21.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/22.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/23.jpg" alt="">
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="/images/24.jpg" alt="">
    </div>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const images = ref([]);

onMounted(() => {
  for (let i = 1; i <= 24; i++) {
    const element = {
      src: `/images/${i}.jpg`,
      alt: "some numbers on a grey background",
    };
    images.value.push(element);
  }
});

const openImage = (src) => {
  console.log("Открытие изображения:", src);
  // Здесь вы можете использовать библиотеки или компоненты для открытия фотографии в модальном окне
};
</script>

<style>
.my-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
