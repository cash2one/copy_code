var base = {}

base = {
	get_url_parm : function(name,src){
		if(!src){
			src = '--?--';
		}
	    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)"); 
	    var parms = src.split('?')[1];
	    if(!parms){ return;             }
	    return parms.match(reg)?parms.match(reg)[2]:''
	},
	readCookie : function (name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return false;
	},
	setCookie:function(name,value,time) { 
	    var Days = 30; 
	    // var exp = new Date(); 
	    // exp.setTime(exp.getTime() + Days*24*60*60*1000); 
	    document.cookie = name + "="+ escape (value) + ";expires=" + time; 
	},
	upload_file:function(url,data,callback,type){
		var xhr = new XMLHttpRequest();
		var fd = new FormData();
		for(var d in data){
			fd.append(d,data[d]);
		}
		xhr.open(type,url);
		xhr.send(fd);
		xhr.addEventListener("load",function(evt){
			callback(JSON.parse(evt.currentTarget.response));
		})
	},
	js_conn:function(url,data,callback,type){
		var xhr = new XMLHttpRequest();
		xhr.open(type,url);
		if(type=='post'){
			data = JSON.stringify(data);
		}
		xhr.send(data);
		xhr.onreadystatechange = function(){
		    var XMLHttpReq = xhr;
		    if (XMLHttpReq.readyState == 4) {
		        if (XMLHttpReq.status == 200) {
		            var text = XMLHttpReq.responseText;
		            text = JSON.parse(text)
		            callback(text);
		        }
		    }
		};
	},
	data_conn:function(url,data,callback,type){
		if(type=='post'){
			data = JSON.stringify(data)
		}
		$.ajax({
	        type: type||"get",
	        url: url,
	        dataType: "json",
	        contentType:"application/json; charset=UTF-8",
	        data: data,
	        jsonp:"callback",
	        timeout: 100000,
	        crossDomain:true,
	        cache: false, 
	        async: false,
	        beforeSend: function(XMLHttpRequest){
	            // 设置header参数
	        	XMLHttpRequest.withCredentials = true;
	         	XMLHttpRequest.setRequestHeader("wxrobert",base.readCookie('wxrobert'));
	         	// transaudient
	        },
	        success: function(data, code, xhr){
	            callback(data);
	        }
	    })
	},
	createa_radom:function(){
		var data = {},date = new Date();
		var random_data = date.getTime()+''+ parseInt(Math.random()*10000);
		return random_data
	},
	// 去掉字符串中的空格
	mytrim:function(str){
		return str.replace(/\s/g, "");
	}
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
module.exports = base;