var config = require('../config');





exports.index = function (req, res) {

	var url = config.host + '/recommend/?openID=' + req.session.openID;
	res.redirect(url);


};