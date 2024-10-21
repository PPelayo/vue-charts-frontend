<script setup>
import { computed, provide, ref, watchEffect } from 'vue';
import { salesRepository } from '../../lib/repositories/SalesRepository.mjs';
import dayjs from 'dayjs';
import Loader from '../Loader.vue';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { use } from 'echarts/core';
import Chart, { THEME_KEY } from 'vue-echarts';
import { GridComponent, TitleComponent } from 'echarts/components';

use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    GridComponent,
    // TooltipComponent,
    // LegendComponent,
])

provide(THEME_KEY, 'light')

const dateFormat = 'YYYY-MM-DD'


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

const daysFromDates = computed(() => {

    const days = []
    days.push(startDate.value.format(dateFormat))

    const diffInDays = endDate.value.diff(startDate.value, 'day')
    for (let i = 1; i < diffInDays+1; i++) {
        days.push(startDate.value.add(i, 'day').format(dateFormat))
    }
 
   return days
})

var totalsMapped = computed(() => {
    return daysFromDates.value.map(d => {
        const totalWrapper = totalsData.value.find(({ date }) => date === d)

        return totalWrapper ? totalWrapper.totals : "0"
    })
})

const options = computed(() => {
    return {
        title: {
            text: 'TOTAL DE VENTAS POR DIAS',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: daysFromDates.value,
            name: 'Días'
        },
        yAxis : {
            type: 'value',
            name: 'Total de ventas',
            interval: 50
        },
        series : [
            {
                type: 'bar',
                data: totalsMapped.value
            }
        ]
    }
})


watchEffect(() => {
    fetchData({ startDate: startDate.value, endDate: endDate.value })
})


</script>


<template>
    <section class="w-full h-fit my-2 border rounded-xl shadow-lg p-4  overflow-auto">
        <Loader :loading="loading">
            <main>
                <Chart :option="options" class="h-[800px] min-w-[600px]" autorosize></Chart>
            </main>
        </Loader>
    </section>
</template>