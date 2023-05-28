<template>
<section v-if="showCookie" class="fixed max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-gray-800 left-12 bottom-16 dark:border-gray-700 rounded-2xl">
    <h2 class="font-semibold text-gray-800 dark:text-white">🍪 Мы используем файлы cookie!</h2>

    <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">Привет, этот веб-сайт использует основные файлы cookie для обеспечения его правильной работы и отслеживания файлов cookie, чтобы понять, как вы взаимодействуете с ним. Последний будет установлен только после согласия. <a href="#" class="font-medium text-gray-700 underline transition-colors duration-300 dark:hover:text-blue-400 dark:text-white hover:text-blue-500">Пользовательское соглашение.</a>. </p>

    
    <div class="grid grid-cols-1 gap-4 mt-4 shrink-0">
        <button @click="setCookies()" class="w-full text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
            Я согласен
        </button>
    </div>
</section>
</template>
<script setup>
import {onMounted, ref} from "vue";

const showCookie = ref(false);
const storage = localStorage.getItem('cookie');
const cookieSet = () => {
  showCookie.value = storage !== 'allow';
}
const setCookies = () => {
  localStorage.setItem('cookie', 'allow');
  showCookie.value = false;
}
onMounted(() => {
  cookieSet();
})
</script>