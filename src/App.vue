<template>
  <div>
    <Header />
    <RouterView/>
    <Footer />
  </div>
</template>

<script  setup lang="ts">
import { ref, provide } from "vue";
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';


const showContactModal = ref(false);
provide('showContactModal', showContactModal);
</script>xw