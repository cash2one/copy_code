$(function(){
    var is=0;
    var backdata = {};//请求返回结果
    var beginNum = 1;// 开始条数
    var endNum = 3;// 结束条数
    var equiptype = "";//设备类型
    var myScroll1,bb, y,num;
//    if (myScroll1 == undefined || myScroll1 == '') {
//        myScroll1 = new IScroll('#wrapper1', {
//            scrollbars: true,
//            probeType:3,//probeType属性，表明此插件，可以监听scroll事件
//            mouseWheel: true,
//            interactiveScrollbars: true,
//            shrinkScrollbars: 'scale',
//            fadeScrollbars: true,
//            preventDefault: false
//        });
//        var myScroll,
//            upIcon = $("#up-icon"),
//            downIcon = $("#down-icon");
//
//        myScroll1.on("scroll", function () {
//            //scroll事件，可以用来控制上拉和下拉之后显示的模块中，
//            //样式和内容展示的部分的改变。
//            y = this.y,
//                maxY = this.maxScrollY - y,
//                downHasClass = downIcon.hasClass("reverse_icon"),
//                upHasClass = upIcon.hasClass("reverse_icon");
//            if (y >= 40) {
//                !downHasClass && downIcon.addClass("reverse_icon");
//                return "";
//            } else if (y < 40 && y > -10) {
//                downHasClass && downIcon.removeClass("reverse_icon");
//                return "";
//            }
//
//            if (maxY >= 40) {
//                !upHasClass && upIcon.addClass("reverse_icon");
//                return "";
//            } else if (maxY < 40 && maxY >= 0) {
//                upHasClass && upIcon.removeClass("reverse_icon");
//                return "";
//            }
//        });
//        myScroll1.on("scrollEnd", function () {
//            if (this.maxScrollY - this.y == 0) {
//                beginNum += 3;
//                endNum += 3;
//                getRelate (backdata,beginNum,endNum,equiptype);
//                upIcon.removeClass("reverse_icon");
////                $(".imgPlay img").load(function(){
//////                setTimeout(function () {
////                    console.log($('.imgPlay').height());
////                    myScroll1.refresh();
//////                }, 300);
////                })
//            }
//        });
//    } else {
//        setTimeout(function () {
//            myScroll1.refresh();
//        }, 100);
//    }
//    document.addEventListener('touchmove', function (e) {
//        e.preventDefault();
//    }, false);
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if(scrollTop + windowHeight == scrollHeight){
            //alert(1)
            beginNum += 3;
            endNum += 3;
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
//    api
    base.data_conn('v2/vi/con?nid='+str,'',getData,'get');
    function getData(e){
        var commentSize=e['data']['comment'];
        var title=e['data']['title'];
        var videourl=e['data']['videourl'];
        var thumbnail=e['data']['thumbnail'];
        var docid=e['data']['docid'];
        $('.imgPlayer').attr('poster',thumbnail).attr('src',videourl);
        $('.videoTitle').html(title);
        $("img").load(function(){
            setTimeout(function () {
                //myScroll1.refresh();
            }, 100);
        });
        if(commentSize){

                    base.data_conn('v2/ns/coms/h?did='+del_html_tags(base64encode(docid),"=",""),'',comment,'get');


        }else{
            $(".elte-commentbox").css("display","none");
            $(".xiangguanVideo").css("margin",'7px auto 0 auto');
        }
    }
//    comment
    function comment(e){
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
                mainData+="<div class='comment clearfix'><div class='comment-img'> <img src="+profile+"> </div>";
                mainData+='<div class="comment-info"><div class="user-info clearfix">';
                mainData+='<div class="floatL"><div class="user-name">'+nickname+'</div></div>';
                mainData+='<div class="floatR">' +timeDifference(dt1,creatTime)+'</div></div>';
                mainData+='<div class="comment-text">'+content+'</div></div></div>';
            }

        }
        $(".comments").append(mainData);
    }
//    相关观点
    base.data_conn('v2/ns/asc?nid='+str,'',getXiangguan,'get');
    function getXiangguan(data){
        if(data.code==2000){
            $('.xiangguanVideo').css('display','block');
            backdata = data;
            getRelate (backdata,beginNum,endNum,equiptype);
            $("img").load(function(){
                setTimeout(function () {
                    //myScroll1.refresh();
                }, 100);
            })
        }
    }



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
                    var nid=relateO.nid;
                    var from=relateO.pname;
                    var imgs=relateO.img;
                    var time=relateO.duration;
                    if(time<60){
                        time="00:"+((time%60)<10?'0'+(time%60):(time%60));
                    }else{
                        time=(parseInt(time/60)<10?'0'+parseInt(time/60):parseInt(time/60))+":"+((time%60)<10?'0'+(time%60):(time%60));
                    }
                    flag++;
                    relateDiv+='<div class="videoCard"><a href="index.html?nid='+nid+'">';
                    relateDiv+='<div class="videoWord"><div class="videoDes">'+title+'</div>';
                    relateDiv+='<div class="videoFrom">'+from+'</div></div><div class="videoPlay">';
                    relateDiv+='<img src="'+imgs+'" alt=""/><div class="bgPlay"><div class="time">'+time+'</div>';
                    relateDiv+='<div class="video_playSmall"></div></div></div></a></div>';
                    $(".related-idea").show();
                    $(".loadMord").show();
                }
                i++;
            }while(flag<=3);
            //alert(1);
            $(".videoCardbox").append(relateDiv);
            //relateDiv.appendTo()
            //$(".info-line").css("height",(end-1)*69);
            $('img').load(function(){
                //myScroll1.refresh();
            })

        }else{
            $(".related-idea").hide();
            $(".loadMord").hide();
        }
        $('.videoPlay').css('height',($('.videoPlay').width())/1.5);
    }
    setTimeout(scrollTo,0,0,0);

});