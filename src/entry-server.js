// import { createApp } from './app'

// export default context => {
// 	return new Promise((resolve, reject) => {
// 		const {app, router} = createApp();
// 		router.push(context.url)
// 		router.onReady(()=>{
// 			const matchedComponents = router.getMatchedComponents()
// 			if(!matchedComponents.length){
// 				return reject({code: 404})
// 			}
// 			resolve(app)
// 		}, reject)
// 	})
// }


const App = require('./app')
function createApp(context){
	return new Promise((resolve, reject) => {
		const {app, router} = App.createApp();
		console.log(context.url, "context.url");
		router.push(context.url)
		router.onReady(()=>{
			const matchedComponents = router.getMatchedComponents();
			console.log(matchedComponents, "matchedComponents");
			// if(!matchedComponents.length){
			// 	return reject({code: 404})
			// }
			resolve(app)
		}, reject)
	})
}

module.exports.createApp = createApp


