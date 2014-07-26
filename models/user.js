var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* openID:
* preOpenID:上线的openID
* basicInfo:从微信拿到的用户基本信息
* hasFollow:是否已经关注主页
* cash:现金劵数量
* vocher:{value:代金券面值，number:数量}
* address:使用过的地址
*/

var UserSchema = new Schema({
  openID : String,
  preOpenID : String,
  sceneID : Number,
  basicInfo : {
    nickname : String,
    sex : Number,
    province : String,
    city : String,
    country : String,
    headimgurl : String,
    privilege : String
  },
  hasFollow : Boolean,
  cash : Number,
  voucher : [{
    value : Number,
    number : Number
  }],
  currentAddress : {
    province : String,
    city : String,
    district : String
  },
  address : {type:[{
    province : String,
    city : String,
    area : String,
    detail : String,
    name : String,  //收件人
    tel : String
  }],default : [{ province : "安徽省",
                 city : "阜阳市",
                 area :"颍州区",
                 detail : "颍州区政府",
                 name : "张三",
                 tel ： "13888888888"
                  }]}
}, { autoIndex: false });

mongoose.model('User',UserSchema);