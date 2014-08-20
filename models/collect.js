var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* openID : 与特定的用户对应
* collectList : 对应的是酒的id的数组
*/

var CollectSchema = new Schema({
  openID : {type:String,default : ""},
  collectList : {type:[String],default:[]}
});

mongoose.model('Collect',CollectSchema);