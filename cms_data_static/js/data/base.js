var base = {};
 //var host = "http://60.28.29.47:9000/";
var host = "http://fez.deeporiginalx.com:9003/";
//var host="172.16.31.229:8000/"
base.data_conn = function(path,rqd,backfn,type){
    if(type!='get'){
        rqd=JSON.stringify(rqd);
    }
    $.ajax({
        type: type||"get",
        url: host+path,
        //dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: rqd,
        //data: JSON.stringify(rqd),
        jsonp:"callback",
        timeout: 100000,
        crossDomain:true,
        cache: false,
        async: true,
        xhrFields: {
            withCredentials: true
        },
        statusCode: {
            401:function(){
                // window.location.href = "pages-login.html";
            }
        },
        beforeSend: function(XMLHttpRequest){
            //设置header参数
            //XMLHttpRequest.withCredentials = true;
             XMLHttpRequest.setRequestHeader("Authorization",'Token '+ $.cookie('token'));
            //XMLHttpRequest.setRequestHeader("Author",'Token ');
        },
        success: function(data, code, xhr){
            //if (data != null) {
                if (backfn != undefined && typeof(backfn) == "function") {
                    if(data.code==200){
                        backfn(data, code,xhr);
                    }else{
                        //alert(data.info);
                    }

                }
            //}
        }
    })
};
base.getUrlParam = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null)
        return unescape(r[2]);
    return null;
};
base.addDate = function(dd,dadd){
    var a = new Date(dd)
    a = a.valueOf()
    a = a + dadd * 24 * 60 * 60 * 1000
    a = new Date(a)
    return a;
};

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
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
base.data_send=function(path,rqd,backfn,type){
    $.ajax({
        type: type||"get",
        url: host+path,
        data : rqd,
        cache : false,
        processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType : false, // 不设置Content-type请求头
        beforeSend: function(XMLHttpRequest){
            //if(head){
            //    //设置header参数
            //    XMLHttpRequest.withCredentials = true;
                XMLHttpRequest.setRequestHeader("Authorization",'Token '+$.cookie('token'));
            //}
        },
        statusCode: {
            401:function(){
                window.location.href = "pages-login.html";
            }
        },
        success: function(data, code, xhr){

            if (data != null) {
                if (backfn != undefined && typeof(backfn) == "function") {
                    if(data.code==200){
                        backfn(data, code,xhr);
                    }else{
                        //alert(data.info);
                    }

                }
            }
        }
    })
};
function resetJSON(arr){
    var result = {};
    for(var a in arr){
        var nk = "";
        if(typeof(arr[a])=="string"||typeof(arr[a])== "number"||arr[a]===null){
            if(a.indexOf("/")>=0){
                nk = a.replace(/\//g ,"_");
                result[nk] = arr[a]+"";
            }else{
                result[a] = arr[a]+"";
            }
        }else{
            var obj = resetJSON(arr[a]);
            for(var o in obj){
                if(a.indexOf("/")>=0){
                    nk = a.replace(/\//g ,"_");
                    result[nk+o] = obj[o];
                }else{
                    result[a+o] = obj[o];
                }
            }
        }
    }
    return result;
}
(function(){
    var url=window.location.href;
    var str=url.substr(url.lastIndexOf("/")+1);
    $(".x-navigation li").each(function(i,obj){
        if($(obj).find("a").attr("href")==str){
            $(obj).addClass("active");
        }else{
            $(obj).removeClass("active");
        }
    })
})();