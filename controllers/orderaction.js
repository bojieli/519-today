var async = require('async');
var Order = require('../proxy').Order;
var User = require('../proxy').User;
var ShipStaff = require('../proxy').ShipStaff;
var wechatAPI = require('../common/api');

exports.load = function (req, res, next){
  ShipStaff.findByOpenID(req.session.openID,function(err,shipstaff){
    if(err){
      return next(err);
    }
    if(shipstaff){
        var data = {};
        async.auto({
          _order : function(callback){
            Order.findbyOrderID(req.query.orderID, callback);
          },
          _generateOrder : ['_order', function(callback, results) {
            if(!results._order)
              return callback(null, null);
            Order.generateDetail(results._order, callback);
          }]
        },function(err, results){
          if(err){
            return next(err);
          }
          if(results._order){
            data.order = results._generateOrder ;
            res.render('order_action',data);
          }
      });
    }else{
      res.send("您不是快递人员，不允许访问！");
    }
  });
}
}

//当快递点击确认发货和收货的动作，注意确认收货时需要给上线返现
exports.operate = function(req,res,next){
  var postData = req.body;
  ShipStaff.findByOpenID(req.session.openID,function(err,shipstaff){
    if(err){
      return next(err);
    }
    if(shipstaff){
      async.auto({
        _setStatus : function(callback){
          if(postData.method == 'ship'){
            Order.setStatus(postData.orderID,4,callback);
          }else if(postData.method == "receive"){
            Order.setStatus(postData.orderID,5,callback);
          }
        },
        _updateShipDate : function(callback){
          if(postData.method == 'ship'){
            Order.setShipDate(postData.orderID,callback);
          }else if(postData.method == 'receive'){
            Order.setReceiveDate(postData.orderID,callback);
          }
        },
        _setShipStaff : function(callback){
          if(postData.method == "ship"){
           Order.setShipStaff(postData.orderID,req.session.openID,callback);
          }
        },
        _getOrder: function(callback){
          Order.findbyOrderID(postData.orderID, callback);
        },
      },function(err,results){
        var order = results._getOrder;
        if(err || !order){
          res.send({code:"error"});
          return next(err);
        }
        var message;
        if(postData.method == 'ship'){
          message = "您的订单" + order.orderID + "已发货，预计到达时间为" + postData.arrivetime + "以内，如有特殊情况,请与快递员联系,联系电话：" + shipstaff.tel;
        }else if(postData.method == 'receive'){
          message = "您的订单" + order.orderID + "已收货，如出现问题,请联系客服！联系电话：" + "51951919";
           //更新用户上线的现金券
          //现金券应该在收到钱，确认收款后才能收款
          User.updatePreCash(order,function(err){ if(err){
              return next(err);
            }
          });
        }

        wechatAPI.sendText(order.openID,message,function(err){
          if(err){
            next(err);
          }
          res.send({code: "ok"});
          console.log("send message");
        });

      });
    }
}