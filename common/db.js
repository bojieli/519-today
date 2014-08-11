var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config_id = 1919;

 var ConfigSchema = new Schema({
  id : Number,
  access_token : String

 });

mongoose.model('Config',ConfigSchema);

var Config = mongoose.mongoose('Config');

exports.getConfig = function(cb){
  Config.findOne({id:config_id},function(err,doc){
    if(err){
      throw "find config error:" + err;
      return cb(err);
    }
    cb(null,doc);
      
  });
}

exports.setConfig = function(obj){
  Config.update({id:config_id},{$set:obj},function(err){
    if(err){
      throw "update config error"+err;
    }
  });
}