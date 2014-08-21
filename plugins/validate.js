 var Wine = require('../proxy').Wine;
 var username_maxLength = 10;
 var addressDetail_maxLength = 40;
 
 exports.nameVertify = function(username){
    return (typeof username == 'string')&&username.length > 0 && username.length <= username_maxLength;
  }

 exports.telVertify = function(usertel){
    var phoneregex = /^0?1[3|4|5|7|8][0-9]{9}$/;
    return phoneregex.test(usertel);
  }

  exports.addressDetailVertify = function(detail){
    return (typeof detail == 'string')&&detail.length > 0 && detail.length <= addressDetail_maxLength;
  }

  exports.winesInfoVerify = function(wines,cb){
    if(!wines.length||wines.length == 0){
      return cb(false);
    }
    var wineIDs = [];
    for(var i = 0;i < wines.length;i++){
      if(isNaN(wines[i].number) || Number(wines[i].number)%1 !== 0 || Number(wines[i].number) <1){
        return cb(false);
      }
      wineIDs.push(wines[i].id);
    }
    Wine.findByIDs(wineIDs,function(err,wines_result){
      return cb(!err && wines_result.length == wines.length);
    })
  }