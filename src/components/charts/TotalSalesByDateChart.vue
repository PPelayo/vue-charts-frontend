<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { salesRepository } from '../../lib/repositories/SalesRepository.mjs';
import dayjs from 'dayjs';
import Loader from '../Loader.vue';

const loading = ref(false)
const totalsData = ref([])
const error = ref(null)

const startDate = ref(dayjs().add(-7, 'day'))
const endDate = ref(dayjs())

const fetchData = async ({ startDate, endDate }) => {
    loading.value = true
    const result = await salesRepository.getTotalsSalesByDate({ startDate, endDate })

    result.handle({
        onSuccess: (data) => totalsData.value = data,
        onFailure: (er) => error.value = er,
        onFinally: () => loading.value = false
    })
}

watchEffect(() => {
    fetchData({ startDate: startDate.value, endDate: endDate.value })
})

watchEffect(() => {
    console.log('Fetchet data', totalsData.value);
    
})
</script>


<template>
    <section class="w-full border-2 shadow-2xl p-4">
        <header>
            <h1 class="text-2xl font-semibold text-pretty uppercase mb-3">Total de ventas por días</h1>
        </header>

        <Loader :loading="loading">
            <main>
                <div class="w-full h-96 border">Aqui va mi chart</div>
            </main>
        </Loader>
    </section>
</template>