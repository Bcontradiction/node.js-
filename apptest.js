//log4js的使用
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

//配置当前log4js，"filename"中存放日志文件的目录和文件名，上以为为保存在当前目录下，日志文件名称为access.log;"maxLogSize"表示每个日志文件的大小，应该设置为较大值，当日志超过这个大小时，会另外创建一个文件，这里设置为较小值是为了创建多个日志文件;"backups"表示备份文件的数量，超过数量的文件会被删除;"category"表示日志策略，可以设置为normal。
//logger为当前log4js的一个实例，可以用来打印日志，设置的参数一般与上面的category一样。setLevel则可以根据实际项目的需求设置，设置为DEBUG，则不会打印出比INFO级别低的日志，入TRACE,高于DEBUG级别以及以上的日志会记录在日志文件中。
var log4js = require('log4js');

log4js.configure({
  appenders: [
      {type: 'console'},
      {
          type: 'file',
          filename: './access.log',
          maxLogSize: 10,
          backups: 6,
          category: 'normal'
      }
  ],
  replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('DEBUG');

//日志还有除了在调试时使用的另一个更重要功能，当前端发起请求的时候，可以将请求记录在日志中，以下代码就是这个作用。其中level参数表示日志的输出级别。设置为auto，日志级别对应规则为:
// -http返回码为3**:level=WARN;
// -http返回码为4**,5**时,level=ERROR;
// -其他的返回码,level=INFO   将format:':method :url'去掉增加记录内容
app.use(log4js.connectLogger(logger,{
  level:'auto',format:':method :url'
}));
//以下为打印不同级别的日志
logger.debug('loglog');
logger.info('infoinfo');
logger.error('errorerror');
console.log('test');
console.log('error');
app.get('/',function(req,res){
  res.send('hello');
})

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
