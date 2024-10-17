import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Home.vue'
import ProductsPage from './pages/ProductsPage.vue'

const routes = [
    {
        path: '/hello-world',
        component: HelloWorld
    },
    {
        path: '/a',
        component: Home
    },
    {
        path: '/products',
        component : ProductsPage
    }
]
  

createApp(App)
.use(createRouter({
    history: createWebHistory(),
    routes
}))
.mount('#app')
