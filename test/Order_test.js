var Order = require('../proxy').Order;
var info = {
	shopOnce : [
		{
			id : 'fy20140716001',
			number : 2
		},
		{
			id : 'fy20140716002',
			number : 8
		},
		{
			id : 'fy20140716003',
			number : 8
		}
	],
	address : {
    province : '安徽',
    city : '阜阳',
    area : '蜀山区',
    detail : 'String',
    name : '贺羽',  //收件人
    tel : '13966666666'
  },
  cashUse : 0,
  voucherUse : 0,
  totalPrice : 20
}
var openID = 'owaixtwzZUF3Qma5s8xH0N__mwK0';
/*
for(var i = 0; i< 10 ; i++){
	Order.createOrder(openID,info,function(err,order){
		console.log(JSON.stringify(order));
	})
}
*/

Order.getUserOrder(openID,function(err,result){
	console.log('--------------------------------------------------------');
	for (var i = 0; i < result.length; i++) {
		console.log('status:' + result[i].status);
		console.log(JSON.stringify(result[i]));
		console.log('--------------------------------------------------------');
	};
	
})