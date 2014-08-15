var config = {
  port :6066,
  session_secret: '519_Today',
  db : 'mongodb://localhost/519_Today_dev',
  db_name : '519_Today_dev',
  redirect_url : encodeURIComponent('http://519.today/login'),
  appid : 'wxd8c15c2734dacb07',
  secret : '81ae37cb50e1f3fb49eda224f6ffad73',

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