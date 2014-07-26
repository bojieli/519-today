var wechat = require("wechat");
var API = wechat.API;
var api = new API('wxd8c15c2734dacb07', '188081716b20d3d655ed14328dcf7e90');

var User = require('./proxy');



module.exports = function (app) {
	app.use('/wechat', wechat("fjv3wTkOldY", wechat.text(function (message, req, res, next) {
  // message为文本内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125035',
  // MsgType: 'text',
  // Content: 'http',
  // MsgId: '5837397576500011341' }
  res.reply(message.MsgType);
}).image(function (message, req, res, next) {
  // message为图片内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359124971',
  // MsgType: 'image',
  // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
  // MediaId: 'media_id',
  // MsgId: '5837397301622104395' }
  res.reply(message.MsgType);
}).voice(function (message, req, res, next) {
  // message为音频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'voice',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // Format: 'amr',
  // MsgId: '5837397520665436492' }
  res.reply(message.MsgType);
}).video(function (message, req, res, next) {
  // message为视频内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'video',
  // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
  // ThumbMediaId: 'media_id',
  // MsgId: '5837397520665436492' }
  res.reply(message.MsgType);
}).location(function (message, req, res, next) {
  // message为位置内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125311',
  // MsgType: 'location',
  // Location_X: '30.283950',
  // Location_Y: '120.063139',
  // Scale: '15',
  // Label: {},
  // MsgId: '5837398761910985062' }
  res.reply(message.MsgType);
}).link(function (message, req, res, next) {
  // message为链接内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'link',
  // Title: '公众平台官网链接',
  // Description: '公众平台官网链接',
  // Url: 'http://1024.com/',
  // MsgId: '5837397520665436492' }
  res.reply(message.MsgType);
}).event(function (message, req, res, next) {
  
  if(message.Event === 'subscribe'){
    if(message.EventKey){
      console.log('QRcode subscribe!');
      console.log(message.EventKey);
      var sceneID_String = message.EventKey;
      sceneID_String = sceneID_String.replace('qrscene_','');
      User.getOpenIDbySceneID(Number(sceneID_String), afterGet);
      function afterGet(err, preOpenID){
        if(err) return;
        User.addByRecommend(message.FromUserName , preOpenID, afterAdd);
        function afterAdd (err){
          return err;
        }
      }

    }else{
      console.log('Subscribe!');
      User.addByRecommend(message.FromUserName , null, afterAdd);
        function afterAdd (err){
          return err;
        }

    }
    var r = [{
        title:"欢迎关注安徽1919！访问主页" ,
        pic : process.env.HOST+"/images/home.jpg",
        description : "打造安徽白酒速递第一品牌",
        url : process.env.HOST
      },
      {
        title:"查看返钱规则" ,
        pic : process.env.HOST+"/images/fanqian.jpg",
        description : "",
        url : process.env.HOST+"/ruleintroduction"
      }];
    res.reply(r);

  }else if(message.Event === 'unsubscribe'){
    console.log('unsubscribe!');
    User.unSubscribe(message.FromUserName, function(err){
      return err;
    });
  }else if(message.Event === 'SCAN'){
    console.log('SCAN!');
    console.log(message.EventKey);
  }else if(message.Event === 'LOCATION'){
    console.log('LOCATION');
  }
  res.end();
  // message为事件内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125022',
  // MsgType: 'event',
  // Event: 'LOCATION',
  // Latitude: '23.137466',
  // Longitude: '113.352425',
  // Precision: '119.385040',
  // MsgId: '5837397520665436492' }
  //res.reply(message.MsgType);
})));

  app.get('/recommend',function (req, res){
    console.log("recommend!");
    User.getSceneIDbyOpenID(req.query.openID, function(err,sceneID){
      if(err) return;

      api.createTmpQRCode(sceneID,1800,function(err,result){
        var url = api.showQRCodeURL(result.ticket);
        //console.log(url);
        //"window.location.href = 'http://baidu.com'"
        //sceneIDurl = "window.location.href = 'http://519.today/share/?sceneID=" + sceneID + "'";
        sceneIDurl = "window.location.href = '/share/?sceneID=" + sceneID + "'"
        sceneIDurl = "<button onclick ="+ '"' +sceneIDurl+  '"' +"><b>分享到朋友圈</b></button>"
       // sceneIDurl = "window.location.href = 'http://519.today/share/'";
        console.log(sceneIDurl);
        res.render('promote',{qrCodeurl : url, sceneIDurl : sceneIDurl});
       // res.write('<img src="'+url+'" width="50%">')
       // res.end();

      })
    
    })
  });
}