///////////////////////////address 相关/////////////////////////////
//1.所有的路由
app.get('/address',address.getAddressByOpenID);
//返回address数组，前端openID在session中

app.post('/add_address',address.addAddress); 
//没有返回，前端发送数据格式为单个address
//返回格式为:
{message : String, error : Number}
{message : 'OK', error : 0}//成功
{message : 'Format Error', error : 1}//格式错误
{message : 'DataBase Error', error : 2}//数据库出错


app.post('/delete_address',address.deleteAddress);
//删除address，前端发送数据格式为index = INDEX
{message : String, error : Number}
{message : 'OK', error : 0}//成功
{message : 'Index Error', error : 1}//索引错误
{message : 'DataBase Error', error : 2}//数据库出错

app.get('/default_address',address.defaultAddress);
//设置默认address，前端发送数据格式为?index = INDEX

// 2、address的格式
  address : [{
    province : String,
    city : String,
    area : String,
    detail : String,
    name : String,  //收件人
    tel : String
  }]


///////////////////////////cash 相关////////////////////////////////
//1.所有的路由
app.get('/cash_voucher',cashVoucher.getCashVoucherByOpenID);
//返回一个user对象,里面包含cash属性和voucher属性

//2、所有的数据格式
cash : Number,
  voucher : [{
    value : Number,
    number : Number
  }],

///////////////////////product相关 ////////////////////////////////
//根据id获取酒
	app.get('/getproduct',product.getProduct);
//返回wine数组，前端发送ID数组
 var WineSchema = new Schema({
  id : String,
  name : String,
  describe : String,
  marketPrice : Number,
  wechatPrice : Number,
  littlePic : String,
  details : {
  	degree : Number,
  	volume : Number,
  	place : String
  },
  bigPic : [String],
  tag : {
  	type : String,
  	isRecommend : Boolean
  },
  visitNum : Number,
  purchaseNum : Number
 });

////////////////////////货到付款相关//////////////////////////
app.post('/purchase',purchase.updateOrder);
//post的body里面内容如下：
 confirmTel : String,//如果是电话确认，这里填写电话，如果不是为空
  shopOnce : [{
    id : String,
    number : Number
  }],//购物车数据
  address : {
    province : String,
    city : String,
    area : String,
    detail : String,
    name : String,  //收件人
    tel : String
  },//地址
  cashUse : Number,
  voucherUse : Number,
  totalPrice : Number


  //可能出现的错误：
{message : String, error : Number}
{message : 'OK', error : 0}//成功
{message : 'Tel Error', error : 1}//地址和确认电话都为空
{message : 'cashUse Error', error : 2}//cashUse 大于现金券总数
