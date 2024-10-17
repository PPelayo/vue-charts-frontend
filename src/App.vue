<script setup>
import { RouterView } from 'vue-router';
import CustomHeader from './components/CustomHeader.vue';


</script>

<template>
  <div>
    <CustomHeader/>
    <main>
      <RouterView/>
    </main>
  </div>
</template>