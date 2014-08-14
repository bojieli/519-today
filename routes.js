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
	app.all('*', function (req, res,next){
		if(req.session.openID){
			//如果没有访问过我们的网站，如果有shareID,
			if(!req.session.hasVisited){
				req.session.hasVisited = true;
				if(req.session.shareID){
					User.updatePreOpenIDbyShareID(req.session.openID, req.session.shareID, function(err){
						if(err)
							return next(err);
					})
				}else{
					User.setPreOpenIDtoNo(req.session.openID, function(err){
						if(err)
							return next(err);
					})
				}
				//更改数据库里面的preOpenID,并且next
			}
			next();
		}else if(req.path === '/login'){
			next();
		}else if(req.path === '/share'){
			//如果ShareID未被使用且，分享页面里面有id，那么就将session里面的shareID置成id
			if((!req.session.hasVisited)&&req.query.id){
				req.session.shareID = req.query.id;
			}
			next();
		}else if(req.path === '/logout'){
			next();
		}else{
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
		req.session.hasVisited = null;
		req.session.shareID = null;
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
	app.post('/address',address.getAddressByOpenID);
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

	app.get('/orderaction', OrderAction.load);//快递点击订单链接进入

}