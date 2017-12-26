// var ipc = require('ipc')
var clipboard = require('electron').clipboard
var nativeImage = require('electron').nativeImage
var download = require('download');
// setImmediate = require("setimmediate");
// var _ = require('lodash')
var mydata = require("./request")
var base = require("./base")
// 关联用户
var Relate = require('./relate-group')
// 关联热点
var HotRelate = require('./relate-hot')
//收到的信息集合
var msg_receive = []
//待发送的信息集合
var msg_send = []
//是否处理收到的信息
var receive_flag = true
//是否处理待发送的信息
var send_flag = true
//是否添加信息
var addMsg_flag = true
//是否可以点击
var click_falg = true
//存储收到的信息
var msg_chats = []
//我的名称
var myname = "";
var wxuin = '';
// 图片和语音转发
var Bot = require("./bot")
var bot = {};
// 应对 微信网页偷换了console 使起失效
// 保住console引用 便于使用
window._console = window.console
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
	global.setImmediate = _setImmediate
	global.clearImmediate = _clearImmediate
})

// 去掉字符串中的空格
function mytrim(str){
	return str.replace(/\s/g, "");
}

// 基本连接信息
var basesrc = '';
function debug(/*args*/){
	var args = JSON.stringify(arguments)
	// _console.log(args)
}

_console.log('preload 开始运行');

// 禁止外层网页滚动 影响使用
document.addEventListener('DOMContentLoaded', () => {
	// document.body.style.height = '100%'
	document.body.style.overflow = 'hidden'
})

// 更新页面二维码
var updateErweimaTimer = setInterval(function(){
	if($){
		var refreshBtn = $("div[ng-show='isNeedRefresh']").attr("class");
		var broken_network = $("div.broken_network").hasClass('show');
		if(refreshBtn!='ng-hide'){
			_console.log("点击刷新",refreshBtn,'ng-hide');
			$("i.icon-refresh").click();
			window.location.href = 'http://wx.qq.com';
		}
		if(broken_network){
			_console.log("网络连接断开",broken_network)
			window.location.href = 'http://wx.qq.com';
		}
	}
},60000);

// 刷新页面
var refreshTimer = setInterval(function(){
	window.location.reload();
},600000)

init();

function init(){
	var checkForQrcode = setInterval(function(){
		var qrimg = document.querySelector('.qrcode img')
		if (qrimg && qrimg.src.match(/\/qrcode/)) {
			_console.log(document.location.host=='wx2.qq.com')
			if(document.location.host=='wx2.qq.com'){
				window.location.href = 'http://wx.qq.com';
			}else{
				save_src(qrimg.src);
			}
			clearInterval(checkForQrcode);
		}
	}, 1000);
	var checkForLogin = setInterval(function(){
		var chat_item = document.querySelector('.chat_item');
		if (chat_item) {
			onLogin();
			clearInterval(checkForLogin)
		}
	}, 500)
}

function save_src(src){
	var windowid = base.readCookie('windowid');
	var loginsrc = decodeURIComponent(base.readCookie('loginsrc'));
	base.setCookie('loginsrc',src);
	if(!windowid&&windowid!="undefined"){
		// 保存src到数据库
		var data = {};
		var url = mydata.savesrc;
		data.src = src;
		data.pgv_si = base.readCookie('pgv_si');
		base.data_conn(url,data,function(data){
			base.setCookie('windowid',data.value._id);
			// _console.log('添加cookie',data);
		},'post');
	}else if(src!=loginsrc){
		// 更新数据
		var data = {};
		var url = mydata.savesrc;
		data.src = src;
		data._id = windowid;
		base.data_conn(url,data,function(data){
			// _console.log('修改cookie',data);
		},'post');
	}
}

// 登陆成功确认
function login_sync(username,uin){
	var userInfo = {};
	userInfo.pgv_si = base.readCookie('pgv_si');
	userInfo.name = username;
	userInfo.uin = uin;
	userInfo.chatGroup = get_chat_item();
	if(uin){
		base.data_conn(mydata.loginsync,userInfo,function(data){
			// _console.log('登陆成功~',data);
		},'post');
	}else{
		// _console.log('用户标识获取失败')
	}
}

// 获取用户唯一标识
function get_uin(callback){
	var uin = '';
	var uintimer = setInterval(function(){
		var imgsrc = $('head script[async]').attr('src');
		if(imgsrc){
			uin = base.get_url_parm('uin',imgsrc);
			if(uin){
				// _console.log('uin',uin);
				wxuin = uin;
				clearInterval(uintimer);
				callback(uin);
			}
		}
	},500)
}

// 保存群组到数据库
function save_group(){
	var url = mydata.savegroup;
	var groups_data = {};
	groups_data.groups = get_chat_item();
	groups_data.wxname = myname;
	groups_data.wxuin = wxuin;
	base.data_conn(url,groups_data,function(data){
		// 保存完成
	},'post')
}

// 获取用户所有聊天群组
function get_chat_item(){
	var chat_group = $('div.chat_list.scrollbar-dynamic div.chat_item.slide-left');
	var groups = [];
	chat_group.each(function(){
		var group = {};
		group.groupsign = $(this).attr('data-username');
		if(group.groupsign!='filehelper'){
			group.wxuin = wxuin;
			group.wxname = myname;
			group.groupname = $(this).find('div.info span.nickname_text').text();
			groups.push(group);
		}
	})
	return groups;
}

function onLogin(){
	// ipc.sendToHost('login');
	clearInterval(updateErweimaTimer);
	clearInterval(refreshTimer);
	$('img[src*=filehelper]').closest('.chat_item')[0].click()
	myname = $(".panel .header .info .nickname span.display_name").text();
	bot = new Bot();
    // 确认登陆
    get_uin(function(uin){
    	save_group();
	    login_sync(myname,uin);
    })
    // 保存群组
    setInterval(function(){
		save_group();
	}, 60000);
	var checkForReddot = setInterval(function(){
		// 产生红点数量
		var $reddot = $('.web_wechat_reddot, .web_wechat_reddot_middle');
		// 如果收到信息产生红点 则添加到数组中
		if ($reddot.length>0){
			if(addMsg_flag){
				addMsg_flag = false;
				var l = $reddot.length;
				for(var r=0;r<l;r++){
					var $chat_item = $reddot[r].closest('.chat_item')
					msg_receive.push($chat_item)
					$chat_item.click();
				}
				reset();
				addMsg_flag = true;
			}
		}
		// 图片点击放大
		var image_click = $('.ngdialog-overlay');
		if(image_click.length>0){
			image_click.each(function(){
				$(this).click();
			})
		}
	}, 100)
	var btn = {};
	var send_msg_timer = setInterval(function(){
		//如果收到信息  则解析信息
		if(msg_receive.length>0){
			if(receive_flag){
				receive_flag = false;
				resolve_qst(msg_receive[0])
				msg_receive = msg_receive.slice(1)
			}
		}
		//处理结果集里面的信息
		if(msg_send.length>0){
			if(send_flag){
				send_flag = false;
				resolve_asw(msg_send[0]);
				msg_send = msg_send.slice(1);
			}
		}

		// 需要发送图片则点击
		btn = $('.dialog_ft .btn_primary')
		if (btn.length) {
			$('.dialog_ft .btn_primary')[0].click()
		}
		
	}, 400)
	// 获取包含基本信息的连接
	get_base_src();
	var timer_base = setInterval(function(){
		get_base_src();
	},60000)
}

// 获取基础信息连接
function get_base_src(){
	var timer_src = setInterval(function(){
		var tempsrc = document.querySelector('head script[async]');
		if(tempsrc&&tempsrc.getAttribute('src')){
			basesrc = decodeURIComponent(tempsrc.getAttribute('src'));
			clearInterval(timer_src);
		}
	},100)
}

//解析信息
function resolve_qst($chat_item){
	if(click_falg){
		// _console.log("解析信息")
		click_falg = false;
		$chat_item.click()
		setTimeout(function(){
			var msg_content = $([
				'.message.me .bubble_cont > div',
				'.message.me .bubble_cont > a.app',
				'.message.me .emoticon',
				'.message_system:not([ng-if="message.MMTime"])'
			].join(', ')).parents(".ng-scope[ng-repeat='message in chatContent']").first()
			var $msg;
			if(msg_content&&msg_content.length>0){
				$msg = msg_content.nextAll(".ng-scope[ng-repeat]").find([
					'.message.you .bubble_cont > div',
					'.message.you .bubble_cont > a.app',
					'.message.you .emoticon',
					'.message_system:not([ng-if="message.MMTime"])'
				].join(', '));
			}else{
				$msg = $([
					'.message.you .bubble_cont > div',
					'.message.you .bubble_cont > a.app',
					'.message.you .emoticon',
					'.message_system:not([ng-if="message.MMTime"])'
				].join(', '))
			}
			// _console.log("信息组",$msg)
			if($msg&&$msg.length>0){
				var ml = $msg.length;
				var msg = {};
				var item_index = -1;
				//遍历聊天记录组数据
				for(var m in msg_chats){
					if($chat_item==msg_chats[m].item){
						item_index = m
					}
				}
				if(item_index==-1){
					var chat_item_msg = {}
					chat_item_msg.item = $chat_item;
					chat_item_msg.msg = [];
					item_index=msg_chats.length;
					msg_chats.push(chat_item_msg);
				}
				for(var m = 0;m<ml;m++){
					var isthere = false;
					msg = msg_analyze($($msg[m]));
					var $nickname = $($msg[m]).find('.nickname');
					for(var c in msg_chats[item_index].msg){
						if(msg.text&&msg.text == msg_chats[item_index].msg[c]){
							isthere = true
						}
						if(msg.voice&&msg.voice == msg_chats[item_index].msg[c]){
							isthere = true
						}
						if(msg.image&&msg.image == msg_chats[item_index].msg[c]){
							isthere = true
						}
						if(msg.video&&msg.video == msg_chats[item_index].msg[c]){
							isthere = true
						}
					}
					if(!isthere){
						var text = msg.text||msg.voice||msg.video||msg.image;
						msg_chats[item_index].msg.push(text)
						// _console.log("处理信息")
						requestData(msg,$chat_item,msg.type)
					}else{
						// _console.log("信息已经处理~")
					}
				}
			}
			reset();
			receive_flag = true;
		}, 100)
	}else{
		msg_receive.push($chat_item);
		receive_flag = true
	}
}
//分析信息类型  拆分标题链接
function msg_analyze (massage) {
	var $msg = massage;
	var $message = $msg.closest('.message')
	var $nickname = $message.find('.nickname')
	var $titlename = $('.title_name')
	var sender_name = $message.find('img.avatar').attr('title');
	var tousername = JSON.parse($message.find('img.avatar').attr('data-cm')).username;
	var msg_obj = {};
	msg_obj.sender = sender_name;
	msg_obj.tousername = tousername;
	if ($nickname.length) { 	// 群聊
		msg_obj.type = "more";
	} else { 	// 单聊
		msg_obj.type = "one";
	}
	if ($msg.is('.card')) {
		var name = $msg.find('.display_name').text()
		var wxid = $msg.find('.signature').text()
		var img = $msg.find('.img').prop('src') // 认证限制
		debug('接收', 'card', name, wxid)
		msg_obj.text = false
	} else if ($msg.is('.picture')){
		var src = $msg.find('.msg-img').prop('src')
		src = src.replace('&type=slave','')
		debug('接收', 'picture', src);
		msg_obj.image = src;
	} else if ($msg.is('a.app')){
		var url = $msg.attr('href')
		url = decodeURIComponent(url.match(/requrl=(.+?)&/)[1])
		var title = $msg.find('.title').text()
		var desc = $msg.find('.desc').text()
		var img = $msg.find('.cover').prop('src') // 认证限制
		debug('接收', 'link', title, desc, url)
		msg_obj.text = title + '\n' + url
	} else if ($msg.is('.voice')) {
		$msg[0].click()
		var duration = parseInt($msg.find('.duration').text())
		var src = $('#jp_audio_1').prop('src') // 认证限制
		debug('接收', 'voice', `${duration}s`, src)
		msg_obj.voice = src;
	} else if ($msg.is('.microvideo')) {
		var poster = $msg.find('img').prop('src') // 限制
		var src = $msg.find('video').prop('src') // 限制
		debug('接收', 'microvideo', src)
		msg_obj.microvideo = src;
	} else if ($msg.is('.video')) {
		$msg[0].click();
		var src = $msg.find('.msg-img').prop('src') // 限制
		src = src.replace('webwxgetmsgimg?&MsgID','webwxgetvideo?msgid')
		src = src.replace('&type=slave','')
		// var src = $('#jp_audio_2').prop('src') // 认证限制
		debug('接收', 'video', src)
		msg_obj.text = '暂不支持转发视屏';
	} else if ($msg.is('.plain')){
		var text = '';
		var $text = $msg.find('.js_message_plain');
		text = $text.text();
		if(text=='[收到一条网页版微信暂不支持的消息类型，请在手机上查看]'){
			msg_obj.bug = '暂不支持该类消息';
		}else{
			msg_obj.text = text;
		}
		debug('接收', 'text', text);
	}else{
		msg_obj.bug = '暂不支持该类消息';
		debug('接收', 'BUG', msg_obj);
	}
	msg_obj.title = $titlename.text();
	return msg_obj
}

//处理结果集   发送数据
function resolve_asw(data_item){
	if(click_falg){
		click_falg = false;
		data_item.item.click();
		setTimeout(function(){
			// _console.log("发送信息")
			for(var c in msg_chats){
				if(msg_chats[c].item==data_item.item){
					msg_chats[c].msg = []
				}
			}
			paste(data_item);
			$('.btn_send')[0]?$('.btn_send')[0].click():"";
			reset();
			send_flag = true;
		},100)
	}else{
		msg_send.push(data_item)
		send_flag = true
	}
}

function reset(){
	// 适当清理历史 缓解dom数量
	var msgs = $('#chatArea').scope().chatContent
	if (msgs.length >= 30) msgs.splice(0, 20)
	$('img[src*=filehelper]').closest('.chat_item').click()
	$("div.chat_item.slide-left[data-username='filehelper']").click()
	click_falg = true;
}

function paste(opt){
	var oldImage = clipboard.readImage()
	var oldHtml = clipboard.readHtml()
	var oldText = clipboard.readText()
	clipboard.clear() // 必须清空
	if (opt.image) {
		// 不知为啥 linux上 clipboard+nativeimage无效
		try {
			clipboard.writeImage(nativeImage.createFromPath(opt.image))
		} catch (err) {
			opt.image = null
			opt.text = '无法转发图片'
		}
	}
	if (opt.html) clipboard.writeHtml(opt.html)
	if (opt.text) clipboard.writeHtml(opt.text)
	// if (opt.text) clipboard.writeText(opt.text)
	$('#editArea')[0].focus()
	document.execCommand('paste')
	clipboard.writeImage(oldImage)
	clipboard.writeHtml(oldHtml)
	clipboard.writeText(oldText)
}

// 处理数据
function requestData(msg,chat_item,chatType){
	var uStr = msg.text;
	var sender = msg.sender;

	var relate = new Relate(wxuin,myname);
	var hotRelate = new HotRelate(wxuin,chat_item);

	// 关联目标与群组
	if(uStr&&uStr.indexOf("@"+myname)>=0&&uStr.indexOf(mydata.relate)>=0&&chatType!='one'){
		relate.relate_group(sender,function(data){
			msg_send.push(data);
		});
		return;
	}

	// 取消关联
	if(uStr&&uStr.indexOf("@"+myname)>=0&&uStr.indexOf(mydata.unrelate)>=0&&chatType!='one'){
		relate.unrelate_group(sender,function(data){
			msg_send.push(data);
		});
		return;
	}

	// 关联热点发送
	if(uStr&&uStr.indexOf(mydata.hotRelate)>=0){
		hotRelate.relate(function(data){
			msg_send.push(data);
		});
		return ;
	}

	// 取消关联热点
	if(uStr&&uStr.indexOf(mydata.unhotRelate)>=0){
		hotRelate.unrelate(function(data){
			msg_send.push(data);
		});
		return;
	}

	// 判断信息类型
	if(msg.bug&&chatType=='one'){
		msg_send.push({"text": msg.bug,"item":chat_item});
		return '';
	}
	// 转发至目标管理群
	if(chatType=='one'){
		var reqData = {};
		reqData.wxuin = wxuin;
		reqData.wxname = myname;
		reqData.username = sender;
		base.data_conn(mydata.getrelate,reqData,function(data){
			var groups = data.value;
			if(groups.length>0){
				if(msg.text){
					for(var g in groups){
						var nickname = groups[g].group;
						$("div.chat_item").each(function(){
							var item_name = $(this).find('div.info span.nickname_text').text();
							if(mytrim(item_name)==mytrim(nickname)){
								msg_send.push({"text": msg.text,"item":$(this)});
							}
						});
					}
					return;
				}
				var gl = groups.length;
				var num = 0;
				var loopgroup = setInterval(function(){
					var username='';
					if(num>=gl){
						clearInterval(loopgroup);
						return ;
					}else{
						num++;
					}
					var nickname = groups[num-1].group;
					$("div.chat_item").each(function(){
						var item_name = $(this).find('div.info span.nickname_text').text();
						if(mytrim(item_name)==mytrim(nickname)){
							username = $(this).attr('data-username');
							if(msg.image){
								msg.image = msg.image?msg.image:$('#jp_audio_1').prop('src');
								bot.receive_img(msg.image,username,basesrc);
							}else if(msg.voice){
								bot.receive_msg_voice(msg.voice,username,basesrc);
							}else if(msg.microvideo){
								// _console.log('小视屏路径',msg.microvideo)
								bot.receive_msg_microvideo(msg.microvideo,username,basesrc);
							}else if(msg.video){
								// var src = $('#jp_audio_2').prop('src') // 认证限制
								// _console.log('视屏路径',msg.video)
								bot.receive_msg_video(msg.video,username,basesrc);
							}
						}
					});
				},5000)
			}else{
				// msg_send.push({"text": '还未关联任何群组,请确认群里的昵称是否为您自己本来的昵称',"item":chat_item});
				return ;
			}
		})
	}
}

// 转发消息
function transmit(){
	
}
