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
var mongodb = require('mongodb');
var app = express();
//error handle

var fs = require('fs');
var bunyan = require("bunyan");
var errlog = bunyan.createLogger({
  name : "519-today",
  level : "error",
  path : '../log/error.log'
});


//更新globalSceneID
require('./proxy/global_sceneid_count')();
require('./weixin/proxy').updateGlobalSceneID();
Error.stackTraceLimit = Infinity;



// var errorLogfile = fs.createWriteStream('../log/error.log',{flags : 'a'});
// var exceptionLogfile = fs.createWriteStream('../log/exception_error.log',{flags : 'a'});
// process.on('uncaughtException', function(err) {
//   err.Time = new Date().toUTCString();
//   err.Stack = err.stack;
//   exceptionLogfile.write(JSON.stringify(err) + ',\n');

//   console.log(err);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('cookie-parser')(config.session_secret));

// Configuration in session
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(config.db_native, function(err, session_store) {
  if (err) {
     console.error('Failed to connect to mongodb for session store');
     return;
  }
  console.log('Connected to mongodb session store');

  app.use(session({
    secret: config.session_secret,
    key: 'sid',
    store: new MongoStore({ db: session_store }),
    resave: true,
    saveUninitialized: true,
  }));

  /// we should initialize the session store before declaring routes
  weixin(app);
  routes(app);

  /// catch 404 and forward to error handler
  /// this should be executed after any other app.use() as this is a catch-all fallback
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  /// listen after everything is ready...
  /// do not expose inconsistent startup states to user
  app.listen(config.port, function (err) {
    console.log("519Today listening on port %d", config.port);
    console.log("God bless love....");
    //throw new Error('dgjalsjgldjslgasljgldsjgldasj');
    //test.test();
  });
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {

     // // err.Stack = err.stack;
     //  //err.date
     //  err.Time = new Date().toUTCString();
     //  errorLogfile.write(JSON.stringify(err));
     console.log(err);
     console.log(err.stack);
     errlog.error(err);
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


