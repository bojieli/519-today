var Order = require('../proxy').Order;

exports.getUserOrder = function (req, res, next) {

  	Order.getUserOrder(req.session.openID,function(err, orderInfos){
    if(err) return next(err);
    res.send(orderInfos);
  });
}