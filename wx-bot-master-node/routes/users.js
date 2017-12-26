var express = require('express');
var router = express.Router();
var RestResult = require('../RestResult');
var fs = require('fs');
var UserEntity = require('../models/User').UserEntity;
var GroupEntity = require('../models/Group').GroupEntity;
var MessageEntity = require('../models/Message').MessageEntity;
// 文件实体
var FilesEntity = require('../models/Files').FilesEntity;
// 登陆二维码实体
var LoginEntity = require('../models/Login').LoginEntity;
// 日期格式化
var myDate = require('silly-datetime');
router.all('/*',function(req,res,next){
	var _id = req.headers.token;
	var restResult = new RestResult();
	LoginEntity.findOne({_id:_id},function(err,rst){
		if(rst&&rst.status=="online"){
			next();
		}else{
			restResult.code = RestResult.AUTH_ERROR_CODE;
			restResult.info = RestResult.AUTH_ERROR_INFO;
			res.send(restResult);
			return;
		}
	})
})

// 获取所有用户群组
router.get('/groups',function(req, res, next) {
	var wxuin = req.query.wxuin;
	var restResult = new RestResult();
	if(!wxuin){
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
		return ;
	}
	GroupEntity.find({wxuin:wxuin},function(err,rst){
		if(err){
			restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
			restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
			res.send(restResult);
			return;
		}
		restResult.value = rst;
		res.send(restResult);
	})
});

// 查看登陆状态
router.get('/status',function(req,res,next){
	var restResult = new RestResult();
	var _id = req.query._id;
	if(!_id){
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE; 
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
		return '';
	}
	LoginEntity.findOne({_id:_id},function(err,raw){
		if(err){
			restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE; 
			restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
			res.send(restResult);
			return '';
		}
		restResult.value = raw;
		res.send(restResult);
	})
})

// 上传文件
router.post('/upload',function(req,res,next){
	var restResult = new RestResult();
	var files = req.files.pics;
	var msgType = req.body.type;
	var wxuin = req.body.wxuin;
	var item,name,tmp;
	item = files;
	if(wxuin&&msgType&&item){
		name = item.name;
		var tmpPath = item.path,type = item.type,pic_type = '',pic_name = '';
		pic_name = (new Date().getTime()) + "" + (Math.round(Math.random()*999));//生成随机名称
		switch(type){
			case "image/jpg": pic_type = ".jpg"; break;
			case "image/jpeg": pic_type = ".jpeg"; break;
			case "image/png": pic_type = ".png"; break;
			case "audio/mp3": pic_type = ".mp3"; break;
			default: 
				restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
				restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
				res.send(restResult);
				return;
		}
		var targetName = pic_name + pic_type;
		var targetPath = '',showPath = '';
		if(!fs.existsSync('public/'+wxuin+"/")){
            fs.mkdirSync('public/'+wxuin+"/");
		}
		if (!fs.existsSync('public/'+wxuin+"/"+ msgType+"/")) {
            fs.mkdir('public/'+wxuin+"/"+ msgType+"/");
        }
        targetPath = 'public/'+wxuin+"/"+ msgType +"/";
        showPath = wxuin+"/"+ msgType +"/";
		var is = fs.createReadStream(tmpPath);
		var targetFile = targetPath+targetName;
		var os = fs.createWriteStream(targetFile);
		is.pipe(os);
		is.on("end",function(){
			fs.unlink(tmpPath);
			var newfile = {
				wxuin:wxuin,
				path:showPath,
				name:targetName,
				type:msgType
			};
			solve_file(newfile,function(err,rst){
				restResult.value = {
					name:targetName,
					src:showPath+targetName
				}
				res.send(restResult);
			})
		})
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
	}
})

// 上传完成处理文件
function solve_file(newfile,callback){
	var file = new FilesEntity(newfile);
	var query = file.save();
	query.then(function(){
		callback();
	})
}

// 查看素材库
router.get("/files/show",function(req,res,next){
	var wxuin = req.query.wxuin;
	var type = req.query.type;
	var restResult = new RestResult();
	if(wxuin&&type){
		FilesEntity.find({wxuin:wxuin,type:type},"_id path name",function(err,rst){
			if(err){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
			}else{
				restResult.value = rst;
			}
			res.send(restResult);
			return;
		})
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
		return;
	}
})

// 添加一条消息	
router.post('/message/send',function(req,res,next){
	var restResult = new RestResult();
	var content = req.body.content;
	var wxname = req.body.wxname;
	var wxuin = req.body.wxuin;
	var targetGroup = req.body.targetGroup;
	var theme = req.body.theme;
	var type = req.body.type;
	var createTime = myDate.format(new Date(),"YYYY-MM-DD HH:mm:SS");
	var sendTime = req.body.sendTime;
	if(targetGroup&&type&&sendTime&&content.trim()){
		var newmsg = new MessageEntity({
			wxname:wxname,
			wxuin:wxuin,
			createTime:createTime,
			sendTime:sendTime,
			theme:theme,
			targetGroup:targetGroup,
			type:type,
			content:content,
			status:"wait"
		})
		newmsg.save(function(err,raw){
			if(err){
				restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
				restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
				res.send(restResult);
				return;
			}
			restResult.value = raw;
			res.send(restResult);
		})
	}else{
		restResult.code = RestResult.TARGET_NOT_EXIT_ERROR_CODE;
		restResult.info = RestResult.TARGET_NOT_EXIT_ERROR_INFO;
		res.send(restResult);
		return;
	}
})

// 修改信息
router.post('/message/update',function(req,res,next){
	var restResult = new RestResult();
	var msgid = req.body._id;
	var content = req.body.content;
	var wxname = req.body.wxname;
	var wxuin = req.body.wxuin;
	var targetGroup = req.body.targetGroup;
	var theme = req.body.theme;
	var type = req.body.type;
	var createTime = req.body.createTime;
	var sendTime = req.body.sendTime;
	MessageEntity.findByIdAndUpdate(id,{$set:{content:content,targetGroup:targetGroup,theme:theme,type:type,sendTime:sendTime}},function(err,rst){
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

// 获取信息
router.get("/message/show",function(req,res,next){
	var restResult = new RestResult();
	var wxuin = req.query.wxuin;
	var status = req.query.status;
	MessageEntity.find({wxuin:wxuin,status:status},function(err,rst){
		if(err){
			restResult.code = RestResult.SERVER_EXCEPTION_ERROR_CODE;
			restResult.info = RestResult.SERVER_EXCEPTION_ERROR_INFO;
			res.send(restResult);
			return;
		}else{
			restResult.value = rst;
			res.send(restResult);
			return ;
		}
	})
})

module.exports = router;