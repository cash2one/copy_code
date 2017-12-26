$(function(){
var getData='',pname,transdates;
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null)
            return r[2];
        return null;
    }
    pname=decodeURIComponent(getUrlParam('pname'));
    transdates=transdate(getNowFormatDate());
    $.ajax({
        url:'http://bdp.deeporiginalx.com/v2/ns/pbs?pname='+pname+'&tcr='+transdates+'&info=1',
        type:'get',
        dataType:'json',
        success:function(e){
            var info= e.data['info'];
            var news= e.data['news'];
            var name=info.name;
            var icon=info.icon;
            var descr=info.descr;
            $('.imgs img').attr('src',icon?icon:'img/touxiang.png');
            $('.Tword').html(name);
            if(descr!=undefined){
                $('.none').show();
                $('.Jsword').show().html(descr);
            }
            for(var i in news){
                var nid=news[i].nid;
                var title=news[i].title;
                var pnames=news[i].pname;
                if(!('imgs' in news[i])){
                    getData+=' <a href="http://deeporiginalx.com/news.html?type=0&nid='+nid+'"><li><p class="titleWord">'+title+'</p>';
                    getData+='<div class="fromBox"><span class="from">'+pnames+'</span></div></li></a>';
                }else{
                    var images=news[i].imgs;
                    if(images.length==1){
                        getData+='<a href="http://deeporiginalx.com/news.html?type=0&nid='+nid+'"><li><div class="imgbox"><img src='+images+'></div>';
                        getData+='<div class="wordBox"><p class="titleWord">'+title+'</p><div class="fromBox"><span class="from">'+pnames+'</span></div></div></li></a>';
                    }else{
                        getData+='<a href="http://deeporiginalx.com/news.html?type=0&nid='+nid+'"><li><p class="titleWord">'+title+'</p><div class="imgboxs">';
                        for(var j=0;j<images.length;j++){
                            getData+='<div><img src='+images[j]+'></div>';
                        }
                        getData+='</div><div class="fromBox"><span class="from">'+pnames+'</span></div></li></a>';
                    }
                }

            }
            $('.mainBox').append(getData);
        }
    })
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端;
    var qq =u.indexOf('MQQBrowser') > -1;
    var webApp = u.indexOf('Safari') == -1;
    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }
    if(isWeiXin()){
        $("#download").click(function(){
            $(".yingdao").css("display","block");
        });
        $("#footertu").click(function(){
            $(".yingdao").css("display","block");
        })
        $(".down a").click(function(){
            $(".yingdao").css("display","block");
        })

    }
    if(isAndroid){if(qq){$("#download").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidianzixun_v3_3_20160804.apk ");}else{$("#download").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidianzixun_v3_3_20160804.apk ");}}else if(isiOS||webApp){$("#download").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$("#download").attr("href","http://deeporiginalx.com/");}

})