var http = require("https");
var fs = require("fs");
var base = require('./base')
var Bot = function() {
	this.BaseRequest = {};
	this.DeviceID = '';
	this.Sid = '';
	this.Skey = '';
	this.Uin = '';
	this.file_index = 0;
}
Bot.prototype = {
	domain: location.host,
	base_url: 'https://file.' + this.domain + '/m/cgi-bin/',
	sync: function(basesrc) {
		// var basesrc = $("head script[async]").attr("src")
		var usersrc = $('div.header div.avatar img').attr('mm-src');
		this.username = base.get_url_parm('username', usersrc)
		this.Uin = parseInt(base.get_url_parm('uin', basesrc));
		this.Sid = base.get_url_parm('sid', basesrc);
		this.Skey = base.get_url_parm('skey', basesrc);
		this.DeviceID = base.get_url_parm('deviceid', basesrc);
		this.BaseRequest = {
			'DeviceID': this.DeviceID,
			'Sid': this.Sid,
			'Skey': this.Skey,
			'Uin': this.Uin
		};
		// _console.log('basesrc',basesrc,'usersrc',usersrc,'this',this);
	},
	send_msg_text: function(text, target, basesrc) {
		this.sync(basesrc);
		var url = 'https://' + this.domain + '/cgi-bin/mmwebwx-bin/webwxsendmsg';
		var random_data = base.createa_radom();
		data = {
			"BaseRequest": this.BaseRequest,
			"Msg": {
				"ClientMsgId": random_data,
				"Content": text,
				"FromUserName": this.username,
				"LocalID": random_data,
				"ToUserName": target,
				"Type": 1
			},
			"Scene": 0
		}
		_console.log('发送数据');
		base.data_conn(url, data, function(data) {
			_console.log('发送成功', data);
		}, 'post');
	},
	receive_img: function(url, tousername, basesrc) {
		var _this = this;
		var xhr = new XMLHttpRequest();
		xhr.open("get", url, true);
		xhr.responseType = "blob";
		xhr.onload = function() {
			if (this.status == 200 && this.readyState == 4) {
				_console.log('收到图片')
				var file = {};
				file.size = this.response.size;
				_console.log(this.response);
				file.filename = this.response;
				_this.upload_img(file, tousername, basesrc);
			}
		}
		xhr.send();
	},
	upload_img: function(file, target, basesrc) {
		var url = 'https://file.' + this.domain + '/cgi-bin/mmwebwx-bin/webwxuploadmedia?f=json';
		var req_data = {};
		var size = file.size;
		this.sync(basesrc);
		var _this = this;
		req_data = {
			'id': 'WU_FILE_' + this.file_index,
			'name': 'untitled' + this.file_index + '.png',
			'type': 'image/png',
			'lastModifiedDate': '2017/3/9 下午2:11:33',
			'size': size,
			'mediatype': 'pic',
			'uploadmediarequest': JSON.stringify({
				'UploadType': 2,
				'BaseRequest': this.BaseRequest,
				'ClientMediaId': Date.parse(new Date()) / 1000,
				'TotalLen': size,
				'StartPos': 0,
				'DataLen': size,
				'MediaType': 4,
				'FromUserName': this.username,
				'ToUserName': target,
				'FileMd5': 'a8f66f6096103d705fe372990470aa35'
			}),
			'webwx_data_ticket': base.readCookie('webwx_data_ticket'),
			'pass_ticket': undefined,
			'filename': file.filename,
		}
		this.file_index++;
		_console.log('转发图片',this.username)
		base.upload_file(url, req_data, function(data) {
			if (data.MediaId != '') {
				_this.send_msg_img(target, data.MediaId, _this.BaseRequest)
			}
		}, 'post')
	},
	send_msg_img: function(target, MediaId, baserequest) {
		var url = 'https://' + this.domain + '/cgi-bin/mmwebwx-bin/webwxsendmsgimg?fun=async&f=json';
		var data = {};
		var random_data = base.createa_radom();
		data = {
			BaseRequest: baserequest,
			Msg: {
				ClientMediaId: random_data,
				FromUserName: this.username,
				LocalID: random_data,
				MediaId: MediaId,
				ToUserName: target,
				Type: 3
			},
			Scene: 0
		}
		_console.log("发送图片",data);
		base.data_conn(url, data, function(data) {
			if (data.BaseResponse.Ret === 0) {
				_console.log('图片发送成功', data);
			}
		}, 'post');
	},
	// 接收语音消息
	receive_msg_voice: function(url, tousername, basesrc) {
		var _this = this;
		var xhr = new XMLHttpRequest();
		xhr.open("get", url, true);
		xhr.responseType = "blob";
		_console.log('接受语音', url);
		xhr.onload = function() {
			if (this.status == 200 && this.readyState == 4) {
				_console.log('收到语音 ~ ');
				var file = {};
				file.size = this.response.size;
				file.filename = this.response;
				_this.upload_voice(file, tousername, basesrc);
			}
		}
		xhr.send();
	},
	upload_voice: function(file, target, basesrc) {
		var url = 'https://file.' + this.domain + '/cgi-bin/mmwebwx-bin/webwxuploadmedia?f=json';
		var req_data = {};
		var size = file.size;
		this.sync(basesrc);
		var _this = this;
		req_data = {
			'id': 'WU_FILE_' + this.file_index,
			'name': 'voice' + this.file_index + '.mp3',
			'type': 'audio/mp3',
			'lastModifiedDate': new Date(),
			'size': size,
			'mediatype': 'doc',
			'uploadmediarequest': JSON.stringify({
				'UploadType': 2,
				'BaseRequest': this.BaseRequest,
				'ClientMediaId': Date.parse(new Date()) / 1000,
				'TotalLen': size,
				'StartPos': 0,
				'DataLen': size,
				'MediaType': 4,
				'FromUserName': this.username,
				'ToUserName': this.tousername,
				'FileMd5': 'c5bea6c6bafd818577f57d4b6a94e027'
			}),
			'webwx_data_ticket': base.readCookie('webwx_data_ticket'),
			'pass_ticket': undefined,
			'filename': file.filename
		}
		this.file_index++;
		_console.log('转发声音')
		base.upload_file(url, req_data, function(data) {
			if (data.MediaId != '') {
				_this.send_msg_voice(file, target, data.MediaId, basesrc)
			}
		}, 'post')
	},
	send_msg_voice: function(file, target, MediaId, basesrc) {
		var url = 'https://' + this.domain + '/cgi-bin/mmwebwx-bin/webwxsendappmsg?fun=async&f=json';
		var data = {};
		var random_data = base.createa_radom();
		this.sync(basesrc);
		data = {
			BaseRequest: this.BaseRequest,
			Msg: {
				Content: "<appmsg appid='wxeb7ec651dd0aefa9' sdkver=''><title>voice.mp3</title><des></des><action></action><type>6</type><content></content><url></url><lowurl></lowurl><appattach><totallen>" + file.size + "</totallen><attachid>" + MediaId + "</attachid><fileext>mp3</fileext></appattach><extinfo></extinfo></appmsg>",
				ClientMsgId: random_data,
				FromUserName: this.username,
				LocalID: random_data,
				ToUserName: target,
				Type: 6
			},
			Scene: 0
		}
		base.data_conn(url, data, function(data) {
			if (data.BaseResponse.Ret === 0) {
				_console.log('语音发送成功', data);
			}
		}, 'post');
	},
	receive_msg_video:function(url,tousername,basesrc){
		var _this = this;
		var xhr = new XMLHttpRequest();
		xhr.open("get", url, true);
		xhr.responseType = "blob";
		_console.log('接受视屏', url);
		xhr.onload = function() {
			if (this.status == 200 && this.readyState == 4) {
				var file = {};
				file.size = this.response.size;
				file.filename = this.response;
				_console.log('收到视屏 ~ ',file);
				_this.upload_video(file, tousername, basesrc);
			}
		}
		xhr.send();
	},
	upload_video:function(file,target,basesrc){
		var url = 'https://file.' + this.domain + '/cgi-bin/mmwebwx-bin/webwxuploadmedia?f=json';
		var req_data = {};
		var size = file.size;
		this.sync(basesrc);
		var _this = this;
		req_data = {
			'id': 'WU_FILE_' + this.file_index,
			'name': 'video' + this.file_index + '.mp4',
			'type': 'video/mp4',
			'lastModifiedDate': new Date(),
			'size': size,
			'mediatype': 'doc',
			'uploadmediarequest': JSON.stringify({
				'UploadType': 2,
				'BaseRequest': this.BaseRequest,
				'ClientMediaId': Date.parse(new Date()) / 1000,
				'TotalLen': size,
				'StartPos': 0,
				'DataLen': size,
				'MediaType': 4,
				'FromUserName': this.username,
				'ToUserName': this.tousername,
				'FileMd5': 'c5bea6c6bafd818577f57d4b6a94e027'
			}),
			'webwx_data_ticket': base.readCookie('webwx_data_ticket'),
			'pass_ticket': undefined,
			'filename': file.filename
		}
		this.file_index++;
		_console.log('视屏');
		base.upload_file(url, req_data, function(data) {
			if (data.MediaId != '') {
				_this.send_msg_video(file, target, data.MediaId, basesrc)
			}
		}, 'post')
	},
	send_msg_video: function(file, target, MediaId, basesrc) {
		var url = 'https://' + this.domain + '/cgi-bin/mmwebwx-bin/webwxsendappmsg?fun=async&f=json';
		var data = {};
		var random_data = base.createa_radom();
		this.sync(basesrc);
		data = {
			BaseRequest: this.BaseRequest,
			Msg: {
				Content: "<appmsg appid='wxeb7ec651dd0aefa9' sdkver=''><title>video.mp4</title><des></des><action></action><type>6</type><content></content><url></url><lowurl></lowurl><appattach><totallen>" + file.size + "</totallen><attachid>" + MediaId + "</attachid><fileext>mp4</fileext></appattach><extinfo></extinfo></appmsg>",
				ClientMsgId: random_data,
				FromUserName: this.username,
				LocalID: random_data,
				ToUserName: target,
				Type: 6
			},
			Scene: 0
		}
		base.data_conn(url, data, function(data) {
			if (data.BaseResponse.Ret === 0) {
				_console.log('视屏发送成功~', data);
			}
		}, 'post');
	}
}
module.exports = Bot;