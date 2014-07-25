var ShopHistory = require('../proxy').ShopHistory;

exports.getUserOrder = function (req, res, next) {
  ShopHistory.getUserOrder(req.session.openID,function(err, orderInfos){
    if(err) return next(err);
    res.send(orderInfos);
  });
}