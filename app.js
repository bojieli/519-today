var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var config = require('./config');
require('./models');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var weixin = require('./weixin/weixin');
var app = express();
//error handle

var fs = require('fs');



//更新globalSceneID
require('./proxy/global_sceneid_count')();
require('./weixin/proxy').updateGlobalSceneID();


// accessLogfile
//var accessLogfile = fs.createWriteStream('access.log', {flags : 'a'});
var errorLogfile = fs.createWriteStream('./log/error.log',{flags : 'a'});
var exceptionLogfile = fs.createWriteStream('./log/exception_error.log',{flags : 'a'});
//app.use(express.logger({stream : accessLogfile}));
process.on('uncaughtException', function(err) {
  err.Stack = err.stack;
  exceptionLogfile.write(JSON.stringify(err) + ',\n');
  console.log(err + '\n');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Configuration in session
app.use(require('cookie-parser')(config.session_secret));
app.use(session({
  secret: config.session_secret,
  key: 'sid',
  store: new MongoStore({
    db: config.db_name
  }),
  resave: true,
  saveUninitialized: true,
}));

weixin(app);
routes(app);

app.listen(config.port, function (err) {
  console.log("519Today listening on port %d", config.port);
  console.log("God bless love....");
  //throw new Error('dgjalsjgldjslgasljgldsjgldasj');
  //test.test();
});


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {

      err.Stack = err.stack;
      errorLogfile.write(JSON.stringify(err));
      console.log(err);

    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

   /* res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });*/
});


module.exports = app;
