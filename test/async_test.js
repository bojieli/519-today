var async = require('async');
var models = require('../models');
var config = require('../config');
var ShopHistory = models.ShopHistory;
var Order = models.Order;
var Wine = models.Wine;

async.waterfall([
	function openIDIn(cb){
		cb(null, 'owaixtwzZUF3Qma5s8xH0N__mwK0');
	},
	function findHistorysbyOpenID(openID, cb){
		console.log(openID);
    	ShopHistory.findOne({openID : openID}, cb);
	},
	function findPreOrdersbyHistory(historyOrders,cb){
		console.log(historyOrders);
		Order.find({orderID : {$in : historyOrders.orderList}},cb);
	},
	function findOrdersbyPreOrders(preOrders, cb){
	
		var orders = [];
		var confirmedNum = 0;
      	for (var i = 0; i < preOrders.length; i++) {
	        if(preOrders[i].status===0){
	          orders.push(preOrders[i]);
	        }
	        else{
	          	if(confirmedNum < 5){
		            orders.push(preOrders[i]);
		            confirmedNum++;
	        	}
        	}
      	};
      	cb(null, orders);
	},
	function findReturnOrdersbyOrders (orders, cb){
		
		var returnOrders = [];
		var winesCounts = 0;
		
	
		for (var i = 0; i < orders.length; i++) {
			returnOrderHandle(i);
		}
		function returnOrderHandle(i){
			var returnOrder = {};
			returnOrder.orderID = orders[i].orderID;
	        returnOrder.status = orders[i].status;
	        returnOrder.wines = [];
	        var idList = [];
	        for (var j = 0; j < orders[i].shopOnce.length; j++) {
				idList.push(orders[i].shopOnce[j].id);
			}
			console.log('==================idList=====================');
			console.log(idList);

			Wine.find({id : {$in : idList}},"describe wechatPrice littlePic",function(err,wines){
				if(err) return cb(err);
				console.log('==================wines=====================');
				console.log(wines);
				winesCounts++;
				for (var j = 0; j < wines.length; j++) {
					wines[j].littlePic = config.small_dir + wines[j].littlePic;
					wines[j].num = orders[i].shopOnce[j].number;
				};
				returnOrder.wines = wines;
				returnOrders.push(returnOrder);
				if(winesCounts == orders.length)
					cb(null,returnOrders);
			});
		}
	}
	],
	function (err,returnOrders){
		console.log('==================returnOrders=====================');
		console.log(returnOrders);
	}
);
/* -orderInfos : [{
                orderID :
                status : 0表示未确认，1表示已确认
                wines:[{describe : String,
                wechatPrice : Number,
                littlePic : String,
                num:Number}]
                }]
                */
