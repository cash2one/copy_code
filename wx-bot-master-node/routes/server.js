var express = require('express');
var exec = require('child_process').exec; 
var router = express.Router();
var app = express();
var RestResult = require('../RestResult');
var ServerEntity = require('../models/Server').ServerEntity;
// 日期格式化
var myDate = require('silly-datetime');
// 基础模块
var controlor = require('../bin/base');
// 添加服务器
router.post('/add/server',function(req,res,next){
	var new_server = {};
	var restResult = new RestResult();
	if(req.body.serverIp){
		new_server.serverIp = req.body.serverIp;
		new_server.maxApp = req.body.maxApp||20;
		new_server.left = req.body.maxApp||20;
		new_server.processNum = 0;
		var newServer = new ServerEntity(new_server);
		newServer.save(function(err,rst){
			if(err){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
				// restResult.value = err;
				res.send(restResult);
				return;
			}else{
				restResult.value = rst;
				res.send(restResult);
			}
		});
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
		return ;
	}
});

// 查看服务器列表
router.get("/show/list",function(req,res,next){
	var restResult = new RestResult();
	ServerEntity.find({},function(err,rst){
		if(err){
			restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
			restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
			res.send(restResult);
			return;
		}else{
			restResult.value = rst;
			res.send(restResult);
			return;
		}
	})
})

// 创建应用窗口
router.get("/create/app",function(req,res,next){
	var cmdStr = 'electron --ignore-certificate-errors bot/index.js --enable-logging xue';
	var p = exec(cmdStr,function(err,stdout,stderr){
		console.log(err);
	});
	var cpt = controlor.getIPv4();
	ServerEntity.update({serverIp:cpt.IP},{$inc:{processNum:1,left:-1}},function(err,rst){
		if(!err){
			console.log(rst);
		}
	})
	p.on("exit",function(code){
		ServerEntity.update({serverIp:cpt.IP},{$inc:{processNum:-1,left:1}},function(err,rst){
			if(!err){
				console.log(rst);
			}
		})
	})
	res.send({pid:p.pid});
})

module.exports = router;