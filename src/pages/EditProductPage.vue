<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import TextField from '../components/TextField.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { productsRepository } from '../lib/ProducsRepository.mjs';

defineProps(['productId'])

const product = ref(null)
const router = useRouter()
const loading = ref(false)

onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if(urlParams.has('productId')){
        
        const productId = urlParams.get('productId')
        loading.value = true

        productsRepository.getById({ id: productId })
            .then(res => {
                res.handle({
                    onSuccess: (data) => product.value = data,
                    onFailure: (error) => alert(`Error al intentar recuperar el producto: ${error}`),
                    onFinally: () => loading.value = false
                })
            })
        
    }
})

const redirect = () => {
    router.push({ path: '/products' })
}

const normalizeProduct = ({ name, price, category, stock }) => {
    return {
        name,
        price: Number(price),
        category,
        stock: Number(stock)
    }
}

const saveProduct = ({ normalizedProduct }) => {
    productsRepository.create({ product: normalizedProduct})
        .then(res => {
            res.handle({
                onSuccess: () => redirect(),
                onFailure: (er) => alert(er),
                onFinally: () => loading.value = false
            })
        })
}

const updateProduct = ({ normalizedProduct }) => {
    const productToUpdate = {
        ...normalizedProduct,
        id: product.value.id
    }
    productsRepository.update({ product: productToUpdate})
        .then(res => {
            res.handle({
                onSuccess: () => redirect(),
                onFailure: (er) => alert(er),
                onFinally: () => loading.value = false
            })
        })
}

const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const entries = Object.fromEntries(formData.entries())

    const normalizedProduct = normalizeProduct({ name: entries.name, price: entries.price, category: entries.category, stock: entries.stock })
    if (!product.value) 
        saveProduct({ normalizedProduct })

    else 
        updateProduct({ normalizedProduct })
    
}

</script>

<template>
    <h3 v-if="loading" class="w-full h-full flex items-center justify-center font-bold">Cargando...</h3>
    <section v-else @submit="handleSubmit" class="w-full h-full flex flex-col items-center gap-2 px-4">
        <h1 class="mt-6 text-2xl font-bold uppercase">Edita un producto</h1>
        <form
            class="mx-auto w-full flex flex-col gap-2 p-4 max-w-5xl border-2 bg-orange-300 rounded-2xl overflow-hidden shadow-lg">
            <TextField type="text" label="Nombre:" name="name" required :defaultValue="product ? product.name : ''" min="5"></TextField>
            <TextField type="number" label="Precio:" name="price" required :defaultValue="product ? product.price : 0" min="0"></TextField>
            <TextField type="text" label="Categoria:" name="category" required :defaultValue="product ? product.category : ''" min="5"></TextField>
            <TextField type="number" label="Stock:" name="stock" required :defaultValue="product ? product.stock : 0"></TextField>

            <footer class="flex justify-end px-3">
                <button
                    class="shadow-md bg-green-500 px-4 py-1 rounded-xl border border-black text-lg transition-colors duration-300 hover:bg-green-600">Guardar</button>
            </footer>
        </form>
    </section>
</template>