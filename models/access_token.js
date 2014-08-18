var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config');

 var AccessTokenSchema = new Schema({
  id : {type: Number, default : 1919},
  accessToken : String
 });

mongoose.model(config.accessToken,AccessTokenSchema);