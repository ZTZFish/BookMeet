import { createApp } from 'vue'
import App from './App.vue'
import IndexCard from './components/Index/IndexCard.vue'
import router from './router/routes.js'

const app = createApp(App)
app.component('IndexCard', IndexCard)
app.use(router)

app.mount('#app')
