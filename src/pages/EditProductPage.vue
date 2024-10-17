<script setup>
import TextField from '../components/TextField.vue';

defineProps(['productId'])


</script>

<template>
    <section class="w-full h-full flex flex-col items-center gap-2">
        <h1 class="mt-6 text-2xl font-bold uppercase">Edita un producto</h1>
        <form class="mx-auto w-full flex flex-col gap-2 p-4 max-w-5xl border-2 bg-orange-300 rounded-2xl overflow-hidden">
            <TextField type="text" label="Prueba:" name="name"></TextField>
            <TextField type="number" label="Prueba:" name="name"></TextField>
            <TextField type="text" label="Prueba:" name="name"></TextField>
            <TextField type="text" label="Prueba:" name="name"></TextField>
        </form>
    </section>
</template>