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

exports.updateOrder = function (req, res, next) {

  Order.createOrder(req,afterOrder);

  function afterOrder(err,order){
    console.log("afterOrder");
    if(err){
<<<<<<< HEAD
      console.log("+++++++++++++++++++++++++");
      console.log(err);
      res.send(err);
      return;
    }
    //更新用户的现金券
    console.log(order);
=======
      if(err) return next(err);
    }
    //更新用户的现金券
>>>>>>> bc6a7e57916f0e0e465ccfe560c6ea027b8ec16c
    User.updateCashVoucher(order,function(err){ 
      console.log("updateCashVoucher");
      if(err){ 
<<<<<<< HEAD
        console.log(err);
        res.send(err);
        return;
=======
        if(err) return next(err);
>>>>>>> bc6a7e57916f0e0e465ccfe560c6ea027b8ec16c
      }
    });
    //更新用户的购物历史
    ShopHistory.updateHistory(order.openID,order.orderID,function(err){
      if(err){
        return next(err);
      }
       res.send({message : 'OK', error : 0});
    });
    //更新用户上线的现金券
    //现金券应该在收到钱，确认收款后才能收款
    //User.updatePreCash(order,function(err){ if(err) res.send(err);});
  }
}