<template>

    <button @click="showModal = true" type="button" data-modal-target="crypto-modal" data-modal-toggle="crypto-modal" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      Записаться
    </button>
  
</template>
<script setup lang="ts">
  import { inject } from 'vue'
  const showModal = inject('showContactModal')
</script>
  


  