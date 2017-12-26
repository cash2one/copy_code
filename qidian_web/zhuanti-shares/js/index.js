$(function(){
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null)
            return unescape(r[2]);
        return null;
    }
    $.ajax({
        url:'http://bdp.deeporiginalx.com/v2/ns/tdq?tid='+getUrlParam("tid"),
        type:'get',
        datatype:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success:function(data){
            $('.load').hide();
            if(data.code==2000){
            //var data=JSON.parse(e).data;//将字符串转化为json格式
            var imgData=data.data.topicBaseInfo.cover;
            $('.topImg img').attr('src',imgData);
            data.data.topicBaseInfo.description==''?$('.absBox').css('display','none'):$('.absWord').html(data.data.topicBaseInfo.description).parent('.absBox').show();
            var topicClass=data.data.topicClass;
            for(var i in topicClass){
                var getData='';
                var name=topicClass[i].topicClassBaseInfo.name;
                var newsFeed=topicClass[i].newsFeed;
                getData+='<div class="mainData"><div class="titleData"><div class="colorBox"></div><span class="titleName">'+name+'</span></div>';
                for(var j in newsFeed){
                    var title=newsFeed[j].title;
                    var pname=newsFeed[j].pname;
                    var channel=newsFeed[j].channel;
                    var nid=newsFeed[j].nid;
                    if(newsFeed[j].hasOwnProperty('imgs')) {
                        var imgs = newsFeed[j].imgs;
                        //一张图片
                        if (imgs.length == 1||imgs.length == 2) {
                            getData += '<a class="fenleiCard" href="http://deeporiginalx.com/news.html?type=0&nid='+nid+'"><div class="fenleiWord"><p class="wordData">' + title + '</p>';
                            getData += '<div class="formData"><div class="form">' + pname + '</div><div class="num">' + channel + '评</div>';
                            getData += '</div></div><div class="fenleiImg"><img src="' + imgs[0] + '"></div></a>';
                        } else {
                            //三张图片
                            getData += '<a class="fenleiCard" href="http://deeporiginalx.com/news.html?type=0&nid='+nid+'"><div class="fenleiWordnoimg"><p class="wordData">' + title + '</p><div class="imgData">';
                            for (var k in imgs) {
                                var image = imgs[k];
                                getData += '<img src="' + image + '" alt=""/>';
                            }
                            getData += '</div><div class="formData"><div class="form">' + pname + '</div><div class="num">' + channel + '评</div></div></div></a>';
                        }

                    }else{
                        //无图
                        getData+='<a class="fenleiCard" href="http://deeporiginalx.com/news.html?type=0&nid='+nid+'"><div class="fenleiWordnoimg"><p class="wordData">'+title+'</p><div class="formData"><div class="form">'+pname+'</div><div class="num">'+channel+'评</div></div></div></a>';
                    }

            }
                getData+='</div>';
                $('.mainBox').append(getData);
            }
        }else{
            $('.error').show();
        }
        },
        error:function(){
            alert('error');
        }
    })
//    download
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
    if(isAndroid){$(".downbtn a").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk");}else if(isiOS||webApp){$(".downbtn a").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$(".downbtn a").attr("href","http://deeporiginalx.com/");}
    if(isWeiXin()){
        $(".downbtn").click(function(){
            $(".yingdao").css("display","block");
            $(".downbtn a").attr('href','javascript:;');
        });

    }
});