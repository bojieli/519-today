//日志主要由以下几部分构成：
1、访问日志，采用express自带日志
2、程序运行出错日志，采用express自带日志
3、其它错误，自己写入文件
错误格式
{
	err_code : Number,
	err_message : String,
	date : Date
	//如果是在特定地方出错，还应该输出特定地方的标志性变量
}
4、重要输出，自己写入文件
//自定义格式
5、前端错误，自己写入文件
//自定义格式
