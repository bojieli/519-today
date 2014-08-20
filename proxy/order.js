var congfig = require('../config');
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
  async.auto({
    _isFirst : function(callback){
      Order.findOne({'address.tel' : info.address.tel}, callback);
    },
    _getWineInfo : function(callback){
      var ids = [];
      for (var i = 0; i < info.shopOnce.length; i++) {
        ids.push(info.shopOnce[i].id);
      };
      Wine.findByIDs(ids,callback);
    },
    _createorder :["_isFirst","_getWineInfo", function(callback,results){
      var isFirst;
      if(results._isFirst)
        isFirst = false;
      else
        isFirst = true;
      var wines = results._getWineInfo;

      for (var i = 0; i < info.shopOnce.length; i++) {
        var index = findWinebyid(info.shopOnce[i].id);
        info.shopOnce[i].describe = wines[index].describe;
        info.shopOnce[i].wechatPrice = wines[index].wechatPrice;
        info.shopOnce[i].littlePic = config.small_dir + wines[index].littlePic;
      }

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

      function findWinebyid(id){
        for (var i = 0; i < wines.length; i++) {
          if(id == wines[i].id)
            return i;
        }
      }
    }]},
    function (err,results){
      if(err){
        return cb(err,null);
      }
      cb(null,results._createorder);
    });
}

exports.findbyOrderID = function(orderID, cb){
  Order.findOne({'orderID' : orderID},cb);
}

exports.generateDetail = function (order, cb){
  var data = {};
  data.orderID = order.orderID;
  data.status = order.status;
  data.date = formatDate(order.date);
  data.shipDate = formatDate(order.shipDate);
  data.receiveDate = formatDate(order.receiveDate);
  data.isFirst = order.isFirst;
  data.address = order.address;
  data.notes = order.notes;
  data.cashNeeded = order.totalPrice;
  data.cashTotal = order.cashUse + order.voucherUse + order.totalPrice;
  data.coupon = order.cashUse;
  data.voucher = order.voucherUse;
  data.shopOnce = order.shopOnce;
  data.dispatchCenter = order.dispatchCenter;
  data.shipStaff = order.shipStaff;
  data.customerService = order.customerService;
  cb(null, data);
}

exports.setStatus = function (orderID, status, cb){
  Order.update({'orderID' : orderID},{$set:{'status' : status}}, cb);
}

exports.setShipDate = function(orderID, cb){
  Order.update({'orderID' : orderID},{$set:{'shipDate' : new Date()}}, cb);
}

exports.setReceiveDate = function(orderID, cb){
  Order.update({'orderID' : orderID},{$set:{'receiveDate' : new Date()}}, cb);
}

exports.setShipStaff = function(orderID, shipStaff, cb){
  Order.update({'orderID' : orderID},{$set:{'shipStaff' : shipStaff}}, cb);
}
exports.setCustomerService = function(orderID, customerService, cb){
  Order.update({'orderID' : orderID},{$set:{'customerService' : customerService}}, cb);
}

/* 获取用户的购物历史，返回最多5条已收货订单和所有的未收货订单
                */
exports.getUserOrder = function (openID, cb){
  var returnOrders = [];
  async.waterfall([
      function findOrdersbyOpenID (callback){
        Order.find({openID: openID}, callback);
      },
      function findWinesbyOrders(orders, callback){
        if(orders.length==0)
          return callback(null);
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
            returnOrder.wines = orders[i].shopOnce;
            returnOrders.push(returnOrder);
          }
        }
        callback(null);
    }],
    function(err){
      if(err)
        return cb(err,[]);
      returnOrders.reverse();
      cb(null,returnOrders);
    });
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