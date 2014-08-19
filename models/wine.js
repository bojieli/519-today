var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/*
* id:酒的编号
* visitNum:酒的访问次数
* purchase：酒的购买次数
*/

 var WineSchema = new Schema({
  id : String,
  name : String,
  describe : String,
  marketPrice : Number,
  wechatPrice : Number,
  littlePic : String,
  details :  {
      degree : String,
      volume : String,
      place : String
    },
  detail : String,
  bigPic : [String],
  tag : {
  	winetype : String,
  	isRecommend : Boolean
  },
  visitNum : Number,
  purchaseNum : Number
 });

mongoose.model('Wine',WineSchema);
