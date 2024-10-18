<script setup>
import { onMounted, ref, watch } from 'vue';
import EditIcon from '../components/icons/EditIcon.vue';
import DeleteIcon from '../components/icons/DeleteIcon.vue';
import { RouterLink } from 'vue-router';
import { productsRepository } from '../lib/ProducsRepository.mjs';

const products = ref([])
const loading = ref(true)

onMounted(() => {
    downloadData()
})

const downloadData = () => {
    productsRepository.getAll()
    .then(result => {
        result.handle({
            onSuccess: (data) => products.value = data,
            onFailure: (error) => alert(error),
            onFinally: () => loading.value = false
        })
    })
}

const handleDelete = ({ productId }) => {
    productsRepository.delete({ id: productId })
        .then(res => {
            res.handle({
                onSuccess: () => downloadData(),
                onFailure: () => alert('Error al intentar eliminar el registro')
            })
        })
}

</script>

<template>
    <div v-if="loading" class="flex items-center w-full h-full justify-center text-xl font-bold">Cargando...</div>
    <div v-else class="w-full h-full flex flex-col p-4">
        <section class="flex w-full justify-end">
            <RouterLink to="/products/edit"
                class="border rounded-xl mb-1 mr-1 border-gray-400 px-2 py-1 bg-blue-400 transition-colors duration-300 hover:bg-blue-500">
                Agregar producto</RouterLink>
        </section>
        <div class="w-full rounded-xl flex-1 overflow-auto border-2 border-gray-400">
            <table class="w-full">
                <thead class="bg-orange-300">
                    <tr>
                        <th class="px-4 py-2">NOMBRE</th>
                        <th class="px-4 py-2">PRECIO</th>
                        <th class="px-4 py-2">STOCK</th>
                        <th class="px-4 py-2">CATEGORÍA</th>
                        <th class="px-4 py-2">EDICIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td class="text-center">{{ product.name }}</td>
                        <td class="text-center">{{ Number.parseFloat(product.price).toFixed(2) }}</td>
                        <td class="text-center">{{ Number.parseFloat(product.stock).toFixed(2) }}</td>
                        <td class="text-center">{{ product.category }}</td>
                        <td class="text-center">
                            <div class="flex flex-row justify-center items-center gap-2">
                                <RouterLink :to="`/products/edit?productId=${product.id}`">
                                    <EditIcon class="text-black w-8 h-auto hover:text-orange-500 transition-colors" />
                                </RouterLink>
                                <button @click="() => handleDelete({ productId: product.id })">
                                    <DeleteIcon class="text-black w-8 h-auto hover:text-red-500 transition-colors" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>