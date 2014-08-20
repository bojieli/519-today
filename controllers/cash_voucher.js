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
	console.log('----------------------getCashVoucherByOpenID------------------------------');
 	User.getCashVoucherByOpenID(req.session.openID,function(err,user){
 		if(err) return next(err);
 		console.log(JSON.stringify(user));
 		res.send(user);
 	});
};