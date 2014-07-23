var congfig = require('../config');
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
  console.log("======================info=================");
  console.log(info);
  var order = {};
  if(info.dialComfirm){//使用电话确认
    order = {
      orderID : orderID,
      openID : req.session.openID,
      confirmTel : info.confirmTel,
      shopOnce : info.shopOnce,
      address : {},
      date : Date.now,
      cashUse : info.cashUse,
      voucherUse : info.voucherUse,
      statue : false,
      totalPrice : info.totalPrice
    };
  }else{
    order = {
      orderID : orderID,
      openID : req.session.openID,
      confirmTel : info.address.tel,//确认电话默认地址中的联系方式
      shopOnce : info.shopOnce,
      address : info.address,
      date : Date.now,
      cashUse : info.cashUse,
      voucherUse : info.voucherUse,
      statue : false,
      totalPrice : info.totalPrice
    };
  }
  Order.create(order,afterCreate);

  function afterCreate(err,order){
    if(err){
      return cb(congfig.errorCode_create);
    }else{

      cb(err,order);
    }
  }
}

function getRandom(length){
  return Math.floor(Math.random() * Math.pow(10,length));
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
  var randomLength = 4;
  var date = new Date();
  var datePart = date.getUTCFullYear().toString() +
                    date.getUTCMonth().toString() +
                    date.getUTCDate().toString() +
                    date.getUTCHours().toString() +
                    date.getUTCMinutes().toString() +
                    date.getUTCSeconds().toString() +
                    date.getUTCMilliseconds().toString();

  var randomPart = leftPadString(getRandom(randomLength),randomLength);

  return 'f' + datePart + '_' + randomPart;
}