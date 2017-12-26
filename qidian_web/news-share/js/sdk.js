
var List = function(obj){
	if(obj.containerID){
		this.container = document.getElementById(obj.containerID);
	}else{
		var div = document.createElement("div");
		div.classList.add("news-content");
		var body = document.getElementsByTagName("body")[0];
		document.body.insertBefore(div,body.firstChild);
		this.container = div;
	}
	this.container.style.height = "auto";
	this.keyword = obj.keyword||"";
	this.count = obj.count||5;
	this.type = obj.type||1;
	// this.font_size = this.type+11;
	this.keyword_sign = obj.keyword_sign||false;
	this.source = obj.source;
	this.init();
	this.pre_request();
}
List.prototype = {
	init:function(){
		var frame = document.createElement("iframe");
		var parms = {
			keyword:this.keyword,
			count:this.count,
			type:this.type,
			keyword_sign:this.keyword_sign,
			source:this.source
		};
		frame.src = "http://deeporiginalx.com/news-share/list.html?keyword="+this.keyword+"&count="+this.count + "&type=" +this.type+"&keyword_sign="+this.keyword_sign+"&source="+this.source;
		frame.style.border = "none";
		frame.style.width = "100%";
		this.frame = frame;
		// frame.style.height = this.count*144+"px";
		// frame.addEventListener("load",this.pre_request);
		this.container.appendChild(frame);
	},
	pre_request:function(){
		var _this = this;
		Ajax.init({
			url:"http://bdp.deeporiginalx.com/v2/ns/es/s",
			type:"get",
			dataType:"jsonp",
			data:{"keywords":_this.keyword,"p":"1","c":(_this.count>20?_this.count:20)},
			callback:"callback",
				time:"1000",
			success:function(data){
				var finalHeight = 0;
				var lists = [];
				if(data.code==2000&&data.data.length>0){
					lists = data.data;
				}else{
					_this.container.style.display = 'none';
					_this.frame.style.display = 'none';
					return;
				}
				if(lists&&lists.length>0){
					for(var l in lists){
						lists[l].ptime = Date.parse(new Date(lists[l].ptime));
					}
					lists = lists.sort(_this.compare("ptime"));
				}else{
					return;
				}
				var show_length = (_this.count>lists.length?lists.length:_this.count);
				for(var l=0;l<show_length;l++){
					var list = lists[l];
					if(list.imgs&&list.imgs.length>0){
						finalHeight += 113;
					}else{
						var div = document.createElement("div");
						div.innerHTML = list.title;
						var strL = div.innerText.length;
						var winW = _this.container.offsetWidth;
						var line = Math.ceil(strL*14/winW);
						// console.log((line+1)*31+20);
						finalHeight += (line+1)*31+10;
					}
				}
				_this.frame.style.height = finalHeight + "px";
			},
			fail:function(ex){
				if(ex){
					_this.container.style.display = 'none';
				}
			}
		});
	},
	compare:function (propertyName) { 
		return function (object1, object2) { 
			var value1 = object1[propertyName]; 
			var value2 = object2[propertyName]; 
			if (value2 < value1) { 
				return -1; 
			}else if (value2 > value1) { 
				return 1; 
			} else { 
				return 0; 
			} 
		} 
	} 
}
var Ajax=function(params){
	this.config={
		url:"",
		type:"get",
		async:true,
		dataType:"json",
		contentType:"application/x-www-form-urlencoded; charset=UTF-8",
		data:{}
	};
	this.start(params);
};
var xhr = null;
Ajax.init=function(params){
	new Ajax(params);
};
Ajax.prototype={
	constructor: Ajax,
	createXHR:function(){
		if(typeof XMLHttpRequest!='undefined'){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject!='undefined'){
			if(typeof arguments.callee.activeXString!='string'){
				var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i,len;
				for(i=0,len=versions.length;i<len;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString=versions[i];
						break;
					}catch(ex){

					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw new Error("No XHR object available.");
		}
	},
	start:function(params){
		xhr=new this.createXHR();
		if(params.url){
			this.config.url=params.url;
		}else{
			throw new Error("url cannot be null!");
		}
		if(params.type){
			this.config.type=params.type;
		}
		if(params.async){
			this.config.async=params.async;
		}
		if(params.dataType){
			this.config.dataType=params.dataType;
		}
		if(params.data){
			this.config.data=params.data;
		}
		if(params.success){
			this.config.success=params.success;
		}
		if(params.fail){
			this.config.fail=params.fail;
		}
		if(params.beforeSend){
			params.beforeSend();
		}

		var complete=function(){
			if(xhr.readyState==4){
					if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
						if(params.success){
							params.success(xhr.responseText);
						}
					}else{
						if(params.fail){
							params.fail();
						}else{
							throw new Error("Request was unsucessful:"+xhr.status);
						}
					}
			}
		}

		if(this.config.dataType=="json"||this.config.dataType=="JSON"){//非跨域
			if((this.config.type=="GET")||(this.config.type=="get")){
				for(var item in this.config.data){
					this.config.url=addURLParam(this.config.url,item,this.config.data[item]);
				}
				xhr.onreadystatechange=complete;
				xhr.open(this.config.type,this.config.url,this.config.async);
				xhr.send(null);
			}
			if(this.config.type=="POST"||this.config.type=="post"){
				xhr.addEventListener('readystatechange',complete);
				xhr.open(this.config.type,this.config.url,this.config.async);
				if(params.contentType){
					this.config.contentType=params.contentType;
				}
				xhr.setRequestHeader("Content-Type",this.config.contentType);
				xhr.send(serialize(this.config.data));
			}
		}else if((this.config.dataType=="jsonp")||(this.config.dataType=="JSONP")){//跨域
			if((this.config.type=="GET")||(this.config.type=="get")){//jsonp只能进行get请求跨域
				if(!params.url||!params.callback){
					throw new Error("params is illegal!");
				}else{
					this.config.callback=params.callback;
				}
				//创建script标签
				var cbName='getJSON'+ Math.floor(Math.random() * 1000000);
				var head=document.getElementsByTagName('head')[0];
				this.config[this.config.callback]=cbName;
				var scriptTag=document.createElement('script');
				head.appendChild(scriptTag);

				//创建jsonp的回调函数
				window[cbName]=function(json){
					head.removeChild(scriptTag);
					clearTimeout(scriptTag.timer);
					window[cbName]=null;
					params.success&&params.success(json);
				};
				//超时处理
				if(params.time){
					scriptTag.timer=setTimeout(function(){
						head.removeChild(scriptTag);
						params.fail&&params.fail({message:"over time"});
						window[cbName]=null;
					},params.time);
				}
				this.config.url=this.config.url+"?callback="+cbName;
				for(var item in this.config.data){
					this.config.url=addURLParam(this.config.url,item,this.config.data[item]);
				}
                scriptTag.src=this.config.url;
			}
		}else{
			throw new Error("dataType is error!");
		}
	}
}
function addURLParam(url,name,value){
	url+=(url.indexOf("?")==-1 ? "?" : "&");
	url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
	return url;
}
//序列化函数
function serialize(data){
	var val="";
	var str="";
	for(var item in data){
		str=item+"="+data[item];
		val+=str+'&';
	}
	return val.slice(0,val.length-1);
}
window["Ajax"]=Ajax;