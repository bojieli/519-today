var Order = require('../proxy').Order;

exports.getUserOrder = function (req, res, next) {
  	Order.getUserOrder(req.session.openID,function(err, orderInfos){
    if(err) return next(err);
/*
    console.log('--------------------------------------------------------');
	for (var i = 0; i < orderInfos.length; i++) {
		console.log('status:' + orderInfos[i].status);
		console.log(JSON.stringify(orderInfos[i]));
		console.log('--------------------------------------------------------');
	};
*/
    res.send(orderInfos);
  });
}