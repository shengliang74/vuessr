export function fetchItem(){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve("123");
		},1000)
	})
}