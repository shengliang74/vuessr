import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import { createStore} from './store'
import { sync } from 'vuex-router-sync'

export function createApp(){
	const router = createRouter()
	const store = createStore()

	sync(store, router)
	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})
	return { app, router, store }
}



// const Vue = require('vue')
// const App = require('fs').readFileSync('./src/App.vue', 'utf-8');
// // const App = require('./App.vue')
// const Router = require('./router')

// function createApp(){
// 	const router = Router.createRouter()
// 	const app = new Vue({
// 		router,
// 		render: h => h(App)
// 	})
// 	return { app, router }
// }

// module.exports = {
// 	createApp: createApp
// }