// import { createApp } from './app'
// const { app, router } = App.createApp()

// router.onReady(()=>{
// 	app.$mount('#app')
// })


const App = require('./app')

const { app, router } = App.createApp()

router.onReady(()=>{
	app.$mount('#app')
})