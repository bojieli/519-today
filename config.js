var config = {
	port :6088,
	session_secret: '519_Today',
	db : 'mongodb://localhost/519_Today_dev',
	db_name : '519_Today_dev',
	redirect_url : encodeURIComponent('http://519.today/login'),
	appid : 'wxd8c15c2734dacb07',
	secret : '188081716b20d3d655ed14328dcf7e90',
	host : 'http://519.today',

	/*
	*some important errorCode
	*/
	errCode_cash : 1000,
	errCode_voucher : 10001,
	errCode_find : 10002,
	errorCode_update : 10003,
	errorCode_create : 10004,
	errorCode_index : 10005,
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
