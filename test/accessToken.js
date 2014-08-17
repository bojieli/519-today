var api = require('../common/api');
var mongoose = require('mongoose');
var config = require('../config');


function test(){
	api.sendText('owaixtwzZUF3Qma5s8xH0N__mwK0', '贺羽你好',function(err){
		if(err)
			console.log(err);
	})
}

mongoose.connect(config.db,function dberr(err){
	if(err){
		console.error('connect to %s error',config.db,err.message);
		process.exit(1);
	}
	test();	
});