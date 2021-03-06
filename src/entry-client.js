import { createApp } from './app'
const { app, router, store } = App.createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(()=>{
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)

		let diffed = false;
		const activated = matched.filter((c,i)=> {
			return diffed || (diffed = (prevMatched[i] !== c))
		})

		if(!activated.length){
			return next()
		}

		// 这里如果有加载指示器(loading indicator)，就触发

		Promise.all(activated.map(c=>{
			if(c.asyncData){
				return c.asyncData({store, route: to})
			}
		})).then(()=>{
			// 停止加载指示器(loading indicator)
			next()
		}).catch(next)
	})
	app.$mount('#app')
})


// const App = require('./app')

// const { app, router } = App.createApp()

// router.onReady(()=>{
// 	app.$mount('#app')
// })