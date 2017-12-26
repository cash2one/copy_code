/** 
 * Created by ZhiHeng 2017 3.22
 */

var base = require('./Base');
var ServerScheme = new base.Schema({
	serverIp:String,
	processNum:Number,
	maxApp:Number,
	left:Number
},{versionKey:false})
// 创建索引
ServerScheme.index({Servername: 1}, {'background': true});
// 创建user表
var ServerEntity = base.mongoose.model('ServerEntity',ServerScheme,'servers');

exports.ServerEntity = ServerEntity;
