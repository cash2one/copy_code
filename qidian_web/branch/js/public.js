var News = function(){

};
News.prototype = {
    domain : document.location.protocol + "//" + document.location.host,
    url : this.domain + "",
    //计算字符串所占的像素值
    compute : function(v){
        var d = document.getElementById('dvCompute');
        d.innerHTML = v;
        return { w: d.offsetWidth, h: d.offsetHeight };
    },
    //返回规定长度的字符串  超出部分显示。。。
    cutStr : function(str,maxLength) {
        var str = str;
        var strlength = 0;
        if(maxLength){
            strlength = maxLength;
        }
        if(str&&str.length>strlength){
            str = str.slice(0,strlength) + "...";
        }
        return str;
    },
    // ajax请求
    dataConn : function (url, requestData, responseFn,type,backData,completeFn, async){
        $.ajax({
            type: (type != undefined ? type : "post"),
            url: url,
            dataType: "jsonp",
            contentType: "application/json;charset=UTF-8",
            data: requestData,
            jsonp:"callback",
            timeout: 20000,
            cache: false,
            async: (async != undefined ? async : true),
            beforeSend: function(XMLHttpRequest){
                //设置header参数
                // XMLHttpRequest.setRequestHeader("source", "share");
            },
            success: function(data, textStatus, XMLHttpRequest){
                if (data != null) {
                    // if (data.retCode != "00000") {
                    //     alert(data.retCode + " : " + data.retInfo);
                    //     return false;
                    // }
                    if (responseFn != undefined && typeof(responseFn) == "function") {
                       // try {
                            responseFn(data, textStatus,backData);
                        //} catch (e) {
                          //  console.log("[PARSE ERROR] name : " + e.name + ", message: " + e.msg);

                        //}
                    }
                } 
            },
            error: function(XMLHttpRequest, error){
                if (error == "timeout") {
                    alert("请求超时：请求系统返回数据超时！请稍候再试吧…");
                }
            },
            complete: function(XMLHttpRequest, textStatus){
                if (completeFn != undefined && typeof(completeFn) == "function") {
                    try {
                        completeFn(textStatus);
                    } catch (e) {
                        alert("[ERROR] name : " + e.name + ", message: " + e.message);
                    }
                }
            }
        })
    }
}
/**
 
 * 时间对象的格式化;
 
 */
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
var news = new News();

