var base = require('./base');
var mydata = require('./request');
var hotRelate = function(wxuin, chatItem) {
	this.wxuin = wxuin;
	this.chatItem = $(chatItem);
	this.itemText = base.mytrim($(chatItem).find('div.info span.nickname_text').text());
}
hotRelate.prototype = {
	relate: function(callback) {
		var reqdata = {};
		reqdata.wxuin = this.wxuin;
		reqdata.group = this.itemText;
		var alert = {};
		alert.item = this.chatItem;
		base.data_conn(mydata.savehotrelate, reqdata, function(data) {
			console.log(data);
			if (data.code == 0) {
				alert.text = '成功订阅热点';
			} else if (data.code == 5) {
				alert.text = '你已经订阅过了';
			} else {
				alert.text = '订阅失败';
			}
			callback(alert);
		}, 'post');
	},
	unrelate: function(callback) {
		var reqdata = {};
		reqdata.wxuin = this.wxuin;
		reqdata.group = this.itemText;
		var alert = {};
		alert.item = this.chatItem;
		base.data_conn(mydata.delhotrelate, reqdata, function(data) {
			console.log(data);
			if (data.value.n == 0) {
				alert.text = '请先订阅热点';
			} else if (data.value.n == 1) {
				alert.text = '取消订阅热点';
			} else {
				alert.text = '取消失败';
			}
			callback(alert);
		}, 'post');
	}
}

module.exports = hotRelate;