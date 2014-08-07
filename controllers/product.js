var Wine = require('../proxy').Wine;
var config = require('../config');

exports.getProduct = function(req, res, next){
	var wines = [];
	var wines_length = 0;
	var query_length = req.query.r.length;
	Wine.findByIDs(req.query.r, afterfind);
	function afterfind (err, wines){
		if(err){
			return next(err);
		}else{
			var r = {
					list : wines,
					s_dir : config.small_dir,
					l_dir : config.large_dir
				};
			res.send(r);
		}
	}
}

exports.getRecommend = function(req,res){
	res.send('getRecommend');
}

