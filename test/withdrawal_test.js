var User = require('../proxy').User;
var Withdrawal = require('../proxy').Withdrawal;

console.log('start');
//根据openID生成返现码code String
User.generateWithdrawal('owaixt4mctd2ZtHxa3dyAKTvFMIo', function(err, code){
	if(err)
		console.log(err);


	//完成返现
	Withdrawal.complete(code, function(err){





		//根据返现码，查找返现，返回结果如下
		 // var withdrawalSchema = new Schema({
		 //  openID : String,
		 //  date : {type : Date, default : Date.now},
		 //  cash : Number,
		 //  useDate : Date,
		 //  isUsed : {type : Boolean, default : false}
		 // });
		Withdrawal.findByEhs(code, function(err, withdrawal){
			console.log(withdrawal);
		})
	})
})