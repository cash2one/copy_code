/** 
 * Created by ZhiHeng 2017 1.6 
 */

var base = require('./Base');
var ObjectId = base.ObjectId;
var UserScheme = new base.Schema({
	username: String, 				// 用户名
	loginTime: String,				// 登陆时间,
	chatGroup:String,
	wxuin:String,					// 用户标识
},{versionKey:false})
// 创建索引
UserScheme.index({mobile: 1}, {'background': true});
// 创建user表
var UserEntity = base.mongoose.model('UserEntity',UserScheme,'user');

exports.UserEntity = UserEntity;