var config = require('../config');





exports.index = function (req, res,next) {
	var url = config.host + '/recommend';
	res.redirect(url);
};