<script setup>
import { onMounted, ref } from 'vue';


    const products = ref([])

    onMounted(() => {
        fetch('')
    })

</script>

<template>
    <span class="bg-red-500 italic text-2xl">Hola</span>

</template>