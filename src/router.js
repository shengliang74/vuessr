import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
	return new Router({
		mode: 'history',
		routes: [
			{path: '/', component: () => import('./components/Home.vue')},
			{path: '/item/:id', component: () => import('./components/Item.vue')},
		]
	})
}

// const Vue = require('vue')
// const Router = require('vue-router')
// const Home = require('fs').readFileSync('./src/components/Home.vue', 'utf-8');
// const Item = require('fs').readFileSync('./src/components/Item.vue', 'utf-8');
// // const emailEdit = resolve => require(['../views/orderDetail/passengerContacts/contact/emailEdit.vue'], resolve);
// Vue.use(Router)

// function createRouter () {
// 	return new Router({
// 		mode: 'history',
// 		routes: [
// 			{path: '/', component: resolve => Home},
// 			{path: '/item', component: resolve => Item},
// 			{path: '/favicon.ico', component: resolve => Item}
// 		]
// 	})
// }
// module.exports.createRouter = createRouter