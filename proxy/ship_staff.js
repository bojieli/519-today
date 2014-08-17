var congfig = require('../config');
var models = require('../models');
var ShipStaff = models.ShipStaff;

exports.findByOpenID = function(openID,cb){
  ShipStaff.findOne({openID : openID},cb);
}
