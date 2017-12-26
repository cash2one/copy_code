$(function() {
    var is=0;
    var backdata = {};//请求返回结果
    var beginNum = 1;// 开始条数
    var endNum = 3;// 结束条数
    var equiptype = "";//设备类型
    var myScroll1,bb, y,num;
    //上拉获取相关观点
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if(scrollTop + windowHeight == scrollHeight){
            //alert(1)
            beginNum += 5;
            endNum += 5;
            getRelate (backdata,beginNum,endNum,equiptype);
        }
    });
    var ch=$(window).height();
    function obj2key(obj, keys){
        var n = keys.length,
            key = [];
        while(n--){
            key.push(obj[keys[n]]);
        }
        return key.join('|');
    }
    function uniqeByKeys(array,keys){
        var arr = [];
        var hash = {};
        for (var i = 0, j = array.length; i < j; i++) {
            var k = obj2key(array[i], keys);
            if (!(k in hash)) {
                hash[k] = true;
                arr .push(array[i]);
            }
        }
        return arr ;
    }
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端;
    var qq =u.indexOf('MQQBrowser') > -1;
    var webApp = u.indexOf('Safari') == -1;
    var num;
    var url;
    function GetRequest() {
        url =decodeURIComponent(location.search);//获取url中"?"符后的字串
        // console.log(url);
        if(url.match('id=')=='id='){
            num=url.substr(url.indexOf("id=")+2,5);
        }else{
            num="";
        }
        if(url==''){
            $(".bannerzhe").css("display","none");
        }
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
            }return theRequest;
        }else{
            location.href="error.html";
        }
    }
    var Request = new Object();
    Request =GetRequest();
    if(url.match('newsid')=='newsid'){
        var str=Request['newsid'];
        var collection=Request['collection'];
        $(".news").show();
        $(".zhuanti_news").hide();
    }else if(url.match('url')=='url'){
        var str=Request['url']+num;
        var mm=Request['id'];
        $(".news").show();
        $(".zhuanti_news").hide();
    }else if(url.match('nid')=='nid'){
        var str=Request['nid'];
        $(".news").show();
        $(".zhuanti_news").hide();
    }else if(url.match("tid")=="tid"){
        //专题详情页
        var str=Request['tid'];
        $(".news").hide();
        $(".zhuanti_news").show();
        $('body').css("background","#f0f0f0");
        $.ajax({
            url:'http://bdp.deeporiginalx.com/v2/ns/tdq?tid='+str,
            type:'get',
            datatype:'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success:function(data){
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
                            if (imgs.length == 1) {
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
            },
            error:function(){
                alert('error');
            }
        });
        return;
    //    专题详情页结束
    }
    var type=Request['type'];
    if(type==0||type==undefined){
            //安卓get
        var datas={"utype":2,"platform":3,"province":"北京市","city":"北京市","district":"东城区"};
        $.ajaxSetup({
            async: false
        });
        //游客注册
        if($.cookie('uid')==null){
            $.ajax({
                url:'http://bdp.deeporiginalx.com/v2/au/sin/g?token=1',
                type:'post',
                datatype:"json",
                data:JSON.stringify (datas),
                contentType:'application/json',
                success:function(data,status,xhr){
                    // console.log(data);
                    if(data.code==2000){
                        Authorizations=data.token;
                        $.cookie('Authorizations',Authorizations,{expires:365});
                        $.cookie('uid',data.data.uid,{expires:365});
                    }else{
                        $.ajax({
                            url:'http://bdp.deeporiginalx.com/v2/au/sin/g?token=1',
                            type:'post',
                            datatype:'json',
                            data:JSON.stringify(datas),
                            contentType:'application/json',
                            success:function(data,status,xhr){
                                Authorizations=data.token;
                                $.cookie('Authorizations',Authorizations,{expires:365});
                                $.cookie('uid',data.data.uid,{expires:365});
                            }
                        })
                    }
                    //console.log(xhr.getResponseHeader('Authorization'));

                }
            })
        }
            //获取新闻详情接口
            $.ajax({
                url:"http://bdp.deeporiginalx.com/v2/ns/con?nid="+str+"&uid="+$.cookie('uid'),//del_html_tags(base64encode(str),"=",""),
                type:"get",
                cache:"false",
                async:"false",
                datatype:"jsonp",
                jsonp: "callbackparam",
                jsonpCallback:"jsonpCallback1",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success:function(e){
                    var cons=e['data']['content'];
                    var time=e['data']['ptime'];
                    var from=e['data']['pname'];
                    var title=e['data']['title'];
                    var docid=e['data']['docid'];console.log(del_html_tags(base64encode(docid),"=",""));
                    var commentSize=e['data']['comment'];
                    var videourl=e['data']['videourl'];
                    var channels=e['data']['channel'];
                    $("<div id='docid' style='display: none'></div>").html(del_html_tags(base64encode(docid),"=","")).appendTo("body");
                    $("meta[name='description']").attr("content",title);
                    $(".bannertitle").html(title);
                    document.title=title;
                    $(".date").html(time);
                    $(".time").html(from);
                    if(videourl==undefined){
                        var duanziData='';
                        //段子详情页
                        if(channels==45){
                            $(".bannerzhe").hide();
                            $(".duanziBox").show();
                            duanziData+='<div class="duanziForm"><img src="'+(e["data"]["icon"]==undefined?"img/duanzi/ic_user_comment_default.png":e["data"]["icon"])+'"/><span>'+from+'</span></div>';
                            for(var i=0;i<cons.length;i++){
                                for(var j in cons[i]){
                                    if(j=="txt"){
                                        duanziData+='<div class="duanziWord">'+cons[i][j]+'</div>';
                                    }else if(j=="img"){
                                        duanziData+='<div class="duanziWord"><img src="'+cons[i][j]+'"></div>';
                                    }
                                }

                            }
                            $(".duanziDian>div>span").html(e["data"]["commendup"]);
                            $(".duanziDao>div>span").html(e["data"]["commenddown"]);
                            $(".duanzi").html(duanziData);
                            //段子详情页结束
                            //段子点赞
                            var commendData={};
                            commendData.nid=parseInt(str);
                            commendData.uid= parseInt($.cookie("uid"));
                            commendData.ntype=parseInt(1);
                            $(".duanziDian").bind("click",function(){
                                $(".duanziDao").unbind("click");
                                commendData.ctype=parseInt(0);
                                $(".duanziDian>div>img").attr("src","img/duanzi/up_select_duanzi_day@3x.png");
                                $(".duanziDian>div>span").addClass("activeSpan");
                                base.data_conn("v2/ns/news/commend",commendData,getComment,"post");

                                //console.log(commendData)
                            });
                            $(".duanziDao").bind("click",function(){
                                $(".duanziDian").unbind("click");
                                commendData.ctype=parseInt(1);
                                $(".duanziDao>div>img").attr("src","img/duanzi/down_select_duanzi_day@3x.png");
                                $(".duanziDao>div>span").addClass("activeSpan");
                                base.data_conn("v2/ns/news/commend",commendData,getComment,"post");
                            })
                        }else{
                            //图文新闻详情页
                            $('.cardbox').show();
                            $(".videoOut").hide();
                            for(var i=0;i<cons.length;i++){
                                //for(var j in cons[i]){
                                for(var k in cons[i]){
                                    if(k=="img"){
                                        $("<div class='card2'></div>").attr({"src":cons[i][k],"id":"card"+i}).css("padding","0px").appendTo(".cardbox");
                                        $("<img class='card2'>").attr("src",cons[i][k]).css("padding","0").appendTo("#card"+i);
                                    }else if(k=='txt'){
                                        $("<div class='card2'></div>").attr("id","card"+i).html(cons[i][k]).appendTo(".cardbox");
                                    }else if(k=='vid'){
                                        //console.log()
                                        var vHeights,vids;
                                        var vWidth=$('.cardbox').width()*0.94;

                                        if(cons[i][k].match('data-src')=='data-src'){
                                            vHeights=cons[i][k].substr(cons[i][k].indexOf("height=")+7,3)
                                        }else{
                                            vHeights=cons[i][k].substr(cons[i][k].indexOf("height=")+8,3);
                                            //alert(vHeights)
                                        }
                                        if(cons[i][k].indexOf("width=")>0){
                                            var vWidths=cons[i][k].substr(cons[i][k].indexOf("width=")+6,3);
                                            vids=cons[i][k].replace(new RegExp(vWidths, 'g'),vWidth).replace(new RegExp(vHeights, 'g'),Math.ceil(vWidth*vHeights/vWidths)).replace(new RegExp('preview.html','g'),'player.html');
                                            $("<div class='card2'></div>").attr("id","card"+i).html(vids).appendTo(".cardbox");
                                            $("iframe").attr('width',vWidth);console.log(vids);
                                            $("iframe").attr('height',Math.ceil(vWidth*vHeights/vWidths));
                                            //alert(1)
                                        }else{
                                            vids=cons[i][k];
                                            $("<div class='card2'></div>").attr("id","card"+i).html(vids).appendTo(".cardbox");
                                            $("iframe").attr('width',vWidth);console.log(vids);
                                        }

                                        //$("iframe").attr('width',vWidth);console.log(vids);
                                        //$("iframe").attr('height',Math.ceil(vWidth*vHeights/vWidths));
                                    }
                                }}
                            //    图文详情页结束
                        }
                    }else{
                        //视频详情页
                        $(".bannerzhe").hide();
                        $(".videoOut").show();
                        $(".zy_media").show();
                        zymedia('video',{preload:'auto',autoplay:false,success:function(){
                        }});
                        var thumbnail=e['data']['thumbnail'];
                        $('.imgPlayer').attr('poster',thumbnail).attr('src',videourl);
                        $('.videoTitle').html(title);
                        var tags=e['data']['tags'];
                        var tag='';
                        for(var i in tags){
                            tag+='<span class="tagWord">'+tags[i]+'</span>';
                        }
                        tag+=' <span class="tagClick"><span>'+e["data"]["clicktimes"]+'</span>次播放</span>';
                        $(".tags").html(tag);
                        $(".vedioDian>span").html(e["data"]["commendup"]);
                        $(".vedioDao>span").html(e["data"]["commenddown"]);
                        //视频点赞
                        var commendData={};
                        commendData.nid=parseInt(str);
                        commendData.uid= parseInt($.cookie("uid"));
                        commendData.ntype=parseInt(0);
                        $(".vedioDian").bind("click",function(){
                            $(".vedioDao").unbind("click");
                            commendData.ctype=parseInt(0);
                            $(".vedioDian>img").attr("src","img/duanzi/up_select_duanzi_day@3x.png");
                            $(".vedioDian>span").addClass("activeSpan");
                            base.data_conn("v2/ns/news/commend",commendData,getComment,"post");
                        });
                        $(".vedioDao").bind("click",function(){
                            $(".vedioDian").unbind("click");
                            commendData.ctype=parseInt(1);
                            $(".vedioDao>img").attr("src","img/duanzi/down_select_duanzi_day@3x.png");
                            $(".vedioDao>span").addClass("activeSpan");
                            base.data_conn("v2/ns/news/commend",commendData,getComment,"post");
                        });
                    //    视频详情页结束
                    }
                    //获取评论
                    if(commentSize){
                        $.ajax({
                            url:"http://bdp.deeporiginalx.com/v2/ns/coms/h?did="+del_html_tags(base64encode(docid),"=",""),
                            type:"get",
                            cache:"false",
                            async:"false",
                            datatype:"jsonp",
                            jsonp: "callbackparam",
                            jsonpCallback:"jsonpCallback1",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            success:function(e){

                                var dt1 = getNowFormatDate();
                                var mainData='';
                                var data=e['data'];
                                var code=e['code'];
                                if(code=='2000'){
                                    $(".elte-commentbox").css("display","block");
                                }else{
                                    $(".elte-commentbox").css("display","none");
                                    //$(".xiangguanVideo").css("margin",'7px auto 0 auto');
                                };
                                for(var i in data){
                                    if(i<3){
                                        var profile=data[i]['avatar'];
                                        var content=data[i]['content'];
                                        var creatTime=data[i]['ctime'];
                                        var nickname=data[i]['uname'];
                                        var commend=data[i]['commend'];
                                        mainData+="<div class='comment clearfix'><div class='comment-img'> <img src="+(profile==undefined?img/touxiangNews.png:profile)+"> </div>";
                                        mainData+='<div class="comment-info"><div class="user-info clearfix">';
                                        mainData+='<div class="floatL"><div class="user-name">'+nickname+'</div><div class="user-time">'+timeDifference(dt1,creatTime)+'</div></div>';
                                        mainData+='<div class="floatR"><span>'+commend+'</span><img src="img/duanzi/up_normal_duanzi_day@3x.png" alt=""/></div></div>';
                                        mainData+='<div class="comment-text">'+content+'</div></div></div>';
                                    }

                                }
                                $(".comments").append(mainData);
                            }
                        });
                        //$(".comments").on("click",".floatR",function(){
                        //    $(this).find("img").attr("src","img/duanzi/up_select_duanzi_day@3x.png")
                        //})
                    }else{
                        $(".elte-commentbox").css("display","none");
                        $(".xiangguanVideo").css("margin",'15px auto 0 auto');
                    }

                }
            });
            //获取相关观点接口
            $.ajax({
                url:"http://bdp.deeporiginalx.com/v2/ns/asc?nid="+str,
                type:"get",
                cache:"false",
                async:"false",
                datatype:"jsonp",
                jsonp: "callbackparam",
                jsonpCallback:"jsonpCallback1",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success:function(data){
                    if(data.code==2000){
                        $('.xiangguanVideo').css('display','block');
                        backdata = data;
                    //equiptype = "IOS";
                    getRelate (backdata,beginNum,endNum,equiptype);
                    $("img").load(function(){
                        setTimeout(function () {
                            //myScroll1.refresh();
                        }, 100);
                    })
                    }
                    
                }
                // error: function () {
                //     alert("数据请求失败");
                // }
            });

    }

    $(".closeB img").click(function(){$(".zhezhao").css("display","none")});
    $(".close").click(function(){$(".footer").css("display","none");});
    //微信浏览器判断
    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }
    //适配对应下载链接
    if(isAndroid){if(qq){$("#download").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk");$("#footertu").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk")}else{$("#download").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk");$("#footertu").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk")};}else if(isiOS||webApp){$("#download").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");$("#footertu").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$("#download").attr("href","http://deeporiginalx.com/");$("#footertu").attr("href","http://deeporiginalx.com/");}
    if(isAndroid){if(qq){$(".down a").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk");}else{$(".down a").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk");};}else if(isiOS||webApp){$(".down a").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$(".down a").attr("href","http://deeporiginalx.com/");}
    $(".swiper-container").css("height",$(window).height());
    //微信提示判断
    if(isWeiXin()){
        $("#download").click(function(){
            $(".yingdao").css("display","block");
            $(this).attr("href","javascript:;");
        });
        $("#footertu").click(function(){
            $(".yingdao").css("display","block");
            $(this).attr("href","javascript:;");
        });
        $(".down a").click(function(){
            $(".yingdao").css("display","block");
            $(this).attr("href","javascript:;");
        })

    }
    //获取相关观点方法
    function getRelate (data,begin,end,type) {
        var relates = data.relate,relateO = {},relateDiv = "";
        var newstime = "";
        var flag = 1;
        var i = begin;
        var daterule=/\d{4}-\d{1,2}-\d{1,2} \d{2}:\d{2}:\d{2}/;
        if(type=="IOS"){
            relates = data.data.searchItems;
        }else{
            relates=data.data;console.log(relates);
        }
        if(relates&&relates.length>0){
            if(end>relates.length){
                end = relates.length;
            }
            if(begin>end){
                $(".loadMord").css("display","none");
                return "";
            }
            do{
                relateO = relates[i-1];
                if(!relateO){break}
                newstime = (type=='IOS'?relateO.updateTime:relateO.ptime);
                var title=relateO.title;
                if(daterule.test(newstime)){
                    var timeArry = newstime.split("-");
                    var time_mouth = timeArry[1];
                    //var time_year=timeArry[0];
                    var time_day = timeArry[2].split(" ")[0];
                    if(time_mouth.length==1){time_mouth = "0" + time_mouth}
                    if(time_day.length==1){time_day = "0" + time_day}
                    flag++;
                    relateDiv+='<div class="videoCard"><a href="'+relateO.url+'">';
                    if(relateO.rtype!=6){
                        if(relateO.img&&relateO.img!=""){
                            relateDiv+='<div class="videoWord"><div class="wordDes">'+title+'</div>';
                            relateDiv+='<div class="videoFrom">'+relateO.pname+'</div></div><div class="videoPlay"><img src="'+relateO.img+'"></div>';
                        }else {
                            relateDiv+='<div class="videoWordnoimg"><div class="wordDes">'+title+'</div><div class="videoFrom">'+relateO.pname+'</div></div>';
                        }
                        relateDiv+='</a></div>';
                    }else{
                        var time=relateO.duration;
                        if(time<60){
                            time="00:"+((time%60)<10?'0'+(time%60):(time%60));
                        }else{
                            time=(parseInt(time/60)<10?'0'+parseInt(time/60):parseInt(time/60))+":"+((time%60)<10?'0'+(time%60):(time%60));
                        }
                        relateDiv+='<div class="videoWord"><div class="videoDes">'+title+'</div>';
                        relateDiv+='<div class="videoFrom">'+relateO.pname+'</div></div><div class="videoPlay">';
                        relateDiv+='<img src="'+relateO.img+'" alt=""/><div class="bgPlay"><div class="time">'+time+'</div>';
                        relateDiv+='<div class="video_playSmall"></div></div></div></a></div>';
                    }

                    $(".related-idea").show();
                    $(".loadMord").show();

                }
                i++;
            }while(flag<=5);
            //alert(1);
            $(".videoCardbox").append(relateDiv);
            $('.videoPlay').css('height',($('.videoPlay').width())/1.5);
            //relateDiv.appendTo()
            //$(".info-line").css("height",(end-1)*69);
            //myScroll1.refresh();
        }else{
            $(".related-idea").hide();
            $(".loadMord").hide();
        }
    }
    setTimeout(scrollTo,0,0,0);
//    获取点赞，倒赞方法
    function getComment(e){
        console.log(e)
        //var commenddatas;
        if(e.code==2000){
            var commenddatas= e.data;
        }
        $(".activeSpan").html(commenddatas);

    }


})
