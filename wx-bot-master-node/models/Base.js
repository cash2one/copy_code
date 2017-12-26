/** 
 * Created by ZhiHeng 2017 1.6 
 */

 var mongodb = require('../config/config')
 // 获取mongoose
 var mongoose = mongodb.mongoose;
 mongoose.Promise = require('bluebird');
 // 获取Schema 方便快捷使用
 var Schema = mongoose.Schema;
 // 获取OBJECTID 方便使用
 var ObjectId = Schema.Types.ObjectId;

 // 导出
 exports.mongodb = mongodb;
 exports.mongoose = mongoose;
 exports.Schema = Schema;
 exports.ObjectId = ObjectId;
 exports.Mixed = Schema.Types.Mixed;