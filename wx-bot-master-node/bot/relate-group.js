var base = require('./base');
var mydata = require('./request');
var relate = function(wxuin,wxname){
	this.wxuin = wxuin;
	this.wxname = wxname;
	return this;
};
relate.prototype = {
	relate_group:function(username,callback){
		var group = $('.scroll-wrapper.chat_list.scrollbar-dynamic .chat_item.slide-left.ng-scope.active').eq(0).find('div.info span.nickname_text').text();
		var data = {};
		var alert = {};
		alert.item = $("div.chat_item.active");
		data.wxuin = this.wxuin;
		data.wxname = this.wxname;
		data.username = username;
		data.group = base.mytrim(group);
		base.data_conn(mydata.saverelate,data,function(data){
			if(data.code == 0){
				alert.text = '你已成功引起了朕的注意';
			}else if(data.code == 5){
				alert.text = '朕已经知道你了';
			}else{
				alert.text = '关联失败';
			}
			callback(alert);
		},'post');
	},
	unrelate_group:function(username,callback){
		var group = $('.scroll-wrapper.chat_list.scrollbar-dynamic .chat_item.slide-left.ng-scope.active').eq(0).find('div.info span.nickname_text').text();
		var data = {};
		var alert = {};
		alert.item = $("div.chat_item.active");
		data.wxuin = this.wxuin;
		data.wxname = this.wxname;
		data.username = username;
		data.group = base.mytrim(group);
		base.data_conn(mydata.delrelate,data,function(data){
			if(data.value.n == 0){
				alert.text = '请先引起朕的注意';
			}else if(data.value.n == 1){
				alert.text = '朕已经不想在理你了';
			}else{
				alert.text = '取消失败';
			}
			callback(alert);
		},'post');
	}
}



module.exports = relate;