<script setup>
defineProps(['product'])

</script>

<template>
    <article class="flex flex-col p-4 border border-blue-400 rounded-2xl items-center justify-center">
        <h5>{{ product.name }}</h5>
        <span>({{ Number(product.price).toFixed(2) }})</span>
    </article>
</template>