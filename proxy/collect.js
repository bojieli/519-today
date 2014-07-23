var config = require('../config')
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
    if(err) return cb(config.errorCode_find);
    if(method === 'collect'){
     Collect.update({openID : openID},{$addToSet : {collectList : id}},afterUpdate);
    }else if(method === "cancelCollect"){
     Collect.update({openID : openID},{$pull : { collectList :id}},afterUpdate);
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
