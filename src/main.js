import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Add the router before mounting the Vue application.
// 在挂载 Vue 应用之前加入路由。
createApp(App).use(router).mount('#app')
