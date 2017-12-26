var page_start = Date.parse(new Date());
var ctypes = ["none","qidian","huangli","wenzi","lybrowser","baipai","wenzitheme","yingyonghui","lyHTML"];

var Log = function(baseinfo,adIDs){
	adIDs = adIDs||[];
	var _this = this;
	this.nid = baseinfo.nid||0;
	this.cid = baseinfo.cid;
	this.source = baseinfo.source||"feed";
	var ctype_tmp = "";
	if(typeof(baseinfo.ctype)=="number"){
		ctype_tmp = ctypes[baseinfo.ctype];
	}else if(typeof(baseinfo.ctype)=="string"){
		ctype_tmp = baseinfo.ctype;
	}else{
		ctype_tmp = "qita";
	}
	this.basicinfo = {
		uid:baseinfo.uid,
		ptype:"Web",
		ctype:ctype_tmp,
		version_text:"1.1.1",
	}

	// 新闻日志
	if(this.nid){
		$(window).unload(function(){
			_this.read_time();
		})
		this.news_click();
	}
	// 遍历页面上所有的广告
	for(var n in adIDs){
		var item = $(adIDs[n]);
		var aid = item.attr("ad-aid")

		// 广告点击
		item.click(function(){
			_this.ad_click(aid);
		})
		// 广告请求
		this.ad_req(aid);
	}
	// 广告露出
	$(window).scroll(function(){
		var al = adIDs.length;
		for(a=0;a<al;a++){
			var item = $(adIDs[a]);
			var has_req = item.attr("data-log");
			// 未记录并且在页面上显示
			if(has_req!="true"&&_this.is_show(adIDs[a])){
				item.attr("data-log",true);
				_this.ad_show(aid);
			}
		}
	})
	setTimeout(function(){$(window).scrollTop(1)},200);
}

Log.prototype = {
	// 日志记录
	log_conn:function(path,rqd){
	    var host = "http://log.deeporiginalx.com";
		var head = document.getElementsByTagName('head')[0];
		var scriptTag=document.createElement('script');
		head.appendChild(scriptTag);
		// scriptTag.type = "image/gif";
		scriptTag.src = host + path + "?log_data=" + encodeURI(JSON.stringify(rqd));
	},
	log_conn1:function(path,rqd){
	    var host = "http://log.deeporiginalx.com";
	    var xhr = new XMLHttpRequest();
	    var data = JSON.stringify(rqd);
	    xhr.open('get',host + path + "?log_data="+encodeURI(data));
	    xhr.send(); 
	},
	// 用户注册
	user_signin:function(){
		var path = "/rep/v2/log/users/signup/web";
		var rqd = {
			basicinfo:this.basicinfo,
			extend:""
		}
		console.log("用户注册",rqd);
		rqd.basicinfo.ctime = Date.parse(new Date())
		this.log_conn(path,rqd);
	},
	// 判断元素是否在屏幕可见区域
	is_show:function(newsid){
		var item_top = $(newsid).offset().top;
		var page_top = $(document).scrollTop();
		var window_height = $(window).height();
		var item_height = $(newsid).height();
		var num = item_top + item_height*(0.5) - page_top - window_height;
		if(num<0){
			return true;
		}else{
			return false;
		}
	},
	// 广告展示
	ad_show:function(aid){
		var path = "/rep/v2/log/ad/show/web";
		var rqd = {};
		rqd.basicinfo = this.basicinfo;
		rqd.basicinfo.ctime = Date.parse(new Date());
		rqd.data = {
			aid:aid,
			title:"",
			source:"gdtSDK"
		}
		rqd.extend = "";
		console.log("广告展示",rqd);
		this.log_conn(path,rqd);
	},
	// 广告点击
	ad_click:function(aid){
		var path = "/rep/v2/log/ad/click/web";
		var rqd = {};
		rqd.basicinfo = this.basicinfo;
		rqd.data = {
			aid:aid,
			title:"",
			source:"gdtSDK"
		}
		rqd.basicinfo.ctime = Date.parse(new Date());
		rqd.extend = "";
		console.log("广告点击",rqd);
		this.log_conn(path,rqd);
	},
	// 广告请求
	ad_req:function(aid){
		var path = "/rep/v2/log/ad/get/web";
		var rqd = {};
		rqd.basicinfo = this.basicinfo;
		rqd.data = {
			rnum:1,
			snum:1,
			aid:aid,
			source:"gdtSDK"
		};
		console.log("广告请求",rqd);
		this.log_conn(path,rqd);
	},
	// 新闻点击
	news_click:function(nid){
		var path = "/rep/v2/log/news/click/web";
		var rqd = {};
		rqd.basicinfo = this.basicinfo;
		rqd.basicinfo.ctime = Date.parse(new Date());
		rqd.data = {
			nid:this.nid,
			chid:this.cid,
			source:this.source,
		}
		rqd.extend = "";
		console.log("新闻点击",rqd);
		this.log_conn(path,rqd);
	},
	// 新闻阅读时长
	read_time:function(){
		var path = "/rep/v2/log/news/read/web";
		var rqd = {};
		rqd.basicinfo = this.basicinfo;
		rqd.basicinfo.ctime = Date.parse(new Date());
		var nowS = Date.parse(new Date());
		rqd.data = {
			nid:this.nid,
			begintime:page_start,
			endtime:nowS,
			readtime:(nowS - page_start)/1000
		}
		rqd.extend = "";
		console.log("阅读时长",rqd);
		this.log_conn(path,rqd);
	},
	// 用户行为记录
	user_action:function(action){
		var path = "/rep/v2/log/app/action/web";
		var rqd = {
			basicinfo:this.basicinfo,
			data:{
				atype:action.atype,
				from:action.from,
				to:action.to,
				params:action.params,
				effective:action.effective
			}
		};
		rqd.extend = "";
		console.log("用户行为"+action.atype,rqd);
		this.log_conn(path,rqd);
	}
}
