/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/*!
 * 当用户访问其他用户分享的页面的时候
 *
 */
var User = require('../proxy').User;
exports.visitShare = function (req, res) {
 	//res.redirect('/');
 	/*
 	if(!req.query.scendID){
 		User.getSceneIDbyOpenID(req.session.openID,function(err,scendID){
 			res.redirect('/share?scendID=' + scendID);
 		})
 	}
 	else
 	{
 		res.send('ScendID:\t' + req.query.scendID);
 	}*/
 	res.send(req.query.sceneID);
 	/*


 	if(!req.query.openID){
 		res.redirect('/share?openID=' + req.session.openID);
 	}
 	else{
 		res.send('openID:\t' + req.query.openID);
 	}*/
 	//res.send('share');

};