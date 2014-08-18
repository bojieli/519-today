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

var api = require('../common/api');

exports.updateOrder = function (req, res, next) {

  Order.createOrder(req.session.openID,req.body,afterOrder);

  function afterOrder(err,order){
    //更新用户的现金券
    if(err){
      res.send({message : 'error', error : err.errCode}) ;
      return next(err);
    }
    var messageText = "您已经成功下单，订单编号:\n"+order.orderID+"\n需支付现金"+
        order.totalPrice+"元\n我们的快递人员即将送货上门，请保持手机号码"+order.address.tel+
        "通畅，如需帮助可拨打客服电话：\n\n0558-88888888";
    api.sendText(req.session.openID, messageText, function(err){
      if(err){
        return next(err);
      }
    });
    //更新用户的现金券
    User.updateCashVoucher(order,function(err){
        if(err){
          res.send({message : 'error', error : err.errCode}) ;
          return next(err);
        }
        res.send({message : 'OK', error : 0});
    });

}
}