/** 
 * Created by ZhiHeng 2017 1.6 
 */

 var base = require('../models/Base')
 var loginScheme = new base.Schema({
 	src:String,
 	pgv_si:String,
 	time:String,
 	status:String,
 	wxuin:String,
 	wxname:String
 },{versionKey:false})

 // 创建login表实体
 var  LoginEntity = base.mongoose.model('LoginEntity',loginScheme,'loginimg');

 exports.LoginEntity = LoginEntity;