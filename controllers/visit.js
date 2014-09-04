/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/*!
 * 当用户点击的时候调用
 * visit
 */

var Wine = require('../proxy').Wine;

exports.addVisit = function (req, res,next) {

  	Wine.addVisit(req.body['id'],function(err){
  		if(err) return next(err);
  	});

};