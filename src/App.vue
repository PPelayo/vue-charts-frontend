<script setup>
import { RouterView } from 'vue-router';
import CustomHeader from './components/Headers/CustomHeader.vue';


</script>

<template>
  <!-- <div class="flex flex-col flex-1 flex-nowrap"> -->
    <CustomHeader/>
    <main class="overflow-hidden flex flex-1">
      <RouterView/>
    </main>
  <!-- </div> -->
</template>