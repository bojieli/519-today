/*!
 * 519Today - site index controller.
 * Copyright(c) 2014 GewuIT
 */

/*!
 * 修改收藏
 * collect
 */
var Collect = require('../proxy').Collect;

exports.modifyCollect = function (req, res, next) {
  Collect.update(req.session.openID, req.body.id,req.body.method,function(err){
    if(err) return next(err);
  });
}
