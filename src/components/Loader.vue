<script setup>

defineProps(['loading'])

</script>

<template>

<div v-if="loading" class="w-full h-full text-2xl font-bold flex items-center justify-center">Cargando...</div>
<template v-else><slot/></template>

</template>