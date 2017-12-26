/** 
 * Created by ZhiHeng 2017 2.14
 */

var base = require('./Base');
var FriendsScheme = new base.Schema({
	username: String, 				// 用户名
	wxuin:String,					// 用户标识
	friendname:String,				// 好友名称
	friendsign:String 				// 好友标识
},{versionKey:false})
// 创建索引
FriendsScheme.index({mobile: 1}, {'background': true});
// 创建user表
var FriendsEntity = base.mongoose.model('FriendsEntity',FriendsScheme,'friends');

exports.FriendsEntity = FriendsEntity;
