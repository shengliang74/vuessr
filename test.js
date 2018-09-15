const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer();
const createApp = require('./src/entry-server.js')
console.log(createApp,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

server.get('*', (req, res) => {
  const context = { url: req.url }

  createApp.createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
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
})

server.listen(3000, function () {
  // var host = server.address().address;
  // var port = server.address().port;

  console.log('Example app listening at http://%s:%s', 1, 2);
})
