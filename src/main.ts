import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Icons from '@ant-design/icons-vue'

import App from './App.vue'
import router from './router'
import '@/assets/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 注册所有 Ant Design Vue 图标
for (const iconName in Icons) {
  app.component(iconName, Icons[iconName as keyof typeof Icons])
}

app.mount('#app')
