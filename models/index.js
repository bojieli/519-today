var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db,function dberr(err){
  if(err){
    console.error('connect to %s error',config.db,err.message);
    process.exit(1);
  }
});


//different models
require('./user');
require('./shop_history');
require('./wine');
require('./collect');
require('./order');

exports.User = mongoose.model('User');
exports.ShopHistory = mongoose.model('ShopHistory');
exports.Wine = mongoose.model('Wine');
exports.Collect = mongoose.model('Collect');
exports.Order = mongoose.model('Order');