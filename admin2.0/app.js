const fs = require('fs')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config')
const expressJwt = require('express-jwt')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const routes = require('./router.config')

const viewMiddleware = require('./middlewares/view')
const app = express();

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(logger('dev'));
app.use(express.json());
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))

// app.use(expressJwt({ secret: config.get('jwt.secret')}).unless(req => {
//   return req.method === 'POST'
// }))

app.use('/api', routes)

app.use(viewMiddleware(app))


// error handler
app.use(function(err, req, res, next) {
  if (err.status === 401) {
    res.status(401)
    return res.json({errMsg: '身份验证失败，请重新登录'})
  }
  console.log(err)
  res.status(err.status || 500);
  console.log('状态码:', err.status)
  console.log('错误信息:',err.message)
  console.log(err.stack)
});

const port = config.get('port')
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

module.exports = app