/** 
 * Created by ZhiHeng 2017 2.6 
 */

var base = require('./Base');
var RelateScheme = new base.Schema({
	wxuin: String, 				// 用户标识
	wxname: String,				// 用户名
	username: String,			// 好友名称
	group: String				// 关联群组名称
},{versionKey:false})
// 创建索引
RelateScheme.index({wxuin:1,username:1,group: 1}, {'background': true,unique:true});
// 创建relate表
var RelateEntity = base.mongoose.model('RelateEntity',RelateScheme,'relate');

exports.RelateEntity = RelateEntity;