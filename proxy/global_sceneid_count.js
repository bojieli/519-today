var config = require('../config');
var models = require('../models');
var User = models.User;

global.sceneID_web_count = 0;
global.orderID_increment = 0;
global.leftPadString = function (value,length){
  var valueString = value.toString();
  if(valueString.length >= length){
    return valueString.substr(0,length);
  }else{
    var pad = "";
    for(var i = 0;i < length - valueString.length; i++){
      pad = pad + "0";
    }
    return pad + valueString;
  }
}
global.formatDate = function(date){
  // return date.toString();
  return date.getFullYear() + '-' + leftPadString(date.getMonth() + 1,2) + '-'
  + leftPadString(date.getDay(),2) + '  ' + leftPadString(date.getHours(),2) + ':' 
  + leftPadString(date.getMinutes(), 2);
}

module.exports = function () {
  User.find({sceneID : {$gt : config.SCENEID_BASE,$lte : config.SCENEID_MAX}},function(err,users){
      if(err){
        console.error("Get global sceneID error!");
        process.exit(1);
      }else{
      	if(users){
        	global.sceneID_web_count = users.length;
      	}else{
      		global.sceneID_web_count = 0;
      	}
      }
  });
}