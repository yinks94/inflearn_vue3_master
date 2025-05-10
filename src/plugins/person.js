// const perosnPlugins = {
//   install(app, options) {
//     console.log('Loading Person Plugins....')
//     const person = {
//       name: '짐코딩',
//       say() {
//         alert(this.name)
//       },
//     }
//     app.config.globalProperties.$person = person
//   },
// }

// export default perosnPlugins

export default {
  install(app, options) {
    console.log('Loading Plugins >>>> person.js')
    const person = {
      name: '짐코딩',
      say() {
        alert(this.name)
      },
      ...options,
    }
    app.config.globalProperties.$person = person
    app.provide('person', person)
  },
}
