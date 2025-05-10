import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import funcPlugins from './plugins/func'
import objPlungins from './plugins/obj'
import person from '@/plugins/person'
import globalDirectives from '@/plugins/global-directives'
import dayjs from '@/plugins/dayjs'
// import focus from './directives/focus'
// import globalComponents from './plugins/global-components'

const app = createApp(App)
// app.use(objPlungins, { name: '잉크94' })
// app.use(funcPlugins)
// app.directive('focus', focus)
app.use(person, { name: '인경수' })
// app.use(globalComponents)
app.use(globalDirectives)
app.use(dayjs)
app.use(router)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

// console.log('MODE : ', import.meta.env.MODE)
// console.log('BASE_URL : ', import.meta.env.BASE_URL)
// console.log('PROD : ', import.meta.env.PROD)
// console.log('DEV : ', import.meta.env.DEV)
// console.log('VITE_APP_API_URL : ', import.meta.env.VITE_APP_API_URL)
