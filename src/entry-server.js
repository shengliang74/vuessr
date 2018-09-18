import { createApp } from './app'

export default context => {
	return new Promise((resolve, reject) => {
		const {app, router, store} = createApp();
		router.push(context.url)
		router.onReady(()=>{
			const matchedComponents = router.getMatchedComponents()
			if(!matchedComponents.length){
				return reject({code: 404})
			}

			Promise.all(matchedComponents.map(Component => {
				if(Component.asyncData){
					return Component.asyncData({
						store,
						route: router.currentRoute
					})
				}
			})).then(()=> {
				context.state = store.state
				resolve(app)
			}).catch(reject)
		}, reject)
	})
}


// const App = require('./app')
// function createApp(context){
// 	return new Promise((resolve, reject) => {
// 		const {app, router} = App.createApp();
// 		console.log(context.url, "context.url");
// 		router.push(context.url)
// 		router.onReady(()=>{
// 			console.log(1111);
// 			const matchedComponents = router.getMatchedComponents();
// 			console.log(matchedComponents, "matchedComponents");
// 			// if(!matchedComponents.length){
// 			// 	return reject({code: 404})
// 			// }
// 			resolve(app)
// 		}, reject)
// 	})
// }

// module.exports.createApp = createApp


