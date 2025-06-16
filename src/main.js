import { createApp } from 'vue'
import App from './App.vue'
import IndexCard from './components/Index/IndexCard.vue'
import router from './router/routes.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'tdesign-mobile-vue/es/style/index.css';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.component('IndexCard', IndexCard)
app.use(router)
app.use(pinia)

app.mount('#app')
