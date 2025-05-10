import dayjs from 'dayjs'

export default {
  install(app) {
    console.log('Loading Plugins >>>> dayjs.js')
    app.config.globalProperties.$dayjs = dayjs
    app.provide('dayjs', dayjs)
  },
}
