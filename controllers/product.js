var Wine = require('../proxy').Wine;
var config = require('../config');

exports.getProduct = function(req,res){
	var wines = [];
	var wines_length = 0;
	var query_length = req.query.r.length;

	for(var i = 0; i < query_length; i++){
		Wine.findByID(req.query.r[i],afterfind);
		function afterfind(err,wine){
			
			delete wine._id;
			wines[wines_length] = wine;
			wines_length ++ ;
			if(wines_length===query_length){
				console.log(wines);
				var r = {
					list : wines,
					s_dir : config.small_dir,
					l_dir : config.large_dir
				};
				res.send(r);
			}
		};
	}
}

exports.getRecommend = function(req,res){
	res.send('getRecommend');
}

