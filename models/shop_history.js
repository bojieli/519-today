var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/*
* openID:所对应的用户
* orderList:[String] 保存所有订单的orderID
*/

var ShopHistorySchema = new Schema({
  openID : String,
  orderList : [String]
},{ autoindex : false });

mongoose.model('ShopHistory',ShopHistorySchema);