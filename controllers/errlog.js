module.exports = function(req,res){
	console.log(req.path);
	console.log(req.body);
	res.send("ok");
};
// post '/errlog'