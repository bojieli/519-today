
var Validate = require('../plugins/validate');

var shopOnce = JSON.parse('[{"id":"jzz_025","number":"1"},{"id":"jzz_028","number":"1"},{"id":"jzz_026","number":"1"}]');
Validate.winesInfoVerify(shopOnce,function(flag){
    console.log(flag);
});