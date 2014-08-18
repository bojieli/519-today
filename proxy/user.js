var config = require('../config');
var models = require('../models');
var Withdrawal = require('./withdrawal');
var User = models.User;
var async = require('async');

/**
* 根据用户的openID查找用户
* Callback:
* - err, 数据库异常
* - user,用户
& @param {String} openID
* @param {Function} cb
*/
exports.getUserByOpenID = function(openID,cb){
  User.findOne({ openID : openID },cb);
}


/**
* vertify:通过网络链接vertify,写入用户信息
* callback:
* - err
*/
exports.afterVertify = function(openID,preOpenID,basicInfo,cb){

  User.findOne({openID : openID},afterFind);

  function afterFind(err,user){
    if(err)
      return cb(err);
    if(user){
      if(preOpenID && basicInfo){
        User.update({openID : openID},
                    {$set: {preOpenID : preOpenID,basicInfo:basicInfo}},
                    afterUpdate);
      }else if(preOpenID && !basicInfo){
        User.update({openID : openID},
                    {$set: {preOpenID : preOpenID}},
                    afterUpdate);
      }else if(!preOpenID && basicInfo){
        User.update({openID : openID},
                    {$set: {basicInfo:basicInfo}},
                    afterUpdate);
      }
    }else{

      var sceneID = getSceneID();
      var newUser = {
        openID : openID,
        preOpenID : preOpenID,
        sceneID :sceneID,
        basicInfo : basicInfo,
        hasFollow : false,
        cash : 0,
        voucher :[],
        currentAddress :{},
        address : []
      }

      User.create(newUser,afterCreate);
    }
  }

  function afterUpdate(err){
    if(err)
      return cb(err);
  }

  function afterCreate(err,user){
  if(err) {
      return cb(err);
    }else if(user){
      global.sceneID_web_count++;
    }

  }

  function getSceneID(){
    return config.SCENEID_BASE + global.sceneID_web_count + 1;
  }
}
/**
* 根据用户的openID查找用户的现金券和代金券
* Callback:
* - err, 数据库异常
* - user,用户，其中的cash 和 voucher参数为所需要的
& @param {String} openID
* @param {Function} cb
*/
exports.getCashVoucherByOpenID = function(openID,cb){
  User.findOne({openID : openID},'cash voucher', cb);
}
/**
* 根据用户的openID查找用户的地址
* Callback:
* - err, 数据库异常
* - user,用户，其中的address为所需要的
& @param {String} openID
* @param {Function} cb
*/
exports.getAddressByOpenID = function(openID,cb){
  User.findOne({openID : openID}, 'address', cb);
}


exports.updatePreCash = function (order, cb){
  User.findOne({openID : order.openID}, userFind1);

  function userFind1 (err, user){
    if(err) {
      return cb(err);
    }

    if(user.preOpenID){
      User.update({openID : user.preOpenID},
                  {$inc : {cash : order.totalPrice * config.ratio_1}},
                  afterUpdate);
      User.findOne({openID : user.preOpenID}, userFind2);
    }
  }

  function userFind2 (err,user){
    if(err) {
      return cb(err);
    }
    if(user.preOpenID){
      User.update({openID : user.preOpenID},
                  {$inc : {cash : order.totalPrice * config.ratio_2}},
                  afterUpdate);
      User.findOne({openID : user.preOpenID}, userFind3);
    }
  }
  function userFind3 (err,user){
    if(err) {
      return cb(err);
    }
    if(user.preOpenID){
      User.update({openID : user.preOpenID},
                  {$inc : {cash : order.totalPrice * config.ratio_3}},
                  afterUpdate);
    }
  }

  function afterUpdate(err){
    if(err) {
      return cb(err);
    }else{
      cb(err);
    }
  }

}

/**提交购物订单以后更新现金券和代金券的数量
* Callback:
* -errorCode : defined in config.js
* @param{Order} order :订单信息
*/
exports.updateCashVoucher = function(order,cb){
  if(order.cashUse <= 0 && order.voucherUse <= 0)  return cb(null);


  User.findOne({openID : order.openID},userFind);

  function userFind(err,user){
    if(err) {
      return cb(err);
    }

    if(user){

        if(order.cashUse > 0){
          if(order.cashUse > user.cash){
            var err = new Error();
            err.describe = 'updateCashVoucher(),order.cashUse > user.cash'
            return cb(err);
          }else{
            User.update({openID : order.openID},
                        {$inc : {cash : - order.cashUse}},
                        afterUpdate);
          }

        }

        if(order.voucherUse > 0){
          var hasVoucher = false;
          var deleteIndex = -1;
          var userVoucher = user.voucher;
          for(var i = 0,l = userVoucher.length;i < l; i++){
            if(userVoucher[i].value == order.voucherUse && userVoucher[i].number >= 1){
              hasVoucher = true;
              userVoucher[i].number = userVoucher[i].number - 1;

              if(userVoucher[i].number === 0){
                deleteIndex = i;
              }
              break;
            }
          }

          if(!hasVoucher){
            var err = new Error();
            err.describe = 'updateCashVoucher(),cannot find user.voucher equal order.voucher';
            return cb(err);
          }
          //代金券已经用完，从数组中删除
          if(deleteIndex !== -1){
            userVoucher.splice(deleteIndex,1);
          }

          User.update({openID : order.openID},
                        {$set : {voucher : userVoucher}},
                        cb);
      }
    }
  }
}

exports.addAddress = function(openID,address,cb){

  User.findOne({openID : openID},"address",afterFind);

  function afterFind(err,user){
    if(err){
      return cb(err);
    }

    if(user){
      var userAddress = user.address;
      userAddress.unshift(address);

      User.update({openID : openID} , {$set : {address : userAddress}},afterUpdate);
    }
  }

  function afterUpdate(err){
   if(err){
      return cb(err);
    }else{
      cb(err);
    }
  }
}

exports.deleteAddress = function(openID,index,cb){
   User.findOne({openID : openID},"address",afterFind);

  function afterFind(err,user){
    if(err){
      return cb(err);
    }
    if(user){
      var userAddress = user.address;
      if(index < 0 ||index >= userAddress.length){
          var err =new Error();
          err.describe = 'deleteAddress(),index < 0 ||index >= userAddress.length';
          return cb(err);
      }

      userAddress.splice(index,1);
      User.update({openID : openID} , {$set : {address : userAddress}},cb);
    }
  }
}

exports.setDefault = function(openID,index,cb){

 User.findOne({openID : openID},"address",afterFind);

  function afterFind(err,user){
    if(err){
      return cb(err);
    }
    if(user){
      var userAddress = user.address;
      if(index < 0 ||index >= userAddress.length){
        var err =new Error();
        err.describe = 'setDefault(),index < 0 ||index >= userAddress.length';
        return cb(err);
      }
      var defaultAddress = userAddress[index];
      userAddress.splice(index,1);
      userAddress.unshift(defaultAddress);

      User.update({openID : openID} , {$set : {address : userAddress}},cb);
    }
  }
}


exports.generateWithdrawal = function (openID, cb){
  async.waterfall([
    function findbyOpenID(callback){
      User.findOne({'openID' : openID}, 'cash' , callback);
    },
    function gennerate(user, callback){
      Withdrawal.createWithdrawal(openID, user.cash, callback);
    }
    ],
    function(err, withdrawalCode){
      if(err)
        return cb(err);
      cb(null, withdrawalCode);
    }
  );
}

exports.updatePreOpenIDbyShareID = function(openID, shareID, cb){
  //通过openID找到preOpenID,如果没有就执行下一步
  //通过shareID找到preOpenID，如果能找到就执行下一步
  //将preOpenID,
  async.waterfall([
    function findPreOpenIDbyOpenID(callback){
      User.findOne({'openID' : openID},'preOpenID',callback);
    },
    function findPreOpenIDbyshareID(user, callback){
      if(user.preOpenID)
        return callback(null,null)
      User.findOne({'sceneID' : shareID}, 'openID', callback);
    }
    ],function(err, user){
      if(err){
        cb(err);
      }
      if(!user)
        return cb(null);
      if(!user.openID)
        return cb(null);
      User.update({'openID' : openID}, {$set : {'preOpenID' : user.openID}}, cb);
    })
}

exports.setPreOpenIDtoNo = function(openID, cb){
  User.update({'openID' : openID}, {$set : {'preOpenID' : 'no'}}, cb);
}

