<script setup>
import { RouterView } from 'vue-router';
import CustomHeader from './components/CustomHeader.vue';


</script>

<template>
  <div class="h-full flex flex-col">
    <CustomHeader/>
    <main class="flex-1">
      <RouterView/>
    </main>
  </div>
</template>