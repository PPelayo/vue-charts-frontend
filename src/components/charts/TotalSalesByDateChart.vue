<script setup>
import { computed, provide, ref, toRef, watchEffect } from 'vue';
import { salesRepository } from '../../lib/repositories/SalesRepository.mjs';
import Loader from '../Loader.vue';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { use } from 'echarts/core';
import Chart, { THEME_KEY } from 'vue-echarts';
import { GridComponent, TitleComponent } from 'echarts/components';


const props = defineProps({
    startDate: {
        type: Object
    },
    endDate: {
        type: Object
    }
})


use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    GridComponent,
])

provide(THEME_KEY, 'light')

const dateFormat = 'YYYY-MM-DD'


const loading = ref(false)
const totalsData = ref([])
const error = ref(null)

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

    const { startDate, endDate } = props

    const days = []
    days.push(startDate.format(dateFormat))

    const diffInDays = endDate.diff(startDate, 'day')
    for (let i = 1; i < diffInDays+1; i++) {
        days.push(startDate.add(i, 'day').format(dateFormat))
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
    console.log(props.startDate, props.endDate);
    
    fetchData({ startDate: props.startDate, endDate: props.endDate })
})


</script>


<template>
    <article class="w-full h-fit my-2 border rounded-xl shadow-lg p-4  overflow-auto">
        <Loader :loading="loading">
            <Chart :option="options" class="h-[800px] min-w-[600px]" autorosize></Chart>
        </Loader>
    </article>
</template>