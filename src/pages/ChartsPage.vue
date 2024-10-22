<script setup>
import { ref, watchEffect } from 'vue';
import QuantityOfProductsSoldPerDayChart from '../components/charts/QuantityOfProductsSoldPerDayChart.vue';
import TotalSalesByDateChart from '../components/charts/TotalSalesByDateChart.vue';
import { VDateInput } from 'vuetify/labs/components';
import dayjs from 'dayjs';

const defaultStartDate = dayjs().add(-7, 'day')
const defaultEndDate = dayjs()

const getArrayDates = () => {
    const dates = []
    dates.push(defaultStartDate.toDate())
    const diffInDays = defaultEndDate.diff(defaultStartDate, 'day')
    for (let i = 1; i < diffInDays + 1; i++) {
        const newDate = defaultStartDate.add(i, 'day').toDate()
        dates.push(newDate)
    }

    return dates
}

const startDate = ref(defaultStartDate)
const endDate = ref(defaultEndDate)
const dateTimeModel = ref(getArrayDates())

watchEffect(() => {
    startDate.value = dayjs(dateTimeModel.value[0])
    endDate.value = dayjs(dateTimeModel.value[dateTimeModel.value.length - 1])
})



</script>

<template>
    <div class="w-full h-full flex justify-center overflow-auto">
        <main
            class="h-min flex flex-col items-center max-w-7xl justify-center w-full p-4">
            <VDateInput class="w-full" v-model="dateTimeModel" label="Selecciona las fechas" multiple="range"></VDateInput>

            <TotalSalesByDateChart :startDate="startDate" :endDate="endDate" />

            <QuantityOfProductsSoldPerDayChart />
        </main>
    </div>
</template>