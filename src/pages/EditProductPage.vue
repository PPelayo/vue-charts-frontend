<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import TextField from '../components/TextField.vue';
import axios from 'axios';

defineProps(['productId'])

const product = ref(null)
const saveSuccess = ref(false)

watchEffect(() => {
    if(saveSuccess.value){
        
    }
})

function handleSubmit(e){
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const entries = Object.fromEntries(formData.entries())
    console.log(entries);

    if(!product.value){
        //crear
        try{
            axios.post(`${import.meta.env.VITE_API_URL}/products`, {
                name: entries.name,
                price : Number(entries.price),
                category: entries.category,
                stock: Number(entries.stock)
            })
            .then(() => {
                saveSuccess.value = true
                alert('Producto guardado correctamente')
            })
            
        } catch(e){
            alert('Error al guardar el producto', e.message)
        }
    }
        
}

</script>

<template>
    <section @submit="handleSubmit" class="w-full h-full flex flex-col items-center gap-2 px-4">
        <h1 class="mt-6 text-2xl font-bold uppercase">Edita un producto</h1>
        <form class="mx-auto w-full flex flex-col gap-2 p-4 max-w-5xl border-2 bg-orange-300 rounded-2xl overflow-hidden shadow-lg">
            <TextField type="text" label="Nombre:" name="name" required></TextField>
            <TextField type="number" label="Precio:" name="price" required></TextField>
            <TextField type="text" label="Categoria:" name="category" required></TextField>
            <TextField type="number" label="Stock:" name="stock" required></TextField>

            <footer class="flex justify-end">
                <button class="shadow-md bg-green-500 px-4 py-1 rounded-xl border border-black text-lg transition-colors duration-300 hover:bg-green-600" >Guardar</button>
            </footer>
        </form>
    </section>
</template>