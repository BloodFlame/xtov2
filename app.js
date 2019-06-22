const Koa = require('koa');
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = new Koa();

app.use(bodyParser());
app.use(koaJson());

// routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (file) {
  if (~file.indexOf('.js')) app.use(require(path.join(__dirname, 'routes', file)).routes());
});

app.use(function (ctx, next) {
  ctx.redirect('/404.html');
});

app.on('error', (error, ctx) => {
  console.log('something error ' + JSON.stringify(ctx.onerror))
  ctx.redirect('/500.html');
});

http.createServer(app.callback())
  .listen(8090)
  .on('listening', function () {
    console.log('server listening on: ' + 8090)
  });