//log4js的使用
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var log4js = require('log4js');
var log4jsConfig = require('./log');
log4js.configure(log4jsConfig.config('./access.log'));
app.use(log4js.connectLogger(log4jsConfig.logger, {
    level: log4jsConfig.connectLogLevel,
    format: log4jsConfig.connectLogFormat
}));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000,function(){
  console.log("node is ok");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
