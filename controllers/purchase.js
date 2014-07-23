/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/*!
 * 下单购买
 * purhase
 */

var Order = require('../proxy').Order;
var User = require('../proxy').User;
var ShopHistory = require('../proxy').ShopHistory;

exports.updateOrder = function (req, res) {

  Order.createOrder(req,afterOrder);

  function afterOrder(err,order){
    if(err){
      console.log(err);
      res.send(err);
      return;
    }
    //更新用户的现金券
    User.updateCashVoucher(order,function(err){ if(err) res.send(err);});
    //更新用户的购物历史
    ShopHistory.updateHistory(order.openID,order.orderID,function(err){if(err) res.send(err);});
    //更新用户上线的现金券
    User.updatePreCash(order,function(err){ if(err) res.send(err);});
  }
}