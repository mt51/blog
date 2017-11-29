var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const cors = require('cors');

const config = require('./config.js');

var routes = require('./routes/index');

const admin = require('./routes/admin');
const front = require('./routes/front');

var app = express();


const corsOptions = {
  origin: function(origin, callback){
    if (config.whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed by cors!'));
    }
  },
  optionsSuccessStatus: 200
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/admin')));
app.use(express.static(path.join(__dirname, 'views/front')));

app.use(cors(corsOptions));

app.use('/api', routes);

app.use('/admin', admin)

app.use('/index', front)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('状态码:', err.status)
  console.log('错误信息:',err.message)
  console.log(err.stack)
  res.render('error');
});


/* 数据库连接 */


mongoose.connect(config.databaseUrl, {user: '123', pass: '123'});

const db = mongoose.connection;
db.on('open', () => {
  console.log('数据库连接成功')
})

db.on('error', (err) => {
  console.log('数据库连接出错：', err)
})

module.exports = app;
