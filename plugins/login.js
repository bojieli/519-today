var config = require('../config');
var request = require('request');
var User = require('../proxy').User;
var api = require('../common/api');
var async = require('async');

module.exports = function(req,res){

	//跳转到微信授权页面，授权完成之后会跳转到/Login界面
	var wechart_redirect_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?'+
						'appid='+ config.appid +
						'&redirect_uri=' + config.redirect_url+encodeURIComponent("?path="+req.path)+
						'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
	res.redirect(wechart_redirect_url);
}

module.exports.Oath2 = function (req, res, next){
  	var data = req.query;
  	var from_path = data.path;
  	if(data.code == 'authdeny'){
  		return res.send('验证失败！');
  	}
  	async.waterfall([
  		function getAccessToken(callback){
  			var token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?' +
		  		'appid=' + config.appid +
		  		'&secret=' + config.secret +
		  		'&code='+ data.code +
		  		'&grant_type=authorization_code';
	  		request({ uri : token_url, method : 'GET'},callback);
  		},
  		function getInfoByAccessToken(response, body, callback){
  			if(!JSON.parse(body)||JSON.parse(body).errcode){
  				var err = new Error();
  				err.describe = body;
  				return callback(err);
  			}
  			var userinfo_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+
			  	JSON.parse(body).access_token +
			  	'&openid='+ JSON.parse(body).openid +
			  	'&lang=zh_CN';
			request({uri : userinfo_url,method : 'GET'},callback);
  		},
  		function setInfo(response, body, callback){
  			if(!JSON.parse(body)||JSON.parse(body).errcode){
  				var err = new Error();
  				err.describe = body;
  				return callback(err);
  			}
  			var userinfo = JSON.parse(body);
	  		req.session.openID = userinfo.openid;
	  		var basicInfo = {
	  			nickname : userinfo.nickname,
				sex : userinfo.sex,
				province : userinfo.province,
				city : userinfo.city,
				country : userinfo.country,
				headimgurl : userinfo.headimgurl,
				privilege : userinfo.privilege
	  		}
	  		//通过验证以后，更改用户的基本信息
	  		User.afterVertify(userinfo.openid,basicInfo,callback);
		}], function(err){
			if(err){
				res.send('验证失败！');
				return next(err);
			}
			res.redirect(from_path);
		});
};
