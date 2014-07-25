var config = require('../config')
var errUtil = require('./wrap_error');
var models = require('../models');
var Collect = models.Collect;

/**根据用户的openID和商品的id修改收藏夹
* Callback:
* -err
* @param{String} openID
* @param{String} id
* @param{String} method : enum{"collect","cancelCollect"}
*/

exports.update = function(openID,id,method,cb){
  Collect.findOne({openID : openID},afterFind);
  function afterFind(err,collect){
    if(err) {
      errUtil.wrapError(err,config.errorCode_find,"update()","/proxy/collect",{
        openID:openID,
        id:id,
        method:method
      });
      return cb(err);
    }
    if(collect){
      if(method === 'collect'){
        Collect.update({openID : openID},{$addToSet : {collectList : id}},afterUpdate);
      }else if(method === "cancelCollect"){
        Collect.update({openID : openID},{$pull : { collectList : id}},afterUpdate);
      }
    }else{
      var newCollect = new Collect({
        openID : openID,
        collectList : []
      });
      if(method === 'collect'){
        newCollect.collectList.push(id);
      }
      newCollect.save();
    }
  }

  function afterUpdate(err){
    if(err){
      errUtil.wrapError(err,config.errorCode_update,"update()","/proxy/collect",{
        openID:openID,
        id:id,
        method:method
      });
      return cb(err);
    }else{
      cb(err);
    }
  }
}
