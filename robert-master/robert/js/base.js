var base = {}
 var host = "http://103.231.68.73:11000/";
//var host = "172.16.41.198:8383/";
base.data_conn = function(path,rqd,backfn,type){
    if(type!='get'){
        rqd=JSON.stringify(rqd)
    }
    $.ajax({
        type: type||"get",
        url: host+path,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: rqd,
        //data: JSON.stringify(rqd),
        jsonp:"callback",
        timeout: 100000,
        crossDomain:true,
        cache: false,
        async: true,
        statusCode: {
            401:function(){
                window.location.href = "pages-login.html";
            }
        },
        beforeSend: function(XMLHttpRequest){
            //设置header参数
            XMLHttpRequest.withCredentials = true;
            // XMLHttpRequest.setRequestHeader("myCookie",document.cookie);
        },
        success: function(data, code, xhr){
            if (data != null) {
                if (backfn != undefined && typeof(backfn) == "function") {
                    if(data.code==0){
                        backfn(data, code,xhr);
                    }else{
                        alert(data.info);
                    }

                }
            }
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