var config = require('../config');
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
    if(err || !shop_history) cb(config.errorCode_find,null);

    if(shop_history){
      Order.find({orderID : {$in : shop_history.orderList}},orderFind);
    }

  }

  function orderFind(err,orders){
    if(err || !orders) cb(config.errorCode_find,null);

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
      cb(config.errorCode_find,null);
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
      console.log('======================++++++++++++++++++++++');
      console.log(err);
      cb(config.errorCode_update);
    } else{
      cb(err);
    }
  }
}