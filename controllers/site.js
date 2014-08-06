/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/**
 * Module dependencies.
 */

 var Wine = require('../proxy').Wine;
 var config = require('../config');

 exports.visitHome = function(req,res,next){
	var recommendList = [];
	var recordList = [];
	var r = 'home';		
	if(req.query && req.query.r){
		r = req.query.r;		
	}
	Wine.findRecommend( function (err,wineList){
		if(err) return next(err);
		for(var i=0;i<wineList.length;i++){
			recommendList.push({
				LittlePic : config.small_dir + wineList[i].littlePic,
				Code : wineList[i].id,
				MarketPrice : wineList[i].marketPrice,
				WechatPrice : wineList[i].wechatPrice
			});
		}						
		res.render('index',{
			title : "安徽1919",
			r:r,
			recommendList:recommendList
		});
	})
		
};