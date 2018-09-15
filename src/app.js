// import Vue from 'vue'
// import App from './App.vue'
// import {createRouter} from './router'

// export function createApp(){
// 	const router = createRouter()
// 	const app = new Vue({
// 		router,
// 		render: h => h(App)
// 	})
// 	return { app, router }
// }



const Vue = require('vue')
const App = require('fs').readFileSync('./src/App.vue', 'utf-8');
// const App = require('./App.vue')
const Router = require('./router')

function createApp(){
	const router = Router.createRouter()
	const app = new Vue({
		router,
		render: h => h(App)
	})
	return { app, router }
}

module.exports = {
	createApp: createApp
}