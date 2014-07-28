var site = require('./controllers/site');
var share = require('./controllers/share');
var visit = require('./controllers/visit');
var address = require('./controllers/address');
var collect = require('./controllers/collect');
var cashVoucher = require('./controllers/cash_voucher');
var purchase = require('./controllers/purchase');
var share = require('./controllers/share');
var product = require('./controllers/product');
var promote = require('./controllers/promote');
var config = require('./config');
var request = require('request');
var User = require('./proxy').User;
var details = require('./controllers/details');
var userOrder = require('./controllers/user_order');
var errlog = require('./controllers/errlog');
var ruleintroduction = require('./controllers/ruleintroduction');



var login = require('./plugins/login');



module.exports = function (app) {
//接收微信服务器的消息
	app.all('/wechat',function (req, res){
		var buf = '';
		req.setEncoding('utf8');
   		req.on('data', function(chunk){ buf += chunk });
    	req.on('end', function(){
    		console.log(buf);
    	});

		res.write('');
		res.end();
	});

//如果没有登录就直接登录
	app.all('*',function (req, res,next){

		if(req.session.openID||req.path === '/login'||req.path === '/share'){
			next();
		}else{
			//next();
			//req.session.openID = 'owaixtwGljLuX4W4Ov6wOlQXle1U';
			//next();
			login(req,res);
		}
	});
//微信授权页面返回页面
	app.all('/login',login.Oath2);

//用户访问推荐页面
	app.get('/promote',promote.index);

//当用户访问主页的时候
	app.get('/',site.visitHome);
//当用户访问其他用户分享的界面的时候
	app.get('/share',share.visitShare);

//用户退出登录，测试时使用
	app.get("/logout",function(req,res){
		if(req.session.openID){
			req.session.openID = null;
			res.send("logout success!");
		}
		else
			res.send('no openID');
		
	});

//visit
	app.post('/visit',visit.addVisit);

//address
	app.get('/address',address.getAddressByOpenID);
	app.post('/add_address',address.addAddress);
	app.post('/delete_address',address.deleteAddress);
	app.get('/default_address',address.defaultAddress);

//修改收藏
	app.post('/collect',collect.modifyCollect);

//获取券
	app.get('/cash_voucher',cashVoucher.getCashVoucherByOpenID);

//下单购买
	app.post('/purchase',purchase.updateOrder);

//获取用户订单
  app.post('/getuserorder',userOrder.getUserOrder);

//根据id获取酒
	app.get('/getProduct',product.getProduct);
	app.get('/details',details);
	app.post('/errlog',errlog);

	app.get('/ruleintroduction',ruleintroduction.index);

}