/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/*!
 * 用于处理与地址相关的请求
 * address
 */

var User = require('../proxy').User;

exports.getAddressByOpenID = function (req, res, next) {
  User.getAddressByOpenID(req.session.openID,function(err, user){
  	if(err) return next(err);
  	res.send(user.address);
  })
};

exports.addAddress = function (req, res) {
  User.addAddress(req.session.openID, req.body.address,function(err){
  	if(err) return next(err);
    res.send({message : 'OK', error : 0});
  });
};

exports.deleteAddress = function (req, res) {
  User.deleteAddress(req.session.openID,req.body.index,function(err){
    if(err) return next(err);
     res.send({message : 'OK', error : 0});
  });
};

exports.defaultAddress = function (req, res) {
  User.setDefault(req.session.openID,req.query.index,function(err){
    if(err) return next(err);
     res.send({message : 'OK', error : 0});
  });
};