/** 
 * Created by ZhiHeng 2017 1.17
 */

var base = require('./Base');
var ObjectId = base.ObjectId;
var MessageScheme = new base.Schema({
	wxname: String, 				// 用户名
	wxuin:String,					// 用户标识
	createTime: String,
	sendTime:Number,
	theme:String,					// 信息主题
	status:String,					// 信息状态		(wait/send/edit/)
	targetGroup:Object,				// 发送群组
	type:String,					// 消息类型		(text/img/api/)
	content:String 					// 消息内容
},{versionKey:false})
// 创建索引
MessageScheme.index({mobile: 1}, {'background': true});
// 创建user表
var MessageEntity = base.mongoose.model('MessageEntity',MessageScheme,'message');

exports.MessageEntity = MessageEntity;
