var urllib = require('urllib');

var wxapp = {
	id : 'wxd8c15c2734dacb07',
	secret : '188081716b20d3d655ed14328dcf7e90'
}
var URLS = {
	GET_TOKEN : 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+wxapp.id+'&secret='+wxapp.secret ,
	create : 'http://api.weixin.qq.com/cgi-bin/menu/create?access_token=' 
}

var createMenuData = {
	button : [
	{	
		"type":"view",
		"name":"买酒",
		"url":"http://519.today/"
	},{
		"type":"view", 
		"name":"推广",
		"url":"http://node.freeshell.ustc.edu.cn/promote"
	},{
		"type":"click" ,
		"name":"更多",
		"sub_button":[
		{
			"name":"现金券",
			"type":"click",
			"key":"v0_ziliao"
		},
		{
			"name":"返钱规则",
			"type":"click" ,
			"key" :"v0_shudong"
		},
		{
			"name":"客服电话",
			"type":'click',
			"key":'v0_help'
		},{
			"name":"关于我们",
			"type":"view",
			"url":"http://xinyuan.fm/help"
		}
		]
	}]
}
function Menu(cb){
	var access_token = null ;
	this.getToken(cb);
}

Menu.prototype.getToken = function(cb){
	var self = this ;

	urllib.request(URLS.GET_TOKEN,function(err,data,res){
    	if (err || res.statusCode !== 200) {
    	  return cb(err || new Error('singleSend Error! status code:' + res.statusCode));
    	}
    	try {
    	  data = JSON.parse(data);
    	} catch (err) {
    	  return cb(new Error('getToken Error! ' + err.message));
    	}
    	self.access_token = data.access_token ;    	
    	cb(err,self);	
	});
}

Menu.prototype.create = function(cb){
	var self = this ;
	var urls = URLS.create ;
	if(self.access_token){
		urls += self.access_token ;
	}else{
		return console.log("error : no access_token") ;
	}
	var data =  createMenuData ;
	data = JSON.stringify(data);
	urllib.request(urls,{
		type : 'POST' ,
		data : data 
	},function(err,data,res){
    	if (err || res.statusCode !== 200) {
    	  return cb(err || new Error('singleSend Error! status code:' + res.statusCode));
    	}
    	try {
    	  data = JSON.parse(data);
    	} catch (err) {
    	  return cb(new Error('getToken Error! ' + err.message));
    	}
    	cb(err,data) ;		
	});
}
new Menu(function(err,menu){
	console.log(menu.access_token);
	menu.create(function(err,data){
		console.log(data) ;
	});
});
