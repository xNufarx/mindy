import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/index.scss'

createApp(App).use(createPinia()).use(router).mount('#app')
