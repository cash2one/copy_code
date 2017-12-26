var base = {};

// ajax请求封装
base.data_conn = function(path,rqd,backfn,type,ctype){
	var host = "http://bdp.deeporiginalx.com";
    type = (type?type.toLocaleLowerCase():false)
	if(type=="post"&&!ctype){
		rqd = JSON.stringify(rqd);
	}
	$.ajax({
        type: type||"get",
        url: host+path,
        dataType: "json",
        contentType: ctype?"application/x-www-form-urlencoded; charset=utf-8":"application/json; charset=UTF-8",
        data: rqd,
        jsonp:"callback",
        timeout: 10000,
        crossDomain:true,
        cache: false, 
        statusCode: {},
        beforeSend: function(XMLHttpRequest){
            //设置header参数
        	// XMLHttpRequest.withCredentials = true;
         	// XMLHttpRequest.setRequestHeader("myCookie",document.cookie);
        },
        success: function(data, code, xhr){
            if (data != null) {
                if (backfn != undefined && typeof(backfn) == "function") {
                    backfn(data, code,xhr);
                }
            }
        },
        error: function(XMLHttpRequest, error,option){
            // alert(XMLHttpRequest);
            // alert(option);
            if (error == "timeout") {
                console.log("请求超时：请求系统返回数据超时！请稍候再试吧…");
            }
        },
        complete:function(res,status){
            $(".loadding").hide();
        }
    })
}

base.jsonp_conn = function(path,rqd,backfn){
    var host = "http://bdp.deeporiginalx.com";
    var timer = Math.floor(Math.random() * 1000000);
    $.ajax({
        type: "get",
        url: host+path,
        dataType: "jsonp",
        data: rqd,
        jsonp:"callback",
        jsonpCallback:"getJSON"+timer,
        timeout: 60000,
        crossDomain:true,
        success: function(data, code, xhr){
            backfn(data);
        },
        error: function(xhr, err,option){
            console.log("请求错误",xhr,err,option);
            var domain = "http://log.deeporiginalx.com";
            var path = '/rep/v2/log/error/web';
            var req_data = {
                nid:rqd.nid,
                appName:navigator.appName,
                time:new Date().format("yyyy-mm-dd hh:MM:dd"),
                error:err
            }
            var head = document.getElementsByTagName('head')[0];
            var scriptTag=document.createElement('script');
            head.appendChild(scriptTag);
            // scriptTag.type = "image/gif";
            scriptTag.src = domain + path + "?log_data=" + encodeURI(JSON.stringify(req_data));
        }
    })
}

// 获取URL中的参数
base.get_url_param = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null)
      return decodeURIComponent(r[2]);
    return null;
}

// 比较对象中某属性大小
base.compare = function (propertyName) { 
    return function (object1, object2) { 
        var value1 = object1[propertyName]; 
        var value2 = object2[propertyName]; 
        if (value2 < value1) { 
            return -1; 
        } 
        else if (value2 > value1) { 
            return 1; 
        } 
        else { 
            return 0; 
        } 
    } 
}

// iframe点击事件 ---(跨域)
base.iframeOnClick = {  
    resolution: 200,  
    iframes: [],  
    interval: null,  
    Iframe: function() {  
        this.element = arguments[0];  
        this.cb = arguments[1];   
        this.hasTracked = false;  
    },  
    track: function(element, cb) {  
        this.iframes.push(new this.Iframe(element, cb));  
        if (!this.interval) {  
            var _this = this;  
            this.interval = setInterval(function() { _this.checkClick(); }, this.resolution);  
        }  
    },  
    checkClick: function() {  
        if (document.activeElement) {  
            var activeElement = document.activeElement;  
            for (var i in this.iframes) {  
                if (activeElement === this.iframes[i].element) { // user is in this Iframe  
                    if (this.iframes[i].hasTracked == false) {   
                        this.iframes[i].cb.apply(window, []);   
                        this.iframes[i].hasTracked = true;  
                    }  
                } else {  
                    this.iframes[i].hasTracked = false;  
                }  
            }  
        }  
    }  
};

// 获取图片宽高
base.img_size = function(url){
    var str = url.substring(url.lastIndexOf("_")+1,url.lastIndexOf("."));
    var size = str.split('X');
    return {w:size[0],h:size[1]};
}
// iframe点击事件 ---(跨域)
base.addEvent = function(o, evt, func) {
    if (o.addEventListener) o.addEventListener(evt, func, false);
    else if (o.attachEvent) o.attachEvent('on' + evt, func);
}

base.addDocClickEvt = function(ifr,func) {
    base.addEvent(ifr.contentWindow.document, "click", func );
}

// 获取cookie值
base.get_cookie = function (name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); //通过正则表达式获取cookie为name的字符组
    if(arr!=null){
        return unescape(arr[2]); //输入返回
    }
    return "";
}

// 设置cookie值
base.set_cookie = function (name,value,invalid){ //name为cookie的名称,value为name值
    var days = invalid||10; //保存天数,可作为参数传进来
    var expires = new Date(); //建立日期变量
    expires.setTime(expires.getTime() + days * 30 * 24 * 60 * 60 * 1000); //expires过期时间 = 当前时间 +过期时间(秒)
    var str = name + '=' + value +';expires=' + expires.toGMTString(); //将值及过期时间一起保存至cookie中(需以GMT格式表示的时间字符串)
    //var str = name + ‘=’ + escape(value) +’;expires=’ + expires.toGMTString(); 
    document.cookie = str;
}

Date.prototype.format = function(format) {
    if (this == "Invalid Date") return "无";
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
            // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}