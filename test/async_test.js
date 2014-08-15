var api = require('../common/api');
var mongoose = require('mongoose');
var config = require('../config');





function test(){

	api.createTmpQRCode(100,1800,function(err,result){
		if(err){
			console.log('------------------------------------');
			console.log(err);
			console.log(new Date());
			if(err.code === -1){
				return test();
			}
			else
				throw err;
		}
		var url = api.showQRCodeURL(result.ticket);
		console.log(url);
 	})
}
mongoose.connect(config.db,function dberr(err){
  if(err){
    console.error('connect to %s error',config.db,err.message);
    process.exit(1);
  }
  setInterval(test,1000*10);
});
