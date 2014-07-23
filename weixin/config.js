var config = {
  port :80,
  session_secret: '519_Today',
  db : 'mongodb://localhost/519_Today_dev',
  db_name : '519_Today_dev',
  redirect_url : 'http%3A%2F%2Fnode.freeshell.ustc.edu.cn%2Flogin',
  appid : 'wxd8c15c2734dacb07',
  secret : '188081716b20d3d655ed14328dcf7e90',

  /*
  *some important errorCode
  */
  errCode_cash : 1000,
  errCode_voucher : 10001,
  errCode_find : 10002,
  errorCode_update : 10003,
  errorCode_create : 10004,
  address_maxNum : 10,

  //sceneID_base
  SCENEID_BASE : 0000000000,
  SCENEID_MAX : 1000000000
}

module.exports = config;