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
  openID : {type:String,default:""},
  preOpenID : {type:String,default:""},
  sceneID : {type:Number,default: -1},
  basicInfo : {
    nickname : {type:String,default:""},
    sex : {type:Number,default:0},
    province : {type:String,default:""},
    city : {type:String,default:""},
    country : {type:String,default:""},
    headimgurl : {type:String,default:""},
    privilege : {type:String,default:""}
  },
  hasFollow : {type : Boolean,default:false},
  cash : {type:Number,default:0},
  voucher : {type : [{
    value : Number,
    number : Number
  }], default : []},
  currentAddress : {
    province : {type:String,default:""},
    city : {type:String,default:""},
    district : {type:String,default:""}
  },
  address : {type : [{
    province : {type:String,default:""},
    city : {type:String,default:""},
    area : {type:String,default:""},
    detail : {type:String,default:""},
    name : {type:String,default:""},  //收件人
    tel : {type:String,default:""}
  }], default : []}
}, { autoIndex: false });

mongoose.model('User',UserSchema);