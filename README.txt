常用指令：

linux shell下执行
1、ssh key生成：
	ssh-keygen -t rsa -C "$your_email"
	cat ~/.ssh/id_rsa.pub
2、从远端克隆项目到本地
	git clone git@gitlab.lug.ustc.edu.cn:wayne/weixin519.git
3、添加修改(提交所有修改)
	git add .
4、提交修改
	git commit -m "这里写本次提交的简要说明"
5、先pull 再push 
	git add . //添加所有修改
	git commit -m "some comments"  //提交修改，就是告诉git做了哪些修改 保存在本地git仓库 不影响服务器

	git pull  // 这里可能提示冲突，解决冲突后 add commit 再执行push
	git push  // 将本的版本同步到服务器


=======/getProduct 返回值======
var list = [
{
	Code:"fy20140716001",
	Name:"口子窖",
	Describe:"41度口子窖六年真藏实窖450ml",
	MarketPrice:168,
	WechatPrice:128,
	LittlePic:"fy20140716001_s.jpg",
	Details:{},
	BigPic:["fy20140716001_l_01.jpg","fy20140716001_l_02.jpg"],
	Tag:{
		Type:"白酒",
		isRecommend:true
	}
},
{
	Code:"fy20140716002",
	Name:"口子窖",
	Describe:"41度口子窖六年真藏实窖450ml",
	MarketPrice:168,
	WechatPrice:128,
	LittlePic:"fy20140716001_s.jpg",
	Details:{},
	BigPic:["fy20140716001_l_01.jpg","fy20140716001_l_02.jpg"],
	Tag:{
		Type:"白酒",
		isRecommend:true
	}
}];

var small_pic_dir = "/images/small/";
var big_pic_dir = "/images/large/";

var ret_product = {
	s_dir:small_pic_dir,
	l_dir:big_pic_dir,
	list:list
}
