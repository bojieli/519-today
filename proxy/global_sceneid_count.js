var config = require('../config');
var models = require('../models');
var User = models.User;

global.sceneID_web_count = 0;

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