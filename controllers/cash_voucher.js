/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/*!
 * 返回现金券和代金券
 * cashvoucher
 */
var User = require('../proxy').User;

exports.getCashVoucherByOpenID = function (req, res, next) {
 	User.getCashVoucherByOpenID(req.session.openID,function(err,user){
 		if(err) return next(err);
 		res.send(user);
 	});
};