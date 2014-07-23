

/*
* id:酒的编号
* visitNum:酒的访问次数
* purchase：酒的购买次数
*/
/*
 var WineSchema = new Schema({
  id : String,
  name : String,
  describe : String,
  marketPrice : Number,
  wechatPrice : Number,
  littlePic : String,
  details : {
  	degree : Number,
  	volume : Number,
  	place : String
  },
  bigPic : [String],
  tag : {
  	type : String,
  	isRecommend : Boolean
  },
  visitNum : Number,
  purchaseNum : Number
 });

mongoose.model('Wine',WineSchema);*/

var Wine = require('../models').Wine;
/*
module.exports.test = function(){
  wine = new Wine({
        id : "fy20140716002",
        name : "口子窖",
        describe : "41度口子窖六年真藏实窖450ml",
        marketPrice : 168,
        wechatPrice : 128,
        littlePic : "fy20140716001_s.jpg",
        details : {
          degree : 41,
          volume : 450,
          place : '阜阳'
        },
        bigPic : ["fy20140716001_l_01.jpg","fy20140716001_l_02.jpg"],
        tag : {
          type : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine.save();
   wine1 = new Wine({
        id : "fy20140716003",
        name : "口子窖",
        describe : "41度口子窖六年真藏实窖450ml",
        marketPrice : 168,
        wechatPrice : 128,
        littlePic : "fy20140716001_s.jpg",
        details : {
          degree : 41,
          volume : 450,
          place : '阜阳'
        },
        bigPic : ["fy20140716001_l_01.jpg","fy20140716001_l_02.jpg"],
        tag : {
          type : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine1.save();
   wine2 = new Wine({
        id : "fy20140716004",
        name : "口子窖",
        describe : "41度口子窖六年真藏实窖450ml",
        marketPrice : 168,
        wechatPrice : 128,
        littlePic : "fy20140716001_s.jpg",
        details : {
          degree : 41,
          volume : 450,
          place : '阜阳'
        },
        bigPic : ["fy20140716001_l_01.jpg","fy20140716001_l_02.jpg"],
        tag : {
          type : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine2.save();
}*/
var User = require('../proxy').User;
var openID = 'owaixtwzZUF3Qma5s8xH0N__mwK0';

  var address = {
    province : '安徽',
    city : '合肥',
    area : '蜀山区',
    detail : '金寨路96号',
    name : '格物',  //收件人
    tel : '13966670000'
  }
User.addAddress(openID,address,function(err){return err});





