





exports.index = function (req, res) {

	console.log('promote!');
	var url = 'http://node.freeshell.ustc.edu.cn/recommend/?openID=' + req.session.openID;
	res.redirect(url);
  	
};