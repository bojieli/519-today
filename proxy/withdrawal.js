var config = require('../config')
var models = require('../models');
var Crypto = require('cryptojs').Crypto;
var Withdrawal = models.Withdrawal;
var mode = new Crypto.mode.ECB (Crypto.pad.pkcs7);


exports.createWithdrawal = function (openID, cash, cb){
	var _withdrawal = {
		openID : openID,
		cash : cash,
	};
	Withdrawal.create(_withdrawal, function (err, withdrawal){
		if(err)
			return cb(err);
		
		var ub = Crypto.charenc.UTF8.stringToBytes (withdrawal._id);
		var eb = Crypto.DES.encrypt (ub, config.withdrawalKey, {asBytes: true, mode: mode});
		var ehs = Crypto.util.bytesToHex (eb);
		cb(null, ehs);
	});
}

exports.findByEhs = function(ehs, cb){
	var eb2= Crypto.util.hexToBytes (ehs);
	var ub2= Crypto.DES.decrypt (eb2, config.withdrawalKey, {asBytes: true, mode: mode});
	var us2= Crypto.charenc.UTF8.bytesToString (ub2);

	Withdrawal.findOne({'_id': us2}, function(err, withdrawal){
		if(err)
			return cb(err);
		cb(null, withdrawal);
	})

}

exports.complete = function(ehs, cb){
	var eb2= Crypto.util.hexToBytes (ehs);
	var ub2= Crypto.DES.decrypt (eb2, config.withdrawalKey, {asBytes: true, mode: mode});
	var us2= Crypto.charenc.UTF8.bytesToString (ub2);
	Withdrawal.update({'_id' : us2}, {'isUsed' : true, 'useDate' : new Date()}, cb);
}