var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* id:酒的编号
* visitNum:酒的访问次数
* purchase：酒的购买次数
*/

 var withdrawalSchema = new Schema({
  openID : String,
  date : {type : Date, default : Date.now},
  cash : Number,
  useDate : Date,
  isUsed : {type : Boolean, default : false}
 });

mongoose.model('Withdrawal',withdrawalSchema);