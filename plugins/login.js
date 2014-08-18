var config = require('../config');
var request = require('request');
var User = require('../proxy').User;
var api = require('../common/api');

module.exports = function(req,res){

	//跳转到微信授权页面，授权完成之后会跳转到/Login界面
	var wechart_redirect_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?'+
						'appid='+ config.appid +
						'&redirect_uri=' + config.redirect_url+encodeURIComponent("?path="+req.path)+
						'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
	res.redirect(wechart_redirect_url);

	//授权完成之后将会调用all login
	console.log('function');

}

module.exports.Oath2 = function (req, res, next){


  		var data = req.query;
  		var from_path = data.path;
  		if(data.code!='authdeny'){
	  		var token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?' +
	  		'appid=' + config.appid +
	  		'&secret=' + config.secret +
	  		'&code='+ data.code +
	  		'&grant_type=authorization_code';
	  		console.log('request');
			request({ uri : token_url, method : 'GET'},function(err,response,body){
			  	var userinfo_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+
			  	JSON.parse(body).access_token +
			  	'&openid='+ JSON.parse(body).openid +
			  	'&lang=zh_CN';

			  	request({uri : userinfo_url,method : 'GET'},function(err,response,body){
			  		//更改session，表示用户已经登录
			  		var userinfo = JSON.parse(body);

			  		req.session.openID = userinfo.openid;
			  		//获得用户数据，存储用户数据

			  		var basicInfo = {
			  			nickname : userinfo.nickname,
							sex : userinfo.sex,
							province : userinfo.province,
							city : userinfo.city,
							country : userinfo.country,
							headimgurl : userinfo.headimgurl,
							privilege : userinfo.privilege
			  		}

			  		User.afterVertify(userinfo.openid,null,basicInfo,function(err){
			  			if(err)
			  				return next(err);
			  		});

			  		res.redirect(from_path);
				});
			});
 		}else{
 			res.send("授权失败！");
 		}
};
