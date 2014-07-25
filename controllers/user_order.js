var ShopHistory = require('../proxy').ShopHistory;

exports.getUserOrder = function (req, res, next) {
	console.log("===========getUserOrder==========");
  ShopHistory.getUserOrder(req.session.openID,function(err, orderInfos){
    console.log("================getuse=====");
    console.log(orderInfos);
    console.log(orderInfos[0].wines);
    console.log(orderInfos[1].wines);
    if(err) return next(err);
    res.send(orderInfos);
  });
}