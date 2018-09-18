const Vue = require('vue')
const server = require('express')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const renderer = require('vue-server-renderer').createRenderer();
const template = require('fs').readFileSync('./index.template.html', 'utf-8');

const app = express();
const isProd = process.env.NODE_ENV === 'production'

const config = require('./build/webpack.server.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,{
  publicPath: config.output.publicPath 
}));

app.get('*', (req, res) => {
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

app.listen(3000, function () {
  // var host = server.address().address;
  // var port = server.address().port;

  console.log('Example app listening at http://%s:%s', 1, 2);
})