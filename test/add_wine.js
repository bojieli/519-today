var Wine = require('../models').Wine;
setTimeout(function(){
  wine = new Wine({
        id : "ksthjhy_001",
        name : "卡斯特*皇家花园",
        describe : "12度卡斯特*皇家花园750ml",
        marketPrice : 298,
        wechatPrice : 238,
        littlePic : "ksthjhy_001-1.jpg",
        details : {
          degree : 12,
          volume : 750,
          place : '法国'
        },
        bigPic : ["ksthjhy_001-1.jpg","ksthjhy_001-2.jpg"],
        tag : {
          winetype : " 红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine.save();

   wine1 = new Wine({
        id : "kstmxh_002",
        name : "卡斯特*玛茜红",
        describe : "12度卡斯特*玛茜红750ml",
        marketPrice : 218,
        wechatPrice : 178,
        littlePic : "kstmxh_002-1.jpg",
        details : {
          degree : 12,
          volume : 750,
          place : '法国'
        },
        bigPic : ["kstmxh_002-1.jpg","kstmxh_002-2.jpg"],
        tag : {
          winetype : "红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine1.save();

   wine2 = new Wine({
        id : "ksthjhygb_003",
        name : "卡斯特*皇家花园干白",
        describe : "12度卡斯特*皇家花园干白750ml ",
        marketPrice : 128,
        wechatPrice : 108,
        littlePic : "ksthjhygb_003-1.jpg",
        details : {
          degree : 12,
          volume : 750,
          place : '法国'
        },
        bigPic : ["ksthjhygb_003-1.jpg","ksthjhygb_003-2.jpg"],
        tag : {
          winetype : "红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine2.save();

  wine3 = new Wine({
        id : "ksthjhyhbs_004",
        name : "卡斯特*皇家花园红宝石",
        describe : "12度卡斯特*皇家花园红宝石750ml",
        marketPrice : 148,
        wechatPrice : 118,
        littlePic : "ksthjhyhbs_004-1.jpg",
        details : {
          degree : 12,
          volume : 750,
          place : '法国'
        },
        bigPic : ["ksthjhyhbs_004-1.jpg","ksthjhyhbs_004-2.jpg"],
        tag : {
          winetype : "红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine3.save();

   wine4 = new Wine({
        id : "ksthjhybed_005",
        name : "卡斯特*皇家花园波尔多",
        describe : "12度卡斯特*皇家花园波尔多750ml",
        marketPrice : 328,
        wechatPrice : 268,
        littlePic : "ksthjhybed_005-1.jpg",
        details : {
          degree : 12,
          volume : 750,
          place : '法国'
        },
        bigPic : ["ksthjhybed_005-1.jpg","ksthjhybed_005-2.jpg"],
        tag : {
          winetype : "红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine4.save();

  wine5 = new Wine({
        id : "ksthjhyzccxz_006",
        name : "卡斯特*皇家花园珍藏赤霞珠",
        describe : "12度卡斯特*皇家花园珍藏赤霞珠750ml",
        marketPrice : 208,
        wechatPrice : 168,
        littlePic : "ksthjhyzccxz_006-1.jpg",
        details : {
          degree : 12,
          volume : 750,
          place : '法国'
        },
        bigPic : ["ksthjhyzccxz_006-1.jpg","ksthjhyzccxz_006-2.jpg"],
        tag : {
          winetype : "红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine5.save();

wine25 = new Wine({
        id : "ccghch_009",
        name : "长城干红*醇和",
        describe : "12.5度长城干红*醇和750ml",
        marketPrice : 42,
        wechatPrice : 38,
        littlePic : "ccghch_009-1.jpg",
        details : {
          degree : 12.5,
          volume : 750,
          place : '中国'
        },
        bigPic : ["ccghch_009-1.jpg","ccghch_009-2.jpg"],
        tag : {
          winetype : "红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine25.save();


wine6 = new Wine({
        id : "ccghcxz_011",
        name : "长城干红*赤霞珠",
        describe : "12.5度长城干红*赤霞珠750ml",
        marketPrice : 66,
        wechatPrice : 52,
        littlePic : "ccghcxz_011-1.jpg",
        details : {
          degree : 12.5,
          volume : 750,
          place : '中国'
        },
        bigPic : ["ccghcxz_011-1.jpg","ccghcxz_011-2.jpg"],
        tag : {
          winetype : "红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine6.save();

  wine7 = new Wine({
        id : "ccghpj_012",
        name : "长城干红*普解",
        describe : "12.5度长城干红*普解750ml",
        marketPrice : 76,
        wechatPrice : 60,
        littlePic : "ccghpj_012-1.jpg",
        details : {
          degree : 12.5,
          volume : 750,
          place : '中国'
        },
        bigPic : ["ccghpj_012-1.jpg","ccghpj_012-2.jpg"],
        tag : {
          winetype : "红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine7.save();

    wine8 = new Wine({
        id : "ccgb_017",
        name : "长城干白",
        describe : "12度长城干白750ml",
        marketPrice : 46,
        wechatPrice : 36,
        littlePic : "ccgb_017-1.jpg",
        details : {
          degree : 12,
          volume : 750,
          place : '中国'
        },
        bigPic : ["ccgb_017-1.jpg","ccgb_017-2.jpg"],
        tag : {
          winetype : "红酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine8.save();

   wine9 = new Wine({
        id : "kzj30_039",
        name : "口子窖三十年",
        describe : "52度口子窖三十年500ml",
        marketPrice : 1260,
        wechatPrice : 1008,
        littlePic : "kzj30_039-1.jpg",
        details : {
          degree : 52,
          volume : 500,
          place : '安徽'
        },
        bigPic : ["kzj30_039-1.jpg","kzj30_039-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine9.save();


   wine10 = new Wine({
        id : "kzj20_040",
        name : "口子窖二十年",
        describe : "50度口子窖二十年500ml",
        marketPrice : 528,
        wechatPrice : 428,
        littlePic : "kzj20_040-1.jpg",
        details : {
          degree : 50,
          volume : 500,
          place : '安徽'
        },
        bigPic : ["kzj20_040-1.jpg","kzj20_040-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine10.save();

  wine11 = new Wine({
        id : "kzj10_041",
        name : "口子窖十年",
        describe : "41度口子窖十年500ml",
        marketPrice : 358,
        wechatPrice : 288,
        littlePic : "kzj10_041-1.jpg",
        details : {
          degree : 41,
          volume : 500,
          place : '安徽'
        },
        bigPic : ["kzj10_041-1.jpg","kzj10_041-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine11.save();

    wine12 = new Wine({
        id : "kzjxcj_042",
        name : "口子窖小池窖",
        describe : "41度口子窖小池窖500ml",
        marketPrice : 248,
        wechatPrice : 198,
        littlePic : "kzjxcj_042-1.jpg",
        details : {
          degree : 41,
          volume : 500,
          place : '安徽'
        },
        bigPic : ["kzjxcj_042-1.jpg","kzjxcj_042-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine12.save();

  wine13 = new Wine({
        id : "kzjred_043",
        name : "口子窖六年（红瓶）",
        describe : "41度口子窖六年（红瓶）450ml",
        marketPrice : 168,
        wechatPrice : 135,
        littlePic : "kzjred_043-1.jpg",
        details : {
          degree : 41,
          volume : 450,
          place : '安徽'
        },
        bigPic : ["kzjred_043-1.jpg","kzjred_043-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine13.save();

  wine14 = new Wine({
        id : "kzjgreen_044",
        name : "口子窖六年（绿瓶）",
        describe : "41度口子窖六年（ 绿瓶）400ml",
        marketPrice : 158,
        wechatPrice : 128,
        littlePic : "kzjgreen_044-1.jpg",
        details : {
          degree : 41,
          volume : 400,
          place : '安徽'
        },
        bigPic : ["kzjgreen_044-1.jpg","kzjgreen_044-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine14.save();

  wine15 = new Wine({
        id : "kzj5_045",
        name : "口子窖五年",
        describe : "40.8度口子窖五年400ml",
        marketPrice : 118,
        wechatPrice : 98,
        littlePic : "kzj5_045-1.jpg",
        details : {
          degree : 40.8,
          volume : 400,
          place : '安徽'
        },
        bigPic : ["kzj5_045-1.jpg","kzj5_045-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine15.save();

  wine26 = new Wine({
        id : "origin_046",
        name : "原味口子酒",
        describe : "40.8度原味口子酒450ml",
        marketPrice : 80,
        wechatPrice : 68,
        littlePic : "origin_046-1.jpg",
        details : {
          degree : 40.8,
          volume : 450,
          place : '安徽'
        },
        bigPic : ["origin_046-1.jpg","origin_046-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine26.save();

  wine16 = new Wine({
        id : "fly_047",
        name : "飞天茅台",
        describe : "53度飞天茅台500ml",
        marketPrice : 1190,
        wechatPrice : 958,
        littlePic : "fly_047-1.jpg",
        details : {
          degree : 53,
          volume : 500,
          place : '贵州'
        },
        bigPic : ["fly_047-1.jpg","fly_047-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine16.save();

  wine17 = new Wine({
        id : "wuliangye_055",
        name : "五粮液",
        describe : "52度五粮液500ml",
        marketPrice : 780,
        wechatPrice : 628,
        littlePic : "wuliangye_055-1.jpg",
        details : {
          degree : 52,
          volume : 500,
          place : '四川'
        },
        bigPic : ["wuliangye_055-1.jpg","wuliangye_055-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine17.save();

    wine18 = new Wine({
        id : "jiananchun_048",
        name : "剑南春",
        describe : "52度剑南春500ml",
        marketPrice : 460,
        wechatPrice : 368,
        littlePic : "jiananchun_048-1.jpg",
        details : {
          degree : 52,
          volume : 500,
          place : '四川'
        },
        bigPic : ["jiananchun_048-1.jpg","jiananchun_048-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine18.save();

   wine19 = new Wine({
        id : "gujing8_049",
        name : "古井贡酒八年",
        describe : "50度古井贡酒八年425ml",
        marketPrice : 358,
        wechatPrice : 288,
        littlePic : "gujing8_049-1.jpg",
        details : {
          degree : 50,
          volume : 425,
          place : '安徽'
        },
        bigPic : ["gujing8_049-1.jpg","gujing8_049-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine19.save();

  wine20 = new Wine({
        id : "gujing5_050",
        name : "古井贡酒五年",
        describe : "45度古井贡酒五年425ml",
        marketPrice : 188,
        wechatPrice : 150,
        littlePic : "gujing5_050-1.jpg",
        details : {
          degree : 45,
          volume : 425,
          place : '安徽'
        },
        bigPic : ["gujing5_050-1.jpg","gujing5_050-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine20.save();

  wine21 = new Wine({
        id : "gujinggift_051",
        name : "古井贡酒献礼",
        describe : "45度古井贡酒献礼500ml",
        marketPrice : 118,
        wechatPrice : 98,
        littlePic : "gujinggift_051-1.jpg",
        details : {
          degree : 45,
          volume : 500,
          place : '安徽'
        },
        bigPic : ["gujinggift_051-1.jpg","gujinggift_051-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine21.save();

  wine22 = new Wine({
        id : "yingjiagold_052",
        name : "迎驾金星",
        describe : "42度迎驾金星450ml",
        marketPrice : 116,
        wechatPrice : 94,
        littlePic : "yingjiagold_052-1.jpg",
        details : {
          degree : 42,
          volume : 450,
          place : '安徽'
        },
        bigPic : ["yingjiagold_052-1.jpg","yingjiagold_052-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine22.save();

  wine23 = new Wine({
        id : "yingjiasilver_053",
        name : "迎驾银星",
        describe : "42度迎驾银星450ml",
        marketPrice : 98,
        wechatPrice : 78,
        littlePic : "yingjiasilver_053-1.jpg",
        details : {
          degree : 42,
          volume : 450,
          place : '安徽'
        },
        bigPic : ["yingjiasilver_053-1.jpg","yingjiasilver_053-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine23.save();

  wine24 = new Wine({
        id : "yingjiacao_054",
        name : "迎驾糟坊",
        describe : "42度迎驾糟坊450ml",
        marketPrice : 45,
        wechatPrice : 36,
        littlePic : "yingjiacao_054-1.jpg",
        details : {
          degree : 42,
          volume : 450,
          place : '安徽'
        },
        bigPic : ["yingjiacao_054-1.jpg","yingjiacao_054-2.jpg"],
        tag : {
          winetype : "白酒",
          isRecommend : true
        },
        visitNum : 0,
        purchaseNum : 0
  });
  wine24.save();

  console.log('Ok!');
},1000);
