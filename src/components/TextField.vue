<script setup>
defineProps(['name', 'label', 'type'])


</script>

<template>

    <label class="px-3 py-2 flex flex-row gap-4 rounded-xl items-center">
        <span class="font-bold">{{ label }}</span>
        <input class="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" :type="type" :name="name">
    </label>
</template>