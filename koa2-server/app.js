const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const KoaBody = require("koa-body");
const logger = require('koa-logger')

const index = require('./routes/index')
const home = require('./routes/home')
const users = require('./routes/users')

const path = require("path");

// error handler
onerror(app)

app.use(
  KoaBody({
    multipart: true
  })
);
app.use(json())
app.use(logger())

// // 静态资源
app.use(require('koa-static')(__dirname + '/public'))

// const serve = require("koa-static");
// app.use(serve(__dirname + "./static/upload"));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const multer = require('koa-multer'); // 使用 koa-multer 中间件
const upload = multer(); // 配置multer
app.use(upload.any()); // 使用multer中间件处理任何上传的文件

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(home.routes(), home.allowedMethods())

const cors = require('kcors');
// 添加全局跨域处理中间件
app.use(cors());

// app.listen(3000);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
