var wechat = require("wechat");
var api = require('../common/api');
var User = require('./proxy');
var Withdrawal = require('../proxy').Withdrawal;



module.exports = function (app) {
	app.use('/wechat', wechat("fjv3wTkOldY", wechat.text(function (message, req, res, next) {
  // message为文本内容
  // { ToUserName: 'gh_d3e07d51b513',
  // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  // CreateTime: '1359125035',
  // MsgType: 'text',
  // Content: 'http',
  // MsgId: '5837397576500011341' }
  if(message.Content == "提现"){
     Withdrawal.findWithDrawlNotUsed(message.FromUserName,function(err,ehs){
          if(err)
            return next(err);
          if(ehs){
            res.reply("您的提现码为：["+ehs+"].\n请加微信号\'ah1919\'为好友,并将提现码发给该微信号！");
            res.end();
          }else{
            User.getCashByOpenID(message.FromUserName,function(err,cash){
            if(err){
              return next(err);
            }
            if(cash < 100){
              res.reply("您当前的现金券不足100元，暂时不能提现！");
              return res.end();
            }else{
                Withdrawal.createWithdrawal(message.FromUserName,cash,function(err,ehs){
                  if(err){
                    return next(err);
                  }
                  res.reply("您的提现码为：["+ehs+"].\n请加微信号\'ah1919\'为好友,并将提现码发给该微信号！");
                  res.end();
                });
              }
            });
          };
      });
  }else{
    res.reply(message.MsgType);
    res.end();
  }
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
  res.end();
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
  res.end();
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
  res.end();
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
  res.end();
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
  res.end();
}).event(function (message, req, res, next) {
  
  if(message.Event === 'subscribe'){
    if(message.EventKey){
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
    res.end();

  }else if(message.Event === 'unsubscribe'){
    User.unSubscribe(message.FromUserName, function(err){
      return err;
    });
  }else if(message.Event === 'SCAN'){
  }else if(message.Event === 'LOCATION'){
  }else if(message.Event === 'CLICK'){
    if(message.EventKey === 'v0_ziliao'){
      var openID = message.FromUserName;
      User.getCashByOpenID(openID,function(err,cash){
        if(err){
          res.reply("查询现金券失败，请重新尝试！");
          return next(err);
        }
        res.reply("您当前剩余现金券"+cash+"元,回复[提现]申请提现");
        res.end();
      });
    }
  }
  
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

  app.get('/recommend',function (req, res, next){
    User.getSceneIDbyOpenID(req.session.openID, function(err,sceneID){
      if(err) return next(err);
      var  sceneIDurl = "window.location.href = '/share/?sceneID=" + sceneID + "'";
      sceneIDurl = "<button onclick ="+ '"' +sceneIDurl+  '"' +"><b>分享到朋友圈</b></button>";
      if(req.session.qrCode && req.session.qrCode.expireTime > new Date().getTime()){
        var url = req.session.qrCode.url;
        return res.render('promote',{qrCodeurl : url, sceneID : sceneID});
      }
      createTmpQRCode();
      function createTmpQRCode(){
        api.createTmpQRCode(sceneID,1800,function(err,result){
          if(err){
            throw err;
            return createTmpQRCode();
          }
          if(result.ticket){
            var url = api.showQRCodeURL(result.ticket);
            req.session.qrCode = {
              url : url,
              expireTime : new Date().getTime()+1500*1000
            };
            res.render('promote',{qrCodeurl : url, sceneID : sceneID});
          }else{
            res.render('promote',{qrCodeurl : null, sceneID : sceneID});
          }
        });
      }
    
    })
  });

  app.get('/about1919',function(req,res){
    var url = "http://mp.weixin.qq.com/s?__biz=MzA4MTg3MzYwMQ==&mid=200581729&idx=1&sn=693fbe867361594f44781c9af8a24cc5#rd";
    res.redirect(url);
  });

  app.get('/followus',function(req,res){
    var url = "http://mp.weixin.qq.com/s?__biz=MzA4MTg3MzYwMQ==&mid=200422243&idx=1&sn=323a15f62ccfd7d8296e99db4b44057a#rd";
    res.redirect(url);
  });
}