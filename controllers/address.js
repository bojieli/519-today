/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/*!
 * 用于处理与地址相关的请求
 * address
 */
var config = require('../config');
var User = require('../proxy').User;

exports.getAddressByOpenID = function (req, res, next) {
  User.getAddressByOpenID(req.session.openID,function(err, user){
  	if(err) return next(err);
    if(!user){
      var _err = new Error();
      _err.describe = 'getAddressByOpenID !user';
      return next(_err);
    }
  	res.send(user.address);
  })
};

exports.addAddress = function (req, res,next) {
  User.addAddress(req.session.openID, req.body.address,function(err){
  	if(err) return next(err);
    res.send({message : 'OK', error : 0});
  });
};

exports.deleteAddress = function (req, res,next) {
  User.deleteAddress(req.session.openID,Number(req.body.index),function(err){
    if(err){
      if(err.errCode == config.errorCode_index)
        res.send({message : 'index error', error : config.errorCode_index});
      else
        res.send({message : 'error', error : config.errorCode_index});
     return next(err);
}
     res.send({message : 'OK', error : 0});
  });
};

exports.setDefaultAddress = function (req, res,next) {
  User.setDefault(req.session.openID,Number(req.body.index),function(err){
    if(err) return next(err);
     res.send({message : 'OK', error : 0});
  });
};