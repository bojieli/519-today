var congfig = require('../config');
var errUtil = require('./wrap_error');
var models = require('../models');
var Order = models.Order;
var async = require('async');
var Wine = require('../proxy').Wine;
var config = require('../config');


/**用户提交订单以后保存订单信息
* Callback:
* - err
* - order:
* req:传入的订单参数
*/

exports.createOrder = function(openID,info,cb){
  var orderID = getOrderID();
  var order = {};
  async.waterfall([
    function _isFirst (callback){
      Order.findOne({'address.tel' : info.address.tel}, callback);
    },
    function createorder(order, callback){
      var isFirst;
      if(order)
        isFirst = false;
      else
        isFirst = true;
      order = {
        orderID : orderID,
        openID : openID,
        shopOnce : info.shopOnce,
        address : info.address,
        cashUse : info.cashUse || 0,
        voucherUse : info.voucherUse || 0,
        status : 1,
        isFirst : isFirst,
        totalPrice : info.totalPrice,
      };
      Order.create(order, callback);
    }],
    function afterCreate(err,order){
      if(err){
        errUtil.wrapError(err,congfig.errorCode_create,"createOrder()","/proxy/order",{req:req});
        return cb(err);
      }else{
        cb(err,order);
      }
    }
  );
  
  

  
}
/* -orderInfos : [{
                orderID :
                status : 0表示未确认，1表示已确认
                wines:[{describe : String,
                wechatPrice : Number,
                littlePic : String,
                num:Number}]
                }]
                */
exports.getUserOrder = function (openID, cb){
  var returnOrders = [];
  async.waterfall([
      function findOrdersbyOpenID (callback){
        Order.find({openID: openID}, callback);
      },
      function findWinesbyOrders(orders, callback){
        if(orders.length==0)
          return callback(null,[]);
        var Wineids = [];
        var count = 0;

        for (var i = 0; i < orders.length; i++) {
          if((orders[i].status < 5)||count++ < 5){
            var returnOrder = {};
            returnOrder.orderID = orders[i].orderID;
            returnOrder.time = orders[i].date.getFullYear() + '/' +
            orders[i].date.getMonth() + '/' + 
            orders[i].date.getDate() + '  ' +
            orders[i].date.getHours() + ':' +
            orders[i].date.getMinutes();
            if(orders[i].status==5)
              returnOrder.status = 1;
            else
              returnOrder.status = 0;
            returnOrder.wines = [];
            for (var j = 0; j < orders[i].shopOnce.length; j++) {
              Wineids.push(orders[i].shopOnce[j].id);
              var wine = {
                id : orders[i].shopOnce[j].id,
                num : orders[i].shopOnce[j].number
              };
              returnOrder.wines.push(wine);
            };
            returnOrders.push(returnOrder);
          }
        };
        Wine.findByIDs (Wineids, callback);
      }     
    ],
    function GenerateOrderInfos(err, Wines){
      if(err)
        cb(err);
      for (var i = 0; i < returnOrders.length; i++) {

        for (var j = 0; j < returnOrders[i].wines.length; j++) {
          var index = findWinebyid(returnOrders[i].wines[j].id);
          returnOrders[i].wines[j].describe = Wines[index].describe;
          returnOrders[i].wines[j].wechatPrice = Wines[index].wechatPrice;
          returnOrders[i].wines[j].littlePic = config.small_dir + Wines[index].littlePic;

          delete returnOrders[i].wines[j].id;
        };
      };
      returnOrders.reverse();
      cb(null, returnOrders);
      function findWinebyid(id){
        for (var i = 0; i < Wines.length; i++){
          if(Wines[i].id == id)
            return i;
        };
      }
    }
  );
}

function leftPadString(value,length){
  var valueString = value.toString();
  if(valueString.length >= length){
    return valueString.substr(0,length);
  }else{
    var pad = "";
    for(var i = 0;i < length - valueString.length; i++){
      pad = pad + "0";
    }
    return pad + valueString;
  }
}


function getOrderID(){
  var date = new Date();
  var orderID_increment = ++ global.orderID_increment;
  if(global.orderID_increment > 9990)
    global.orderID_increment = 0;
 
  var datePart = leftPadString(date.getUTCFullYear().toString(),1) +
                    leftPadString(date.getUTCMonth() + 1,2) +
                    leftPadString(date.getUTCDate(),2) +
                    leftPadString(date.getUTCHours(),2) +
                    leftPadString(date.getUTCMinutes(),2) +
                    leftPadString(date.getUTCSeconds(),2) +
                    leftPadString(orderID_increment,4)
  return datePart;
}