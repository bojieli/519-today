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
    if(err) {
      return cb(err);
    }
    if(collect){
      if(method === 'collect'){
        Collect.update({openID : openID},{$addToSet : {collectList : id}},cb);
      }else if(method === "cancelCollect"){
        Collect.update({openID : openID},{$pull : { collectList : id}},cb);
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
}
