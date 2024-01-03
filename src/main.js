
import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router/index.js'
//引入Varlet
import Varlet from '@varlet/ui'
//引入阿里图标
import '@/assets/iconfont/iconfont.js'
// svg图标配置
import 'virtual:svg-icons-register'
// import '@varlet/ui/es/style.js'
const app = createApp(App)
app.use(router);
app.use(Varlet)
app.mount('#app')
