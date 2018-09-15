const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer();
const template = require('fs').readFileSync('./index.template.html', 'utf-8');

server.get('*', (req, res) => {
	const app = new Vue({
		data: {
			title: 'hello sl',
			test: 'test test test',
			meta: '<meta></meta>'
		},
		template: template
	})
	renderer.renderToString(app, (err, html) => {
    // if (err) {
    //   res.status(500).end('Internal Server Error')
    //   return
    // }
    res.end(html);
    console.log(html);
  })
})

server.listen(3000, function () {
  // var host = server.address().address;
  // var port = server.address().port;

  console.log('Example app listening at http://%s:%s', 1, 2);
})