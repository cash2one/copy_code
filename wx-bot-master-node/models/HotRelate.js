/** 
 * Created by ZhiHeng 2017 2.6 
 */

var base = require('./Base');
var HotRelateScheme = new base.Schema({
	wxuin: String, 				// 用户标识
	wxname: String,				// 用户名
	group: String				// 关联群组名称
},{versionKey:false})
// 创建索引
HotRelateScheme.index({wxuin:1,group: 1}, {'background': true,unique:true});
// 创建relate表
var HotRelateEntity = base.mongoose.model('HotRelateEntity',HotRelateScheme,'hotrelate');

exports.HotRelateEntity = HotRelateEntity;