var congfig = require('../config');
var errUtil = require('./wrap_error');
var models = require('../models');
var Order = models.Order;


/**用户提交订单以后保存订单信息
* Callback:
* - err
* - order:
* req:传入的订单参数
*/

exports.createOrder = function(req,cb){
  var orderID = getOrderID();
  var info = req.body;
  var order = {};
  if(info.dialComfirm){//使用电话确认
    order = {
      orderID : orderID,
      openID : req.session.openID,
      confirmTel : info.confirmTel,
      shopOnce : info.shopOnce,
      address : {},
      cashUse : info.cashUse || 0,
      voucherUse : info.voucherUse || 0,
      status : 0,
      totalPrice : info.totalPrice
    };
  }else{
    order = {
      orderID : orderID,
      openID : req.session.openID,
      confirmTel : info.address.tel,//确认电话默认地址中的联系方式
      shopOnce : info.shopOnce,
      address : info.address,
      cashUse : info.cashUse || 0,
      voucherUse : info.voucherUse || 0,
      status : 0,
      totalPrice : info.totalPrice
    };
  }
  Order.create(order,afterCreate);

  function afterCreate(err,order){
    if(err){
      errUtil.wrapError(err,congfig.errorCode_create,"createOrder()","/proxy/order",{req:req});
      return cb(er,null);
    }else{
      cb(err,order);
    }
  }
}


/*function getRandom(length){
  return Math.floor(Math.random() * Math.pow(10,length));
}*/

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
  if(global.orderID_increment < 9999){
    global.orderID_increment++;
  }else{
    global.orderID_increment = 0;
  }
  var datePart = leftPadString(date.getUTCFullYear().toString(),1) +
                    leftPadString(date.getUTCMonth() + 1,2) +
                    leftPadString(date.getUTCDate(),2) +
                    leftPadString(date.getUTCHours(),2) +
                    leftPadString(date.getUTCMinutes(),2) +
                    leftPadString(date.getUTCSeconds(),2) +
                    leftPadString(global.orderID_increment,4)

  /*var randomPart = leftPadString(getRandom(randomLength),randomLength);*/

  return datePart;
}