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
	var baijiu = [];
	var hongjiu = [];
	var r = 'home';
	if(req.query && req.query.r){
		r = req.query.r;
	}
	Wine.findAllWines(function (err,allwines){
		if(err) return next(err);
		for(var i=0;i<allwines.length;i++){
			var wine = {
				LittlePic : config.small_dir + allwines[i].littlePic,
				Code : allwines[i].id,
				name : allwines[i].name,
				MarketPrice : allwines[i].marketPrice,
				WechatPrice : allwines[i].wechatPrice,
				tag : allwines[i].tag
			}
			if(wine.tag.isRecommend){
				recommendList.push(wine);
			}
			if(wine.tag.winetype == "白酒"){
				baijiu.push(wine);
			}else if(wine.tag.winetype == "红酒"){
				hongjiu.push(wine);
			}
		}

	res.render('index',{
	title : "安徽1919",
	r:r,
	recommendList : recommendList,
	baijiu : baijiu,
	hongjiu : hongjiu});
	});
}