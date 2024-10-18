<script setup>
import { computed, onMounted, ref } from 'vue';
import { productsRepository } from '../lib/ProducsRepository.mjs';
import Loader from '../components/Loader.vue';
import ProductCard from '../components/ProductCard.vue';
import AddIcon from '../components/icons/AddIcon.vue';
import MinusIcon from '../components/icons/MinusIcon.vue';


const loading = ref(true)
const products = ref([])
const productsSelecteds = ref(new Map())
const productSelectId = ref(-1)


onMounted(() => {
    productsRepository.getAll()
        .then(res => {
            res.handle({
                onSuccess: data => products.value = data,
                onFailure: err => alert('Error al recuperar los productos'),
                onFinally: () => loading.value = false
            })
        })
})

const addedProductList = computed(() => {
    return Array.from(productsSelecteds.value.entries())
        .map(([productId, quantity]) => {
            const product = products.value.find(p => p.id === productId) ?? { name: '', price: 0 }
            return {
                id: product.id,
                name: product.name,
                quantity: quantity,
                total: ((product.price * 100) * quantity) / 100
            }
        })
})


const addProduct = (product) => {
    const actualQuantity = productsSelecteds.value.get(product.id) ?? 0
    productsSelecteds.value.set(product.id, actualQuantity + 1)
}

const deleteProduct = (product) => {
    if (!productsSelecteds.value.has(product.id)) {
        return
    }
    const actualQuantity = productsSelecteds.value.get(product.id)
    if (actualQuantity === 1) {
        productsSelecteds.value.delete(product.id)
        return
    }
    productsSelecteds.value.set(product.id, actualQuantity - 1)
}


const handleAddProduct = () => {
    if (productSelectId.value === -1) return

    const product = products.value.find(p => p.id === productSelectId.value)
    if (product)
        addProduct(product)
}

const handleDeleteProduct = () => {
    if (productSelectId.value === -1) return

    const product = products.value.find(p => p.id === productSelectId.value)
    if (product)
        deleteProduct(product)
}

const handleSelectProduct = (product) => {
    if (product.id === productSelectId.value) {
        productSelectId.value = -1
        return
    }
    productSelectId.value = product.id
}

const handleCharge = () => {
    
}

</script>



<template>
    <Loader :loading="loading" />
    <div class="grid grid-cols-12 h-full">
        <section class="h-full col-span-8 grid grid-cols-3 auto-rows-min gap-3 p-2">
            <ProductCard v-for="product in products" :key="product.id" class="col-span-1 min-w-24 h-32"
                :product="product" @click="() => addProduct(product)">
            </ProductCard>
        </section>

        <section class="col-span-4 flex flex-col border-l bg-gray-300">
            <div class="flex-1 w-full overflow-auto">

                <table class="w-full">
                    <thead class="bg-orange-300">
                        <tr>
                            <th class="px-4 py-2">PRODUCTO</th>
                            <th class="px-4 py-2">CANTIDAD</th>
                            <th class="px-4 py-2">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="() => handleSelectProduct(product)"
                            :class="`${product.id === productSelectId ? 'bg-blue-400 hover:bg-blue-600' : 'hover:bg-gray-400'} cursor-pointer transition-colors`"
                            v-for="product in addedProductList" :key="product.id">
                            <td class="text-start px-2">{{ product.name }}</td>
                            <td class="text-end px-4">{{ product.quantity }}</td>
                            <td class="text-end px-2">{{ product.total }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <section class="grid grid-cols-4 gap-1 p-1">
                <button class="border rounded-xl px-4 py-2 bg-blue-400 text-center flex items-center justify-center hover:bg-blue-500 transition-colors"
                    @click="handleAddProduct">
                    <AddIcon class="w-8 h-auto" />
                </button>
                <button class="border rounded-xl px-4 py-2 bg-blue-400 text-center flex items-center justify-center hover:bg-blue-500 transition-colors"
                    @click="handleDeleteProduct">
                    <MinusIcon class="w-8 h-auto" />
                </button>
                <button 
                class="col-span-2 bg-orange-400 rounded-2xl transition-colors hover:bg-orange-500 font-bold text-md uppercase">Cobrar</button>
            </section>
        </section>
    </div>

</template>
