var config = require('../config');





exports.index = function (req, res) {

	// var url = config.host + '/recommend/?openID=' + req.session.openID;
	var url = config.host + '/recommend';
	res.redirect(url);


};