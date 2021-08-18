import { createApp } from 'vue'
import App from './App.vue'
import localization from './locales/#localization.js'

const app = createApp(App)

app.use(localization)
app.mount('#app')