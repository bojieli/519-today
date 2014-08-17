var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ShipStaffSchema = new Schema({
  openID : String,
  name : String,
  tel : String
}, { autoIndex: false });

mongoose.model('ShipStaff',ShipStaffSchema);