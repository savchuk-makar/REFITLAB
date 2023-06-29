<template>
  <section class="bg-white dark:bg-gray-900 h-screen">
    <div class="container px-6 py-12 mx-auto">
        <div>
            <h1 class="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Наши контакты</h1>
        </div>

        <div class="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
            <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">


                <div>
                    <span class="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                    </span>
                    
                    <h2 class="mt-4 text-base font-medium text-gray-800 dark:text-white">Мы находимся по адресу:</h2>
                    <p class="mt-2 text-sm text-blue-500 dark:text-blue-400">г.Сочи ул.Бытха 46/1 </p>
                </div>

                <div>
                    <span class="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                    </span>
                    
                    <h2 class="mt-4 text-base font-medium text-gray-800 dark:text-white">Телефон для связи:</h2>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Предварительная запись по телефону</p>
                    <p class="mt-2 text-sm text-blue-500 dark:text-blue-400">+7(999)651-51-00</p>
                </div>
            </div>

            <div class="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto maps">
              <yandex-map v-if="true"
                  :coords="coords"
                  :zoom="12"
              >
                <ymap-marker
                    :coords="coords"
                    marker-id="123"
                    hint-content="test"
                />
              </yandex-map>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
const coords = [43.565612, 39.769073]
</script>

<style>
.ymap-container {
  height: 100%;
  width: 100%;
}
</style>