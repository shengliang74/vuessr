const Vue = require('vue')
const express = require('express')
const webpack = require('webpack');
const fs = require('fs');
const MFS = require('memory-fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const webpackDevMiddleware = require('webpack-dev-middleware');
// const renderer = require('vue-server-renderer').createRenderer();
const { createBundleRenderer } = require('vue-server-renderer')
// const template = require('fs').readFileSync('./index.template.html', 'utf-8');
const template = require('fs').readFileSync('./index.template.html', 'utf-8')
const templatePath = resolve('./index.template.html')

const app = express();
const isProd = process.env.NODE_ENV === 'production';

let renderer = null;
let readyPromise = null;


function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

if(isProd){
  // const createApp = require('/path/to/built-server-bundle.js')
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    template, // （可选）页面模板
    clientManifest // （可选）客户端构建 manifest
  })

}else{
  // const fs = require('fs');
  // const MFS = require('memory-fs');
  // const clientConfig = require('./build/webpack.client.config.js');
  // const serverConfig = require('./build/webpack.server.config.js');

  // const readFile = (fs, file) => {
  //   try {
  //     console.log(clientConfig.output.path,"clientConfig.output.path");
  //     return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  //   } catch (e) {}
  // }

  //客户端配置
  // const compiler = webpack(config);
  // app.use(webpackDevMiddleware(compiler,{
  //   publicPath: config.output.publicPath 
  // }));

  //服务端配置
  // const serverCompiler = webpack(serverConfig)
  // const mfs = new MFS()
  // let bundle = null;

  // const update = ()=>{
  //   if(bundle){
  //     renderer = createBundleRenderer(bundle, {
  //       template, // （可选）页面模板
  //       // clientManifest // （可选）客户端构建 manifest
  //     })
  //   }
  // }

  // serverCompiler.outputFileSystem = mfs;
  // serverCompiler.watch({}, (err, stats) => {
  //   console.log("11111111111111");
  //   if(err) throw err;
  //   console.log("2222222222222");
  //   stats = stats.toJson();
  //   console.log("3333333333333333");
  //   console.log(stats.errors);
  //   if(stats.errors.length) return
  //   console.log("44444444444444444444");
  //   bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
  //   console.log("bundlebundlebundle");
  //   update();
  // })

  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

app.get('*', (req, res) => {
	const context = { url: req.url };
  console.log("1234",req.url);
  console.log("1234",readyPromise);
  // createApp(context).then(app => {
    readyPromise.then((req, res)=>{
      console.log("renderer",renderer);
      renderer.renderToString(context, (err, html) => {
        if (err) {
          if (err.code === 404) {
            res.status(404).end('Page not found')
          } else {
            res.status(500).end('Internal Server Error')
          }
        } else {
          res.end(html)
        }
      })
    })
  // })
})

app.listen(3000, function () {
  // var host = server.address().address;
  // var port = server.address().port;

  console.log('Example app listening at http://%s:%s', 1, 2);
})