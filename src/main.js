import { createApp } from 'vue'
import App from './App.vue'
import Card from './components/Card.vue'
import router from './router/routes.js'

const app = createApp(App)
app.component('Card', Card)
app.use(router)

app.mount('#app')
