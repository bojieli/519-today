// s0.gewu.me master
var config = {
	port :6099,
	session_secret: '519_Today',
	db : 'mongodb://519:oDg6jt7iG4gN@s0.gewu.me/519,mongodb://s1.gewu.me',
	db_native : 'mongodb://519:oDg6jt7iG4gN@s0.gewu.me,s1.gewu.me/519',
    redirect_url : encodeURIComponent('http://519.shi6.com/login'),
	appid : 'wxd8c15c2734dacb07',
	secret : '81ae37cb50e1f3fb49eda224f6ffad73',
	host : 'http://519.shi6.com',
	withdrawalOpenID : 'owaixt4mctd2ZtHxa3dyAKTvFMIo', //冬冬的openid
	withdrawalKey : 'ZhangXiangZhongYaoMa?Zhongyao!',

	address_maxNum : 10,

	//sceneID_base
	SCENEID_BASE : 1000000000,
	SCENEID_MAX : 2000000000,
	//给上线返钱的比例
	ratio_1 : 0.03,
	ratio_2 : 0.02,
	ratio_3 : 0.01,

	small_dir : '/images/small/',
	large_dir : '/images/large/'
}
process.env.HOST = "http://519.today";
module.exports = config;
