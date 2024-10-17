<script setup>
import { onMounted, ref, watch } from 'vue';


const products = ref([])
const loading = ref(true)

onMounted(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
        .then((res) => res.json())
        .then(result => {
            products.value = result
            loading.value = false
        })
})


</script>

<template>
    <div v-if="loading" class="flex items-center w-full h-full justify-center text-xl font-bold">Cargando...</div>
    <div v-else class="w-full h-full flex flex-col p-4">
        <section class="flex w-full justify-end">
            <button class="border rounded-xl mb-1 mr-1 border-gray-400 px-2 py-1 bg-blue-400 transition-colors duration-300 hover:bg-blue-500">Agregar producto</button>
        </section>
        <div class="w-full rounded-xl flex-1 overflow-auto border-2 border-gray-400">
            <table class="w-full">
                <thead class="bg-orange-300">
                    <tr>
                        <th class="px-4 py-2">NOMBRE</th>
                        <th class="px-4 py-2">PRECIO</th>
                        <th class="px-4 py-2">STOCK</th>
                        <th class="px-4 py-2">CATEGORÍA</th>
                        <th class="px-4 py-2">ÚLTIMA ACTUALIZACIÓN</th>
                        <th class="px-4 py-2">EDICIÓN</th>
                    </tr>
                </thead>
                <tbody v-for="product in products" :key="product.id">
                    <tr>
                        <td class="text-center">{{ product.name }}</td>
                        <td class="text-center">{{ product.price }}</td>
                        <td class="text-center">{{ product.stock }}</td>
                        <td class="text-center">{{ product.category }}</td>
                        <td class="text-center">{{ product.updateAt }}</td>
                        <td>BOTON</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>