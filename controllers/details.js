var Wine = require('../proxy').Wine;
var config = require('../config');


module.exports = function(req, res, next){
	// console.log(req.session);
	var code = req.query && req.query.code;
	console.log(code);
	Wine.findByID(code,function(err,wine){
		if(err) return next(err);
		var pics = [];
		wine.bigPic.forEach(function(item){
			pics.push(config.large_dir+item);
		});
		res.render('details',{
			title : "商品详情",
			bigPics : pics,
			describe : wine.describe,
			marketPrice : wine.marketPrice,
			wechatPrice : wine.wechatPrice,	
			code : code	,
			num : req.query.num || 1	
		});	
	})

	
};	