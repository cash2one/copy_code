/** 
 * Created by ZhiHeng 2017 1.6 
 */

var express = require('express');
var router = express.Router();
// 用户实体
var UserEntity = require('../models/User').UserEntity;
// 登陆二维码实体
var LoginEntity = require('../models/Login').LoginEntity;
// 信息转发关联实体
var RelateEntity = require('../models/Relate').RelateEntity;
// 热点关联实体
var HotRelateEntity = require('../models/HotRelate').HotRelateEntity;
// 用户群组实体
var GroupEntity = require('../models/Group').GroupEntity;
// 进程实体
var Process = require('../models/Process').ProcessEntity;
// 消息实体
var MessageEntity = require('../models/Message').MessageEntity;
// 服务器实体
var ServerEntity = require('../models/Server').ServerEntity;
// 基础插件
var httpRequest = require('../bin/base').data_conn;
// 统一数据返回格式 
var RestResult = require('../RestResult');
var BSON = require('bson').BSONPure;
// 日期格式化
var myDate = require('silly-datetime');
// 登陆
router.get('/login',function(req,res,next){
	var restResult = new RestResult();
	LoginEntity.find({status:'wait'},function(err,srcs){
		if(err){
			restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE; 
			restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
			res.send(restResult);
			return '';
		}

		if(!srcs||srcs.length<=0){
			// 生成一个备用窗口
			open_electron(function(data){
				if(data){
					restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
					restResult.info = '系统繁忙 稍后再试';
					res.send(restResult);
				}else{
					restResult.code = RestResult.SOURCE_ERROR_CODE;
					restResult.info = RestResult.SOURCE_ERROR_INFO;
					res.send(restResult);
				}
				return '';
			});
		}else{
			if(srcs.length<=3){
				// 生成一个备用窗口
				open_electron(function(data){});
			}
			restResult.value = srcs[0];
			LoginEntity.update({_id:srcs[0]._id},{$set:{status:'scaning'}},function(err,docs){
				if(err){
					res.send(err)
				}else{
					res.send(restResult);
				}
			});
		}
	})
})

// 保存用户群组
router.post('/save/group',function(req,res,next){
	var wxuin = req.body.wxuin;
	var wxname = req.body.wxname;
	var chatGroup = req.body.groups;
	var restResult = new RestResult();
	if(wxuin&&wxname){
		GroupEntity.remove({wxuin:wxuin},function(err,rst){
			var group = chatGroup[0];
			if(group.wxuin&&group.wxname&&group.groupname&&group.groupsign){
				GroupEntity.insertMany(chatGroup,function(err,rst){
					if(err){
						restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
						restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
						res.send(restResult);
						return ;
					}
					restResult.value = rst;
					res.send(restResult);
				})
			}else{
				restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
				restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
				res.send(restResult);
				return ;
			}
		})
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
		return ;
	}
	
})

// 保存二维码
router.post('/savesrc',function(req,res,next){
	var restResult = new RestResult();
	var src = req.body.src;
	var _id = req.body._id;
	var pgv_si = req.body.pgv_si;
	if(_id){
		// var objID = BSON.ObjectID.createFromHexString(_id)
		LoginEntity.findByIdAndUpdate({_id:_id},{$set:{src:src,status:"wait",time:myDate.format(new Date(),"YYYY-MM-DD HH:mm:SS")}},function(err,raw){
			if(err){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE; 
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
				res.send(restResult);
				return '';
			}else{
				restResult.value = raw;
				res.send(restResult);
				return '';
			}
		})
	}else if(src){
		var newsrc = new LoginEntity({
			src:src,
			status:'wait',
			time:myDate.format(new Date(),"YYYY-MM-DD HH:mm:SS"),
			wxname:null,
			pgv_si:pgv_si,
			wxuin:null
		})
		newsrc.save(function(err,row){
			if(err){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE; 
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
				res.send(restResult);
				return '';
			}
			restResult.value = row;
			res.send(restResult);
			return '';
		})
	}else{
		res.status(400).send('Bad Request');
	}
})

// 登陆确认
router.post('/loginsync',function(req,res,next){
	var pgv_si = req.body.pgv_si;
	var name = req.body.name;
	var wxuin = req.body.uin;
	var chatGroup = req.body.chatGroup;
	var restResult = new RestResult();
	if(pgv_si&&name&&wxuin){
		UserEntity.update({wxname:name,wxuin:wxuin},{wxname:name,wxuin:wxuin,loginTime:myDate.format(new Date(),"YYYY-MM-DD HH:mm:SS"),chatGroup:chatGroup},{upsert:true,multi:false},function(err,raw){
			if(err){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
				res.send(restResult);
				return '';
			}else{
				LoginEntity.update({'pgv_si':pgv_si},{$set:{status:'online',wxuin:wxuin,time:myDate.format(new Date(),"YYYY-MM-DD HH:mm:SS"),wxname:name}},function(e,doc){
					if(e){
						restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
						restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
					}else{
						restResult.value = doc;
						res.send(restResult);
					}
				});
			}
		})
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = '参数错误';
		res.send(restResult);
		return '';
	}
})

// 保存用户关联信息
router.post('/saverelate',function(req,res,next){
	var restResult = new RestResult();
	var wxuin = req.body.wxuin;
	var wxname = req.body.wxname;
	var username = req.body.username;
	var group = req.body.group;
	if(wxuin&&wxname&&username){
		var newRelate = new RelateEntity({
			wxuin : wxuin,
			wxname : wxname,
			username : username,
			group : group
		})
		newRelate.save(function(err,rst){
			if(err){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
				restResult.info = '数据重复添加';
				res.send(restResult);
				return;
			}else{
				restResult.value = rst;
				res.send(restResult);
				return;
			}
		})
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE
		restResult.info = '参数错误';
		res.send(restResult);
		return ;
	}
})

// 取消用户关联信息
router.post('/delrelate',function(req,res,next){
	var restResult = new RestResult();
	var wxuin = req.body.wxuin;
	var username = req.body.username;
	var group = req.body.group;
	RelateEntity.remove({wxuin:wxuin,username:username,group:group},function(err,rst){
		if(err){
			restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
			restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
			res.send(restResult);
			return ;
		}else{
			restResult.value = rst;
			res.send(restResult);
			return;
		}
	})
})

// 获取用户关联信息
router.get('/getrelate',function(req,res,next){
	var restResult = new RestResult();
	var wxuin = req.query.wxuin;
	var wxname = req.query.wxname;
	var username = req.query.username;
	if(wxuin&&wxname&&username){
		RelateEntity.find({wxuin:wxuin,wxname:wxname,username:username},'group',function(e,raw){
			if(e){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
				res.send(restResult);
			}else{
				restResult.value = raw;
				res.send(restResult);
			}
		})
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult)
		return;
	}
})

// 保存热点关联信息
router.post('/savehotrelate',function(req,res,next){
	var restResult = new RestResult();
	var wxuin = req.body.wxuin;
	var group = req.body.group;
	if(wxuin&&group){
		var hotrelate = new HotRelateEntity({
			wxuin:wxuin,
			group:group
		});
		hotrelate.save(function(err,rst){
			if(err){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
				res.send(restResult);
				return ;
			}else{
				restResult.value = rst;
				res.send(restResult);
				return ;
			}
		});
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
		return;
	}
})

// 取消热点关联
router.post('/delhotrelate',function(req,res,next){
	var restResult = new RestResult();
	var wxuin = req.body.wxuin;
	var group = req.body.group;
	if(wxuin&&group){
		HotRelateEntity.remove({wxuin:wxuin,group:group},function(err,rst){
			if(err){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
				res.send(restResult);
			}else{
				restResult.value = rst;
				res.send(restResult);
				return ;
			}
		})
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
		return ;
	}
})

// 获取热点关联信息
router.get('/gethotrelate',function(req,res,next){
	var restResult = new RestResult();
	var wxuin = req.query.wxuin;
	if(wxuin){
		HotRelateEntity.find({wxuin:wxuin},'group',function(e,raw){
			if(e){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
				res.send(restResult);
			}else{
				restResult.value = raw;
				res.send(restResult);
			}
		})
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
		return;
	}
})

// 发送信息
router.get('/message',function(req,res,next){
	var restResult = new RestResult();
	var wxuin = req.query.wxuin;
	var wxname = req.query.wxname;
	var nowTime = Date.now();
	MessageEntity.find({wxuin:wxuin,wxname:wxname,status:"wait",sendTime:{$lte:nowTime}},function(err,rst){
		if(err){
			restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
			restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
			res.send(restResult);
		}else{
			MessageEntity.update({wxuin:wxuin,wxname:wxname,status:"wait"},{$set:{status:'send'}},{multi:true},function(err,rst){
				if(err){ console.log('wx/message',err) }
			});
			restResult.value = rst;
			res.send(restResult);
		}
	})
})

// 打开一个新的electron进程
var open_electron = function(callback){
	var flag = true;
	ServerEntity.find({left:{$gt:0}},function(err,rst){
		if(!err){
			var server = rst[0]?rst[0].serverIp:"127.0.0.1";
			console.log("请求打开electron进程");
			httpRequest(server,"/server/create/app",{},function(data){
				// if(data.code!=200){}
				console.log(data);
			},"get");
		}else{
			console.log(err);
			flag = false;
		}
		callback(flag);
	})
}

open_electron(function(data){});
module.exports = router;