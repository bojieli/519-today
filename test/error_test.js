var api = require('../common/api');
var mongoose = require('mongoose');
var config = require('../config');

function test(){
	api.refresh(function(err, token) {
		if(err)
			console.log(err);
		console.log(token);
	})
}

setTimeout(test,100);