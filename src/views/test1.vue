<template>
  <section class="py-10 dark:bg-gray-900">
  <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <a href="#">
        <div class="relative flex items-end overflow-hidden rounded-xl">
          <img class="h-48 w-full object-cover" src="@/assets/images/7.png" alt="">
        </div>

        <div class="mt-1 p-2">
          <h2 class="text-slate-700">Герметизация фар</h2>
          <p class="mt-1 text-sm text-slate-400">Профессионально устраняем запотевание фар.</p>

          <div class="mt-3 flex items-end justify-between">
            <button class="btn-1">Button</button>
          </div>
        </div>
      </a>
    </article>
    <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <a href="#">
        <div class="relative flex items-end overflow-hidden rounded-xl">
          <img class="h-48 w-full object-cover" src="@/assets/images/10.png" alt="">
        </div>

        <div class="mt-1 p-2">
          <h2 class="text-slate-700">Ремонт корпусов фар</h2>
          <p class="mt-1 text-sm text-slate-400">Выполняем ремонт трещин на корпусах фар (ремонт креплений).</p>

          <div class="mt-3 flex items-end justify-between">
            <button class="btn-1">Button</button>
          </div>
        </div>
      </a>
    </article>

    <!-- Rest of the code... -->

  </div>
</section>

</template>


<script setup>
import ButtonBtn1 from "@/components/button-btn-1.vue";
</script>