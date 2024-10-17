<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <header class="w-full min-h-14 bg-orange-400 flex items-center px-4 py-2">
        <nav class="h-full">
            <ul class="flex flex-row gap-4 text-2xl uppercase font-semibold items-center h-full">
                <li class="transition-all duration-300 hover:scale-105">
                    <RouterLink to='/products'>Productos</RouterLink>
                </li>
                <li class="transition-all duration-300 hover:scale-105">
                    <RouterLink to="/sales">Ventas</RouterLink>
                </li>
            </ul>
        </nav>
    </header>

</template>