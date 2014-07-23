
var config = require('../config');
var models = require('../models');
var User = models.User;

/**
* 根据用户的openID查找用户
* Callback:
* - err, 数据库异常
* - user,用户
& @param {String} openID
* @param {Function} cb
*/
exports.getUserByOpenID = function(openID,cb){
  User.findOne({ openID : openID },userFind);

  function userFind(err,user){
    if(err){
      cb(config.errCode_find,null);
    }else{
      cb(err,user);
    }

  }
}


/**
* vertify:通过网络链接vertify,写入用户信息
* callback:
* - err
*/
exports.afterVertify = function(openID,preOpenID,basicInfo,cb){
  User.findOne({openID : openID},afterFind);

  function afterFind(err,user){
    if(err) return cb(err);

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
    if(err) return cb(config.errorCode_update);
  }

  function afterCreate(err,user){
    if(err){
      return cb(config.errorCode_create);
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
  User.findOne({openID : openID},'cash voucher', userFind);

  function userFind(err,user){
    if(err){
      cb(config.errCode_find,null);
    }else{
      cb(err,user);
    }

  }

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

   function userFind(err,user){
    if(err){
      cb(config.errCode_find,null);
    }else{
      cb(err,user);
    }

  }
}

/**提交购物订单以后更新现金券和代金券的数量
* Callback:
* -errorCode : defined in config.js
* @param{Order} order :订单信息
*/
exports.updatePreCash = function (order, cb){
  User.findOne({openID : order.openID}, userFind1);
  function userFind1 (err, user){
    if(err) cb(err);
    if(user.preOpenID){
      User.update({openID : user.preOpenID},
                  {$inc : {cash : (order.totalPrice - order.cashUse)*config.ratio_1}},
                  cb(err));
      User.findOne({openID : user.preOpenID}, userFind2);
    }
    
  }
  function userFind2 (err,user){
    if(err) cb(err);
    if(user.preOpenID){
      User.update({openID : user.preOpenID},
                  {$inc : {cash : (order.totalPrice - order.cashUse)*config.ratio_2}},
                  cb(err));
      User.findOne({openID : user.preOpenID}, userFind3);
    }
  }
  function userFind3 (err,user){
    if(err) cb(err);
    if(user.preOpenID){
      User.update({openID : user.preOpenID},
                  {$inc : {cash : (order.totalPrice - order.cashUse)*config.ratio_3}},
                  cb(err));
    }
  }
}

exports.updateCashVoucher = function(order,cb){
  if(order.cashUse <= 0 && order.voucherUse <= 0)  return cb(null);
  

  User.findOne({openID : order.openID},userFind);

  function userFind(err,user){
    if(err || !user) return cb(config.errCode_find);

    if(user){
        if(order.cashUse > 0){
          if(order.cashUse > user.cash){
            return cb(config.errCode_cash);
          }else{
            User.update({openID : order.openID},
                        {$inc : {cash : -order.cashUse}},
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

          if(!hasVoucher) return cb(config.errCode_voucher);
          //代金券已经用完，从数组中删除
          if(deleteIndex !== -1){
            userVoucher.splice(deleteIndex,1);
          }

          User.update({openID : order.openID},
                        {$set : {voucher : userVoucher}},
                        afterUpdate);
      }
    }
  }

  function afterUpdate(err){
    if(err){
      cb(config.errorCode_update);
    }else{
      cb(err);
    }
  }

}

exports.addAddress = function(openID,address,cb){

  User.findOne({openID : openID},"address",afterFind);

  function afterFind(err,user){
    if(err) return cb(config.errCode_find);

    if(user){
      var userAddress = user.address;
      userAddress.unshift(address);

      User.update({openID : openID} , {$set : {address : userAddress}},afterUpdate);
    }
  }

  function afterUpdate(err){
    if(err) {
      cb(config.errorCode_update);
    }else{
      cb(err);
    }
  }
}

exports.deleteAddress = function(openID,index,cb){
   User.findOne({openID : openID},"address",afterFind(err,user));

  function afterFind(err,user){
    if(err) return cb(config.errCode_find);

    if(user){
      var userAddress = user.address;
      if(index < 0 ||index >= userAddress.length){
        return cb(config.errorCode_index);
      }

      userAddress.splice(index,1);
      User.update({openID : openID} , {$set : {address : userAddress}},afterUpdate);
    }
  }

  function afterUpdate(err){
    if(err) {
      cb(config.errorCode_update);
    }else{
      cb(err);
    }
  }
}

exports.setDefault = function(openID,index,cb){

 User.findOne({openID : openID},"address",afterFind(err,user));

  function afterFind(err,user){
    if(err) return cb(config.errCode_find);

    if(user){
      var userAddress = user.address;
      if(index < 0 ||index >= userAddress.length){
        return cb(config.errorCode_index);
      }
      var defaultAddress = userAddress[index];
      userAddress.splice(index,1);
      userAddress.unshift(defaultAddress);

      User.update({openID : openID} , {$set : {address : userAddress}},afterUpdate);
    }
  }

  function afterUpdate(err){
    if(err) {
      cb(config.errorCode_update);
    }else{
      cb(err);
    }
  }
}


