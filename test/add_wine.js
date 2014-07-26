var Wine = require('../models').Wine;

  wine = new Wine({
        id : "fy20140716005",
        name : "汾酒",
        describe : "53度汾酒蓝瓷475ml",
        marketPrice : 118,
        wechatPrice : 88,
        littlePic : "fy20140716005_s.jpg",
        details : {
          degree : 53,
          volume : 475,
          place : '阜阳'
        },
        bigPic : ["fy20140716005_l_01.jpg","fy20140716005_l_02.jpg"],
        tag : {
          type : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine.save();
   wine1 = new Wine({
        id : "fy20140716006",
        name : "剑南春",
        describe : "52度名酒水晶剑南春500ml浓香型白酒",
        marketPrice : 358,
        wechatPrice : 308,
        littlePic : "fy20140716006_s.jpg",
        details : {
          degree : 52,
          volume : 500,
          place : '阜阳'
        },
        bigPic : ["fy20140716006_l_01.jpg","fy20140716006_l_02.jpg"],
        tag : {
          type : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine1.save();
   wine2 = new Wine({
        id : "fy20140716007",
        name : "郎酒",
        describe : "53度红花郎酒十年陈酿500ml ",
        marketPrice : 258,
        wechatPrice : 208,
        littlePic : "fy20140716007_s.jpg",
        details : {
          degree : 53,
          volume : 500,
          place : '阜阳'
        },
        bigPic : ["fy20140716007_l_01.jpg","fy20140716007_l_02.jpg"],
        tag : {
          type : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine2.save();

  wine3 = new Wine({
        id : "fy20140716008",
        name : "国窖1573",
        describe : "50度国窖1573蓝花釉(大师装)573ml",
        marketPrice : 980,
        wechatPrice : 880,
        littlePic : "fy20140716008_s.jpg",
        details : {
          degree : 50,
          volume : 573,
          place : '阜阳'
        },
        bigPic : ["fy20140716008_l_01.jpg","fy20140716008_l_02.jpg"],
        tag : {
          type : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine3.save();
  console.log('Ok!');