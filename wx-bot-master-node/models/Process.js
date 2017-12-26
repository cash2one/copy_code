/** 
 * Created by ZhiHeng 2017 2.9
 */

var base = require('./Base');
var ProcessScheme = new base.Schema({
	pid: Number				// 进程号
},{versionKey:false})
// 创建索引
ProcessScheme.index({pid:1}, {'background': true});
// 创建Process表
var ProcessEntity = base.mongoose.model('ProcessEntity',ProcessScheme,'process');

exports.ProcessEntity = ProcessEntity;