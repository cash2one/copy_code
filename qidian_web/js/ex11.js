$(function() {
    var is=0;
    var backdata = {};//请求返回结果
    var beginNum = 1;// 开始条数
    var endNum = 3;// 结束条数
    var equiptype = "";//设备类型
    var myScroll1,bb, y,num;
    if (myScroll1 == undefined || myScroll1 == '') {
        myScroll1 = new IScroll('#wrapper1', {
            scrollbars: true,
            probeType:3,//probeType属性，表明此插件，可以监听scroll事件
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            preventDefault: false
        });
        var myScroll,
            upIcon = $("#up-icon"),
            downIcon = $("#down-icon");

        myScroll1.on("scroll", function () {
            //scroll事件，可以用来控制上拉和下拉之后显示的模块中，
            //样式和内容展示的部分的改变。
            y = this.y,
                maxY = this.maxScrollY - y,
                downHasClass = downIcon.hasClass("reverse_icon"),
                upHasClass = upIcon.hasClass("reverse_icon");
            if (y >= 40) {
                !downHasClass && downIcon.addClass("reverse_icon");
                return "";
            } else if (y < 40 && y > -10) {
                downHasClass && downIcon.removeClass("reverse_icon");
                return "";
            }

            if (maxY >= 40) {
                !upHasClass && upIcon.addClass("reverse_icon");
                return "";
            } else if (maxY < 40 && maxY >= 0) {
                upHasClass && upIcon.removeClass("reverse_icon");
                return "";
            }
        });
        myScroll1.on("scrollEnd", function () {
            if (this.maxScrollY - this.y == 0) {
                beginNum += 3;
                endNum += 3;
                getRelate (backdata,beginNum,endNum,equiptype);
                upIcon.removeClass("reverse_icon");
            }
        });
    } else {
        setTimeout(function () {
            myScroll1.refresh();
        }, 100);
    }
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
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
        console.log(url);
        if(url.match('id=')=='id='){
            num=url.substr(url.indexOf("id=")+2,5);
        }else{
            num="";
        }

        //url = "http://deeporiginalx.com/news.html?type=1&newsid=3774fcbf55929622d58e5336c51e67ad&collection=NewsItem";
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
    }else if(url.match('url')=='url'){
        var str=Request['url']+num;
        var mm=Request['id'];console.log(str);
        console.log(num);
    }else if(url.match('nid')=='nid'){
        var str=Request['nid'];
    }
    var type=Request['type'];
    if(type==1){
        var datas={"utype":2,"platform":3,"province":"北京市","city":"北京市","district":"东城区"}
        $.ajax({
            url:'http://bdp.deeporiginalx.com/v2/au/sin/g',
            type:'post',
            datatype:"json",
            data:JSON.stringify (datas),
            contentType:'application/json',
            success:function(e){
                function getContentType(url, callback) {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if( xhr.readyState === 4 && xhr.status === 200 ) {
                            callback( xhr.getAllResponseHeaders());
                        }
                    }
                    xhr.open("HEAD", url, true);
                    xhr.send();
                }
                getContentType("http://localhost:8989/public/news.html?type=0&nid=6575&interface", function(type) {
                    console.log(type)
                });
            }
        })
        if(url.match('newsid')=='newsid'){
            $.ajax({
                url: "http://121.40.34.56/news/baijia/fetchDetail",
                type: "post",
                async:false,
                data:{"newsid":str,"collection":collection},
                datatype:"json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data) {
                    var cons=data['content'];
                    var time=data['updateTime'];
                    var point=data['point'];
                    var abs=data['abs'];
                    $(".date").html(time);
                    //if(abs==''){
                    //    $(".bannertime").css("margin-bottom","3%");
                    //}else{
                    //    $("<div class='card1'></div>").html(abs).appendTo(".cardbox");
                    //}
                    var img=data['imgUrl'];
                    //if(img==null||""){
                    //    $("#bannerImg").attr("src","img/guanggao.png")
                    //}else{
                    //    $("#bannerImg").attr("src",img);
                    //}
                    var title=data['title'];
                    $("meta[name='description']").attr("content",title);
                    var form=data['sourceSiteName'];
                    $(".bannertitle").html(title);
                    $(".time").html(form);
                    var arr = uniqeByKeys(point,['paragraphIndex']);
                    for(var i=0;i<cons.length;i++){
                        for(var j in cons[i]){
                            if(j=="img"){
                                $("<div class='card2'></div>").attr("id","card"+i).css("padding","0px").appendTo(".cardbox");
                                $("<img class='card2'>").attr("src",cons[i][j]).css("padding","0").appendTo("#card"+i);
                            }else if(j=="txt"){
                                $("<div class='card2'></div>").attr("id","card"+j).html(cons[i][j]).appendTo(".cardbox");
                            }
                        }}
                    backdata = data;
                    getRelate (backdata,beginNum,endNum);
                    $("img").load(function(){
                        setTimeout(function () {
                            myScroll1.refresh();
                        }, 100);
                    });
                },
                error: function () {
                    alert("失败");
                }
            });
        }else if(url.match('url')=='url'){
            $.ajax({
                url: "http://api.deeporiginalx.com/news/baijia/newsFetchContent",
                type: "post",
                async:false,
                data:{"url":str},
                datatype:"json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data) {
                    console.log(data);
                    var cons=data['content'];
                    var time=data['updateTime'];
                    var point=data['point'];
                    var abs=data['abs'];
                    $(".date").html(time);
                    if(abs==''){
                        $(".bannertime").css("margin-bottom","3%");
                    }else{
                        $("<div class='card1'></div>").html(abs).appendTo(".cardbox");
                    }

                    var img=data['imgUrl'];
                    if(img==null||""){

                        $("#bannerImg").attr("src","img/guanggao.png")
                    }else{
                        $("#bannerImg").attr("src",img);
                    }
                    var title=data['title'];
                    $("meta[name='description']").attr("content",title);
                    $(".bannertitle").html(title);
                    var arr = uniqeByKeys(point,['paragraphIndex']);console.log(arr);alert(1)
                    for(var i=0;i<cons.length;i++){
                        for(var j in cons[i]){
                            for(var k in cons[i][j]){
                                if(k=="img"){
                                    $("<div class='card2'></div>").attr({"src":cons[i][j][k],"id":"card"+j}).css("padding","0px").appendTo(".cardbox");
                                    $("<img class='card2'>").attr("src",cons[i][j][k]).css("padding","0").appendTo("#card"+j);
                                }else if(k=="txt"){
                                    $("<div class='card2'></div>").attr("id","card"+j).html(cons[i][j][k]).appendTo(".cardbox");
                                }
                            }

                        }}

                    $("img").load(function(){
                        setTimeout(function () {
                            myScroll1.refresh();
                        }, 100);
                    })
                },
                error: function () {alert("失败");}})
        }
    }else if(type==0){
        //安卓get
        var datas={"utype":2,"platform":3,"province":"北京市","city":"北京市","district":"东城区"};
        $.ajaxSetup({
            async: false
        });
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
                console.log(e);
                var cons=e['data']['content'];
                var time=e['data']['ptime'];
                var from=e['data']['pname'];
                var title=e['data']['title'];
                var docid=e['data']['docid'];console.log(del_html_tags(base64encode(docid),"=",""));
                var commentSize=e['data']['comment'];

                $("<div id='docid' style='display: none'></div>").html(del_html_tags(base64encode(docid),"=","")).appendTo("body");
                $("meta[name='description']").attr("content",title);
                $(".bannertitle").html(title);
                document.title=title;
                $(".date").html(time);
                $(".time").html(from);
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
                $("img").load(function(){
                    setTimeout(function () {
                        myScroll1.refresh();
                    }, 100);
                })
                setTimeout(function () {
                    myScroll1.refresh();
                }, 100);
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
                                    //var love=data[i]['love'];
                                    mainData+="<div class='comment clearfix'><div class='comment-img'> <img src="+(profile==undefined?img/touxiangNews.png:profile)+"> </div>";
                                    mainData+='<div class="comment-info"><div class="user-info clearfix">';
                                    mainData+='<div class="floatL"><div class="user-name">'+nickname+'</div></div>';
                                    mainData+='<div class="floatR">' +timeDifference(dt1,creatTime)+'</div></div>';
                                    mainData+='<div class="comment-text">'+content+'</div></div></div>';
                                }

                            }
                            $(".comments").append(mainData);
                        }
                    })
                }else{
                    $(".elte-commentbox").css("display","none");
                    $(".xiangguanVideo").css("margin",'7px auto 0 auto');
                }

            }
        });

        $.ajax({
            url:"http://bdp.deeporiginalx.com/v2/ns/asc?nid="+str,//del_html_tags(base64encode(str),"=",""),
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
                            myScroll1.refresh();
                        }, 100);
                    })
                }

            }
            // error: function () {
            //     alert("数据请求失败");
            // }
        });

    }

    $(".closeB img").click(function(){$(".zhezhao").css("display","none")})
    $(".close").click(function(){$(".footer").css("display","none");})
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
    if(isAndroid){if(qq){$("#download").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk");$("#footertu").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk")}else{$("#download").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk");$("#footertu").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk")};}else if(isiOS||webApp){$("#download").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");$("#footertu").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$("#download").attr("href","http://deeporiginalx.com/");$("#footertu").attr("href","http://deeporiginalx.com/");}
    if(isAndroid){if(qq){$(".down a").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk");}else{$(".down a").attr("href","https://qidianapkstatic.oss-cn-beijing.aliyuncs.com/qidian_official_v3.6.3_20170303.apk");};}else if(isiOS||webApp){$(".down a").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$(".down a").attr("href","http://deeporiginalx.com/");}
    $(".swiper-container").css("height",$(window).height());
    //获取相关观点
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
                    if(!("duration" in relateO)){
                        relateDiv+='<div class="videoCard"><a href="'+relateO.url+'">';
                    }else{
                        relateDiv+='<div class="videoCard"><a href=http://deeporiginalx.com/videoShare/index.html?nid='+relateO.nid+'>';
                    }
                    if(relateO.img&&relateO.img!=""){
                        relateDiv+='<div class="videoWord"><div class="videoDes">'+title+'</div>';
                        relateDiv+='<div class="videoFrom">'+relateO.pname+'</div></div><div class="videoPlay"><img src="'+relateO.img+'"></div>';
                    }else {
                        relateDiv+='<div class="videoWordnoimg"><div class="videoDes">'+title+'</div><div class="videoFrom">'+relateO.pname+'</div></div>';
                    }
                    relateDiv+='</a></div>';
                    $(".related-idea").show();
                    $(".loadMord").show();

                }
                i++;
            }while(flag<=3);
            //alert(1);
            $(".videoCardbox").append(relateDiv);
            $('.videoPlay').css('height',($('.videoPlay').width())/1.5);
            //relateDiv.appendTo()
            //$(".info-line").css("height",(end-1)*69);
            myScroll1.refresh();
        }else{
            $(".related-idea").hide();
            $(".loadMord").hide();
        }
    }
    setTimeout(scrollTo,0,0,0);

});
