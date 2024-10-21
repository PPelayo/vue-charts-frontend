import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import ProductsPage from './pages/ProductsPage.vue'
import EditProductPage from './pages/EditProductPage.vue'
import SalesPage from './pages/SalesPage.vue'
import ChartsPage from './pages/ChartsPage.vue'

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
  

createApp(App)
.use(createRouter({
    history: createWebHistory(),
    routes
}))
.mount('#app')
