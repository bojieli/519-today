var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, function dberr(err){
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
require('./access_token');
require('./dispatch_center');
require('./ship_staff');



exports.User = mongoose.model('User');
exports.Wine = mongoose.model('Wine');
exports.Collect = mongoose.model('Collect');
exports.Order = mongoose.model('Order');
exports.Withdrawal = mongoose.model('Withdrawal');
exports.AccessToken = mongoose.model('AccessToken');
exports.DispatchCenter = mongoose.model('DispatchCenter');
exports.ShipStaff = mongoose.model('ShipStaff');

