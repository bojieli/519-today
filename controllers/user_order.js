var ShopHistory = require('../proxy').ShopHistory;

exports.getUserOrder = function (req, res, next) {
	console.log("===========getUserOrder==========");
  ShopHistory.getUserOrder(req.session.openID,function(err, orderInfos){
    console.log(err+"++++++++++++++++++++++++");
    if(err) return next(err);
    console.log(orderInfos);
    res.send(orderInfos);
  });
}