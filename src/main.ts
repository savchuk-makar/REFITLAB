import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import YmapPlugin from 'vue-yandex-maps'
const settings = {
    apiKey: '3dad1ba3-f34d-49e2-8db6-6c3119613c05',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}

import App from '@/App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(YmapPlugin, settings)

app.mount('#app')
