var Wine = require('../models').Wine;
function addWine(id, name, marketPrice, wechatPrice, degree, volume){
  var wine = new Wine({
    id : "jzz_0" + id,
    name : name,
    describe : degree + "度"+name+ volume + "ml",
    marketPrice : marketPrice,
    wechatPrice : wechatPrice,
    littlePic : "jzz_0" + id +"-2.jpg",
    details : {
      degree : 43,
      volume : 460,
      place : '阜阳'
    },
    bigPic : ["jzz_0" + id +"-1.jpg","jzz_0" + id +"-2.jpg"],
    tag : {
      winetype : "白酒",
      isRecommend : true
    },
    visitNum : 0,
    purchaseNum : 0
  })
  wine.save();
}
setTimeout(action, 500);
function action(){
  addWine(26, '老窖池龙窖', 268, 268, 53, 460);
  addWine(20, '金种子一坛好酒', 1680, 65, 1500);
  addWine(21, '徽蕴金种子十年', 588, 588, 46, 500);
  addWine(22, '徽蕴金种子六年', 268, 268, 42, 460);
  addWine(23, '中华和泰', 688, 688, 46, 460);
  addWine(24, '和泰吉泰', 188, 188, 40.2, 400);
  addWine(25, '和泰大运', 288, 288, 43, 460);
  addWine(26, '老窖池龙窖', 268, 268, 53, 460);
  addWine(27, '老窖池凤窖', 168, 168, 40, 460);
  addWine(28, '天韵醉三秋', 188, 188, 40, 460);
  addWine(29, '地蕴醉三秋', 118, 118, 40, 460);
  addWine(30, '紫金版地蕴醉三秋', 118, 118, 40, 460);
  addWine(31, '喜庆醉三秋', 68, 68, 40, 460);
  addWine(32, '铁盒醉三秋', 58, 58, 52, 460);
  addWine(33, '防伪醉三秋', 35, 35, 42, 500);
  addWine(34, '白金级柔和经典种子酒', 148, 148, 40, 460);
  addWine(35, '柔和种子酒', 88, 88, 40, 460);
  addWine(36, '祥和种子酒', 68, 68, 40, 460);
  addWine(37, '红花经典种子窖', 48, 48, 40, 460);
}