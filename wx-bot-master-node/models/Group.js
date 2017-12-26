/** 
 * Created by ZhiHeng 2017 2.13
 */

var base = require('./Base');
var GroupScheme = new base.Schema({
	wxname: String, 				// 用户名
	wxuin:String,					// 用户标识
	groupname:String,				// 群组名称
	groupsign:String 				// 群组标识
},{versionKey:false})
// 创建索引
// GroupScheme.index({groupname: 1}, {'background': true});
// 创建user表
var GroupEntity = base.mongoose.model('GroupEntity',GroupScheme,'usergroups');

exports.GroupEntity = GroupEntity;
