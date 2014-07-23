/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/*!
 * 用于处理与地址相关的请求
 * address
 */

var User = require('../proxy').User;

exports.getAddressByOpenID = function (req, res) {
  User.getAddressByOpenID(req.session.openID,function(err, user){
  	if(err) return;
    console.log('++++++++++++++++++++++++++++++++');
    console.log(user.address.length);
    console.log(user.address[3]);
  	res.send(user.address);
  })
};

exports.addAddress = function (req, res) {
  User.addAddress(req.session.openID, req.body.address,function(err){
  	if(err) return;
  });
};

exports.deleteAddress = function (req, res) {
  User.deleteAddress(req.session.openID,req.body.index,function(err){
    if(err) return;
  });
};

exports.defaultAddress = function (req, res) {
  User.setDefault(req.session.openID,req.query.index,function(err){
    if(err) return;
  });
};