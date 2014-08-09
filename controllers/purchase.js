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

  Order.createOrder(req.session.openID,req.body,afterOrder);

  function afterOrder(err,order){
    //更新用户的现金券
    if(err){
      res.send({message : 'error', error : err.errCode}) ;
      return next(err);
    }
    
    //更新用户的现金券
    User.updateCashVoucher(order,function(err){ 
        if(err){ 
          res.send({message : 'error', error : err.errCode}) ;
          return next(err);
        }
        res.send({message : 'OK', error : 0});
    });
    //更新用户上线的现金券
    //现金券应该在收到钱，确认收款后才能收款
    //User.updatePreCash(order,function(err){ if(err) res.send(err);});
  }
}