/** 
 * Created by ZhiHeng 2017 2.27
 */

var base = require('./Base');
var FilesScheme = new base.Schema({
	wxuin:String,
	path:String,
	type:String,
	name:String
},{versionKey:false})
// 创建索引
FilesScheme.index({name: 1}, {'background': true});
// 创建Files表
var FilesEntity = base.mongoose.model('FilesEntity',FilesScheme,'files');

exports.FilesEntity = FilesEntity;