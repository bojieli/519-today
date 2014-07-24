/*

我们的自定义错误

*/



var fs = require('fs');
var errorlogfile = fs.createWriteStream('error_def_log.json', {flags : 'a'});


module.exports.errDef = function (err_code , err_message, err_object){
	
	var date = new Date();
	var err = {
		err_code : err_code,
		err_message : err_message,
		date : date.toUTCString(),
		err_object : err_object||{}
	}
	errorlogfile.write(JSON.stringify(err)+',\n');
	//errorlogfile.end();
}
module.exports.errCrash = 
