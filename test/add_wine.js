var Wine = require('../models').Wine;

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
  console.log('Ok!');*/