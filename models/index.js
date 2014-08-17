var mongoose = require('mongoose');
var config = require('../config');

mongoose.connectSet(config.db, function dberr(err){
  if(err){
    console.error('connect to %s error',config.db,err.message);
    process.exit(1);
  }
  console.log('Connected to mongodb via mongoose');
});


//different models
require('./user');
require('./wine');
require('./collect');
require('./order');
require('./withdrawal');

exports.User = mongoose.model('User');
exports.Wine = mongoose.model('Wine');
exports.Collect = mongoose.model('Collect');
exports.Order = mongoose.model('Order');
exports.Withdrawal = mongoose.model('Withdrawal');
