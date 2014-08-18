var config = require('./config');
var models = require('../models');
var async = require('async');
var User = models.User;

global.sceneID_weixin_count = 0;

exports.updateGlobalSceneID = function () {
  User.find({sceneID : {$gt : config.SCENEID_BASE,$lte : config.SCENEID_MAX}},function(err,users){
      if(err){
        return cb(err);
      }else{
        global.sceneID_weixin_count = users.length;
      }
  });
}




/**
* 根据用户的openID更新用户的currentAddress
* @param{String} openID
* @param{Object} address :geo2loc返回的address
*/
exports.updateCurrentAddress = function(openID,address,cb){
  var currentAddress = {
    province : address.province.name,
    city : address.city.name,
    district : address.district.name
  };

  User.update({ openID : openID },{$set : {currentAddress : currentAddress}},cb);
}

/**
* 根据openID,preOpenID加入新的用户数据
*/
exports.addByRecommend = function(openID,preOpenID,cb){

  User.findOne({openID : openID},afterFind);

  function afterFind(err,user){
    if(err) return cb(err);
    if(user){
      User.update({openID : openID},{$set : { hasFollow : true}},cb);
      return;
    }else{
      var sceneID = getSceneID();
      var newUser = {
        openID : openID,
        preOpenID : preOpenID,
        sceneID :sceneID,
        basicInfo : {},
        hasFollow : true,
        cash : 0,
        voucher :[],
        currentAddress :{},
        //address : []
      }

      User.create(newUser,afterCreate);
    }

  }

  function afterCreate(err,user){
    if(err){
      return cb(config.errorCode_create);
    }else if(user){
      global.sceneID_weixin_count++;
    }
  }

  function getSceneID(){
    return config.SCENEID_BASE + global.sceneID_weixin_count + 1;
  }
}

exports.getSceneIDbyOpenID = function (openID, cb){
  User.findOne({openID : openID},'sceneID',afterFind);
  function afterFind(err, user){
    if(err) return cb(err);
    cb(err, user.sceneID);
  }
}

exports.getOpenIDbySceneID = function (sceneID, cb){
  User.findOne({sceneID : sceneID},'openID',afterFind);
  function afterFind (err , user){
    if(err) return cb(err);
    cb(err , user.openID);
  }
}

exports.unSubscribe = function(openID,cb){

  async.auto({
    updateOpenID : function(callback){
      User.update({openID : openID},{$set : {preOpenID : 'no',hasFollow : false,cash : 0,voucher : []}},callback);
    },
    updatePreOpenID : function(callback){
      User.update({preOpenID : openID},{$set : { preOpenID : 'no'}},{ multi: true },callback);
    }
  },function(err, results){
    if(err)
      return cb(err);
    cb(null);
  });

}



