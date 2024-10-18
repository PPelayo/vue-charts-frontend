<script setup>
import axios from 'axios';

import { onMounted } from 'vue';


const loading = ref(true)

onMounted(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products`)
})

</script>



<template>

    <div class="grid grid-cols-12">
        <section class="col-span-8 bg-red-500">
            Lista productos
        </section>

        <section class="col-span-4 bg-blue-500">
            Tabla ventas
        </section>
    </div>    

</template>