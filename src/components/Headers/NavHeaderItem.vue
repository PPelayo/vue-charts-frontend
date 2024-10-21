<script setup>
defineProps(['href'])

</script>

<template>
    <li class="transition-all duration-300 hover:scale-105">
        <RouterLink :to="href"><slot/></RouterLink>
    </li>
</template>