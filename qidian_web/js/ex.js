$(function(){
    var ch=$(window).height();
    function obj2key(obj, keys){
        var n = keys.length,
            key = [];
        while(n--){
            key.push(obj[keys[n]]);
        }
        return key.join('|');
    }
//去重操作
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
    $(window).ready(function(){
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
        }
        var type=Request['type'];
        if(type==1){
            if(url.match('newsid')=='newsid'){
                $.ajax({
                    url: "http://121.40.34.56/news/baijia/fetchDetail",
                    type: "post",
                    async:false,
                    data:{"newsid":str,"collection":collection},
                    datatype:"json",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success: function (data) {console.log(data)
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
                        var form=data['sourceSiteName'];
                        $(".bannertitle").html(title);
                        $(".time").html(form);
                        var arr = uniqeByKeys(point,['paragraphIndex']);console.log(arr);
                        for(var i=0;i<cons.length;i++){
                            for(var j in cons[i]){
                                if(j=="img"){
                                    $("<div class='card2'></div>").attr("id","card"+i).css("padding","0px").appendTo(".cardbox");
                                    $("<img class='card2'>").attr("src",cons[i][j]).css("padding","0").appendTo("#card"+i);
                                }else if(j=="txt"){
                                    $("<div class='card2'></div>").attr("id","card"+j).html(cons[i][j]).appendTo(".cardbox");
                                }
                            }}
                        // for(var k=0;k<arr.length;k++) {
                        //     $("<div class='cardChild'</div>").attr("id","child"+arr[k]['paragraphIndex']).appendTo("#card"+arr[k]['paragraphIndex']);//根据id，为相应的段落添加评论
                        //     $("<div class='pinglunword'></div>").appendTo("#child"+arr[k]['paragraphIndex']);//添加评论，这里用k做测试，结果是第一段添加1，第二段添加0，1；想要结果是第一段添加1，第二段添加0，第二段不需要重复添加第一段已经加过的内容；
                        //     $("<div class='pinglunperson'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        //     $("<img src="+arr[k]['userIcon']+">").css({"background-clip":"content-box",width:"100%"}).appendTo(".pinglunperson");
                        //     $("<div class='pinglunword'></div>").html(arr[k]['srcText']).appendTo("#child"+arr[k]['paragraphIndex']);
                        //     $("<div class='pinglunshu'></div>").html(arr[k]['comments_count']).appendTo("#child"+arr[k]['paragraphIndex']);
                        //     $("<div class='pinglunmore'></div>").css("background-clip","content-box").appendTo("#child"+arr[k]['paragraphIndex']);
                        //     $(".pinglunmore").click(function(){
                        //         $(".zhezhao").css({"display":"block","height":ch});
                        //     })
                        // }
                    },
                    error: function () {alert("失败");}})
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
                        // for(var k=0;k<arr.length;k++) {
                        //     $("<div class='cardChild'</div>").attr("id","child"+arr[k]['paragraphIndex']).appendTo("#card"+arr[k]['paragraphIndex']);//根据id，为相应的段落添加评论
                        //     $("<div class='pinglunword'></div>").appendTo("#child"+arr[k]['paragraphIndex']);//添加评论，这里用k做测试，结果是第一段添加1，第二段添加0，1；想要结果是第一段添加1，第二段添加0，第二段不需要重复添加第一段已经加过的内容；
                        //     $("<div class='pinglunperson'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        //     $("<img src="+arr[k]['userIcon']+">").css({"background-clip":"content-box",width:"100%"}).appendTo(".pinglunperson");
                        //     $("<div class='pinglunword'></div>").html(arr[k]['srcText']).appendTo("#child"+arr[k]['paragraphIndex']);
                        //     $("<div class='pinglunshu'></div>").html(arr[k]['comments_count']).appendTo("#child"+arr[k]['paragraphIndex']);
                        //     $("<div class='pinglunmore'></div>").css("background-clip","content-box").appendTo("#child"+arr[k]['paragraphIndex']);
                        //     $(".pinglunmore").click(function(){
                        //         $(".zhezhao").css({"display":"block","height":ch});
                        //     })
                        // }
                    },
                    error: function () {alert("失败");}})
            }
        }else if(type==0){
            if(url.match('interface')=='interface'){
                $.ajax({
                    url:"http://api.deeporiginalx.com/bdp/news/content?url="+str,//del_html_tags(base64encode(str),"=",""),
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
                        var time=e['data']['pubTime'];
                        var from=e['data']['pubName'];
                        var title=e['data']['title'];
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
                                }else if(k=="txt"){
                                    $("<div class='card2'></div>").attr("id","card"+i).html(cons[i][k]).appendTo(".cardbox");
                                }
                                //}

                            }}
                    }
                })
            }else{
                $.ajax({
                    url:"http://api.deeporiginalx.com/news/baijia/fetchContent?url="+str,
                    type:"get",
                    cache:"false",
                    async:"false",
                    datatype:"jsonp",
                    jsonp: "callbackparam",
                    jsonpCallback:"jsonpCallback1",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success:function(e){console.log(e);console.log(str);
                        var point=e['point'];
                        var time=e['updateTime'];
                        var abs=e['originsourceSiteName'];
                        $(".date").html(time);
                        $(".time").html(abs);
                        //if(abs==''){
                        //    $(".bannertime").css("margin-bottom","3%");
                        //}else{
                        //    $("<div class='card1'></div>").html(abs).appendTo(".cardbox");
                        //}
                        var img=e['imgUrl'];
                        //if(img==null||""){
                        //    $("#bannerImg").attr("src","img/guanggao.png")
                        //}else{
                        //    $("#bannerImg").attr("src",img);
                        //}
                        var title=e['title'];
                        if(title==null||""){
                            return;
                        }else{
                            $(".bannertitle").html(title);
                            document.title=title;
                        }
                        var con=e['content'];
                        //var cons=con.split("\n",4);
                        var conn;
                        var cons;
                        if(con.indexOf("\n")>0){
                            conn=con.split("\n");
                            cons=conn.slice(0,-1);
                            for(var i=0;i<cons.length;i++){
                                $("<div class='card2'></div>").attr("id","card"+i).html(cons[i]).appendTo(".cardbox");
                            }
                        }else{
                            cons=con;
                            $("<div class='card2'></div>").html(cons).appendTo(".cardbox");
                        }
                        var arr = uniqeByKeys(point,['paragraphIndex']);
                        //for(var k=0;k<arr.length;k++) {
                        //    $("<div class='cardChild'</div>").attr("id","child"+arr[k]['paragraphIndex']).appendTo("#card"+arr[k]['paragraphIndex']);
                        //    $("<div class='pinglunword'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        //    $("<div class='pinglunperson'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        //    $("<img src="+arr[k]['userIcon']+">").css({"background-clip":"content-box",width:"100%"}).appendTo(".pinglunperson");
                        //    $("<div class='pinglunword'></div>").html(arr[k]['srcText']).appendTo("#child"+arr[k]['paragraphIndex']);
                        //    $("<div class='pinglunshu'></div>").html(arr[k]['comments_count']).appendTo("#child"+arr[k]['paragraphIndex']);
                        //    $("<div class='pinglunmore'></div>").appendTo("#child"+arr[k]['paragraphIndex']);
                        //    $("<img src='img/pingluntu.png' class='pinglundown'>").css("width","100%").appendTo(".pinglunmore");
                        //    $(".pinglunmore").click(function(){
                        //        $(".zhezhao").css({"display":"block","height":ch});
                        //    })
                        //}
                    }
                })
            }

        }
    })
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
    if(isAndroid){if(qq){$("#download").attr("href","http://koudaiv.com/static/file/app-official.apk");$("#footertu").attr("href","http://koudaiv.com/static/file/app-official.apk")}else{$("#download").attr("href","http://koudaiv.com/static/file/app-official.apk");$("#footertu").attr("href","http://koudaiv.com/static/file/app-official.apk")};}else if(isiOS||webApp){$("#download").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");$("#footertu").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$("#download").attr("href","http://deeporiginalx.com/");$("#footertu").attr("href","http://deeporiginalx.com/");}
    if(isAndroid){if(qq){$(".down a").attr("href","http://koudaiv.com/static/file/app-official.apk");}else{$(".down a").attr("href","http://koudaiv.com/static/file/app-official.apk");};}else if(isiOS||webApp){$(".down a").attr("href","https://itunes.apple.com/cn/app/tou-tiao-bai-jia/id987333155?mt=8");}else{$(".down a").attr("href","http://deeporiginalx.com/");}
    $(".swiper-container").css("height",$(window).height());
})
