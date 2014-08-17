/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/*!
 * 当用户访问其他用户分享的页面的时候
 *
 */
var User = require('../proxy').User;
var User_wechat = require('../weixin/proxy');
exports.visitShare = function (req, res) {
	res.render('share');
};