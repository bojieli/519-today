var config = require('../config');
var errUtil = require('./wrap_error');
var models = require('../models');
var ShopHistory = models.ShopHistory;
var Order = models.Order;
var Wine = models.Wine;

/** 根据用户的openID获取购物历史
* Callback:
* - err
* - wines
*/

exports.getHistory = function(openID,cb){
  ShopHistory.findOne({openID : openID},historyFind);

  function historyFind(err,shop_history){
    if(err) {
      errUtil.wrapError(err,config.errorCode_find,"getHistory().historyFind()","/proxy/shop_history",{
        openID:openID
      });
      return(err,null);
    }

    if(shop_history){
      Order.find({orderID : {$in : shop_history.orderList}},orderFind);
    }

  }

  function orderFind(err,orders){
    if(err){
      errUtil.wrapError(err,config.errorCode_find,"getHistory().orderFind()","/proxy/shop_history",{
        openID:openID
      });
      return(err,null);
    }

    if(orders){
      var idList = [];
      for(var i = 0, order_l = orders.length; i < order_l; i++){
          var shopOnce = orders[i].shopOnce;

          for(var j = 0, shoponce_l = shopOnce.length;j < shoponce_l; j++){
            var id = shopOnce[j].id;
            if(idList.indexOf(id) === -1){
              idList.push(id);
            }
          }
      }

      Wine.find({id : {$in : idList}},wineFind);
    }
  }

  function wineFind(err,wines){
   if(err){
      errUtil.wrapError(err,config.errorCode_find,"getHistory().wineFind()","/proxy/shop_history",{openID:openID});
      return(err,null);
    }else{
      cb(err,wines);
    }

  }
}


/**根据openID和orderID来更新插入用户的购物记录
* Callback :
* -err
* @param{String} openID :
* @param{String} orderID :
*/
exports.updateHistory = function(openID,orderID,cb){
  ShopHistory.update({openID : openID},{$push : {orderList : orderID}},{upsert : true},afterUpdate);

  function afterUpdate(err,shop_history){
   if(err){
      errUtil.wrapError(err,config.errorCode_update,"updateHistory()","/proxy/shop_history",{
        openID:openID,
        orderID:orderID
      });
      return(err);
    } else{
      cb(err);
    }
  }
}

/** 根据用户openID返回用户的订单信息
* Callback:
* -err
* -orderInfos : [{
                orderID :
                status : 0表示未确认，1表示已确认
                wines:[{describe : String,
                wechatPrice : Number,
                littlePic : String,
                num:Number}]
                }]

*/


exports.getUserOrder = function(openID,cb){
  ShopHistory.findOne({openID : openID},afterFind);
  var orderInfos = [];
  function histotyFind(err,shop_history){
   if(err){
      errUtil.wrapError(err,config.errorCode_find,"getUserOrder().histotyFind()","/proxy/shop_history",{
        openID:openID,
      });
      return(err);
    }

    var orderList = shop_history.orderList;
    Order.find({orderID : {$in : orderList}},orderFind);
  }

  function orderFind(err,orders){
    if(err){
       errUtil.wrapError(err,config.errorCode_find,"getUserOrder().orderFind()","/proxy/shop_history",{
        openID:openID,
      });
      return(err);
    }

    var confirmedNum = 0;
    var returnOrders = [];
    for(var i = 0; i <= orders.length;i++){
      var currOrder = orders[i];
      if(currOrder.status === 0 ||confirmedNum <= 5){
        if(confirmedNum <= 5){
          confirmedNum ++;
        }

        var returnOrder = {};
        returnOrder.orderID = currOrder.orderID;
        returnOrder.status = currOrder.status;
        returnOrder.wines = [];
        var shopOnce = currOrder.shopOnce;

        var idList = [];
        var numList = [];
        for(var j = 0;j < shopOnce.length;j++){
          idList.push(shopOnce[j].id);
          numList.push(shopOnce[j].number);
        }

        Wine.find({id : {$in : idList}},"describe wechatPrice littlePic",function(err,wines){
          if(err || wines.length != idList.length){
            errUtil.wrapError(err,config.errorCode_find,"getUserOrder().wineFind()","/proxy/shop_history",{
              openID:openID
            });
            return(err);
          }

          for(var j = 0; j < idList.length;j++){
            var wineInfo = {};
            wineInfo.num = numList[j];
            wineInfo.describe = wines[j].describe;
            wineInfo.wechatPrice = wines[j].wechatPrice;
            wineInfo.littlePic = config.small_dir + wines[j].littlePic;
            returnOrder.wines.push(wineInfo);
          }

        });
        returnOrders.push(returnOrder);
      }
    }
    cb(err,returnOrders);
  }
}
