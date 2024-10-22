import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import ProductsPage from './pages/ProductsPage.vue'
import EditProductPage from './pages/EditProductPage.vue'
import SalesPage from './pages/SalesPage.vue'
import ChartsPage from './pages/ChartsPage.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const routes = [
    {
        path: '/products',
        component : ProductsPage
    },
    {
        path: '/products/edit',
        component: EditProductPage
    },
    {
        path: '/sales',
        component: SalesPage
    },
    {
        path: '/charts-sales',
        component: ChartsPage
    }
]
  

const vuetify = createVuetify({
    components,
    directives
})

createApp(App)
.use(createRouter({
    history: createWebHistory(),
    routes
}))
.use(vuetify)
.mount('#app')
