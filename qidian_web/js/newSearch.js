$(function(){
    var explorer =navigator.userAgent ;
    var sw,total,totals,searchItems;
    var url=location.hash;
    var mm=new Object();
    if(url!=''){
        var hash=decodeURIComponent(url);
        var hashs=hash.split("=");
        mm[hashs[0]]=hashs[1];
        sw=mm['#sw'];
        if($(window).width()>992){
            $(".sInput").val(sw);
            $(".errorBox").css("display","none");
            $("#test").css("display","block");
            $(".wait").css("display","block");
            $(".wait1").css("display","none");
            //$(".buttonBox").remove();
            $(".mainBox").remove();
            //$(".sMainbox").css("border","0px solid #cfcfcf");
            //$(".sMainbox li").remove();
            getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s?keywords='+sw+'&p=1',true);
        }else{
            $(".searchInput").val(sw);
            $(".phoneTest").css("display","block");
            $(".phoneWait").css("display","block");
            $(".mainBox").remove();
            //$(".sMainbox").css("border", "0px solid #cfcfcf");
            //$(".sMainbox li").remove();
            getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s?keywords='+sw+'&p=1',true);
        }
    }
    if($(window).width()>992){ //pc search
        // var mm=new Object();
        $(".sInput").focus();
        $(".sButton").click(function(){
            $(".errorBox").css("display","none");
            $(".wait1").css("display","none");
            $("#test").css("display","block");
            $(".wait").css("display","block");
            $('.mainBox').remove();
            //$(".mainBox").remove();
            //$(".buttonBox").remove();
            //$(".buttonBox").css('display','none');
            $(".mainBox").css("border","0px solid #cfcfcf");
            $(".sMainbox li").remove();
            var val;
            if (explorer.indexOf("MSIE") >= 0) {
                val=$('.sInput').val()
            }
//firefox
            else if (explorer.indexOf("Firefox") >= 0) {
                val=$('.sInput').val()
            }
//Chrome
            else if(explorer.indexOf("Chrome") >= 0){
                val=$('.sInput').val()
            }
//Opera
            else if(explorer.indexOf("Opera") >= 0){
                val=$('.sInput').val()
            }
//Safari
            else if(explorer.indexOf("Safari") >= 0){
                val=encodeURIComponent($('.sInput').val());
            }
//Netscape
            else if(explorer.indexOf("Netscape")>= 0) {
                val=$('.sInput').val()
            }
            window.location.hash="sw="+val;
            var hash=location.hash;
            var hashs=hash.split("=");
            mm[hashs[0]]=hashs[1];
            sw=mm['#sw'];
            searchItems='';
            getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s?keywords='+sw+'&p=1',true);
        });
        $('.sInput').bind('keypress',function(event){
            if(event.keyCode == "13")
            {
                event.preventDefault();
                $(".sButton").click();
            }
        });
    }else{
        $(".searchInput").focus();
        $(".searchClose").click(function(){
            $('.searchInput').val("");
        });
        $("#back").click(function(){
            window.location="indexP.html";
        });
        $(document).bind('keydown',function(event){
            if(event.keyCode == "13") {
                $.cookie('totals',"");
                event.preventDefault();
                $('.phoneErroricon').css("display","none");
                $(".phoneErrorword").css("display","none");
                $(".phoneTest").css("display","block");
                $(".phoneWait").css("display","block");
                $('.mainBox').remove();
                //$(".sMainbox").css("border", "0px solid #cfcfcf");
                // $(".sMainbox li").remove();
                var val;
                if (explorer.indexOf("MSIE") >= 0) {
                    val=$('.searchInput').val();
                    window.location.hash="sw="+val;
                }
//firefox
                else if (explorer.indexOf("Firefox") >= 0) {
                    val=$('.searchInput').val();
                    window.location.hash="sw="+val;
                }
//Chrome
                else if(explorer.indexOf("Chrome") >= 0){
                    val=$('.searchInput').val();
                    window.location.hash="sw="+val;
                }
//Opera
                else if(explorer.indexOf("Opera") >= 0){
                    val=$('.searchInput').val();
                    window.location.hash="sw="+val;
                }
//Safari
                else if(explorer.indexOf("Safari") >= 0){
                    val=encodeURIComponent($('.searchInput').val());
                    window.location.hash="sw="+val;
                }
//Netscape
                else if(explorer.indexOf("Netscape")>= 0) {
                    val=$('.searchInput').val();
                    window.location.hash="sw="+val;
                }else{
                    window.location.hash="sw="+encodeURIComponent($('.searchInput').val());
                }
                var hash = location.hash;
                var hashs = hash.split("=");
                mm[hashs[0]] = hashs[1];
                sw =mm['#sw'];
                searchItems='';
                getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s?keywords='+sw+'&p=1',true);
                //$.ajax({
                //    url:"http://fusion.deeporiginalx.com:8088/search?key="+sw,
                //    type:"get",
                //    dataType:"json",
                //    success:function(e){
                //        searchItems=e["searchItems"];
                //    }
                //});
            }
        })
    }
    function getAjax(url,isPage){
        $.ajax({
            url:url,
            type:'get',
            dataType:'json',
            async:'true',
            success:function(e){
                if(e.code==2000){
                    $("<ul class='mainBox'></ul>").insertAfter('.mainOutbox');
                    //$("<ul class='mainBox'></ul>").insertBefore('.buttonBox');
                    $("html,body").animate({scrollTop:0},100);
                    if($(window).width()>992){
                        $("#test").css("display","none");
                        $(".wait").css("display","none");
                        $('.phoneErroricon').css("display","none");
                        $(".phoneErrorword").css("display","none");
                        $(".mainBox").css("border","1px solid #cfcfcf");
                        //$(".buttonBox").css('display','block');
                    }else{
                        $(".phoneTest").css("display","none");
                        $(".phoneWait").css("display","none");
                        $('.phoneErroricon').css("display","none");
                        $(".phoneErrorword").css("display","none");
                        //$(".buttonBox").css('display','block');
                        $('.mainBox').css({'border':'0px','box-shadow':'0 0 0 0','border-radius':'0'});
                    }
                    var data= e.data;console.log(data);
                    var newsData='';
                    total= e.total;
                    if(total%20==0){
                        totals=total/20;
                    }else{
                        totals=Math.ceil(total/20);
                    }
                    //alert(totals);
                    for(var i=0;i<data.length;i++){
                        var title=data[i].title;
                        var pubTime=data[i].ptime;
                        //timeCha=data[i],pubTime;
                        var pubName=data[i].pname;
                        var urls=data[i].purl;
                        var nid=data[i].nid;
                        var style=data[i].style;
                        //console.log(encodeURI(data[i].docid));
                        //var aUrl=del_html_tags(base64encode(urls),"=","");console.log(aUrl);
                        if(style==0){
                            $("<a class='a' target='_blank'></a>").attr({"id":"a"+i,"href":'http://deeporiginalx.com/news.html?type=0&nid='+nid}).appendTo(".mainBox");
                            $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                            $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                            $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                            $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                            $("<div class='time'></div>").html(pubTime).appendTo("#from"+i);
                        }else{
                            imgLists=data[i].imgs;
                            //alert(false)
                            if(style==1){
                                $("<a class='a' target='_blank'></a>").attr({"id":"a"+i,"href":'http://deeporiginalx.com/news.html?type=0&nid='+nid}).appendTo(".mainBox");
                                $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                                $("<div class='imgbox'></div>").attr("id","img"+i).appendTo("#li"+i);
                                $("<img src="+imgLists[0]+">").appendTo("#img"+i);
                                $("<div class='wordBox'></div>").attr("id","word"+i).appendTo("#li"+i);
                                $("<p class='titleWord'></p>").html(title).appendTo("#word"+i);
                                $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#word"+i);
                                $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                                $("<div class='time'></div>").html(pubTime).appendTo("#from"+i);
                            }else if(style>1){
                                //alert(1)
                                $("<a class='a' target='_blank'></a>").attr({"id":"a"+i,"href":'http://deeporiginalx.com/news.html?type=0&nid='+nid}).appendTo(".mainBox");
                                $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                                $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                                $("<div class='imgboxs'></div>").attr("id","tubox"+i).appendTo("#li"+i);
                                for(var j=0;j<imgLists.length;j++){
                                    //alert(imgList.length)
                                    $("<div><img src="+imgLists[j]+"></div>").appendTo("#tubox"+i);
                                }
                                $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                                $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                                $("<div class='time'></div>").html(pubTime).appendTo("#from"+i);
                            }
                        }
                    }
                    if($(window).width()>992){
                        $(".pagination").pagy({
                            currentPage: 1,
                            totalPages: $.cookie('totals'),
                            innerWindow: 2,
                            outerWindow: 0,
                            first: '',
                            prev: '上一页',
                            next: '下一页',
                            last: '',
                            gap: '..',
                            truncate: false,
                            page: function(page) {
                                $(".mainBox").remove();
                                getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s?keywords='+sw+'&p='+page,false);
                                return true;
                            }
                        });
                    }else{
                        $(".pagination").pagy({
                            currentPage: 1,
                            totalPages: totals,
                            innerWindow: 0,
                            outerWindow: 1,
                            first: '',
                            prev: '<',
                            next: '>',
                            last: '',
                            gap: '..',
                            truncate: false,
                            page: function(page) {
                                $(".mainBox").remove();
                                getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s?keywords='+sw+'&p='+page,false);
                                return true;
                            }
                        });
                    }
                    if(isPage){
                        $(".pagination").pagy("page",1,totals);
                    }
                    //$(".buttonBox").css('display','block!important');
                    $('img').load(function(){
                        if($(window).width()>992){
                            $(".buttonBox").css('margin',$('.mainBox').height()+60+'px auto 50px auto')
                        }else{
                            $(".buttonBox").css('margin',$('.mainBox').height()+30+'px auto 50px auto')
                        }
                    })
                }else{
                    if($(window).width() > 992){
                        $(".errorTitle span").html($('.sInput').val());
                        $("#test").css("display","none");
                        $(".wait").css("display","none");
                        $('.errorBox').css("display","block");
                        $(".buttonBox").css('display','none');
                    }else{
                        $(".phoneTest").css("display","none");
                        $(".phoneWait").css("display","none");
                        $('.phoneErroricon').css("display","block");
                        $(".phoneErrorword").css("display","block");
                        $(".buttonBox").css('display','none');
                    }
                }
                searchItems?getMore(searchItems):'';
            },
            error:function(){
                $(".errorTitle span").html(sw);
                $("#test").css("display","none");
                $(".wait").css("display","none");
                $(".phoneWait").css("display", "none");
                $('.errorBox').css("display","block");
                $(".buttonBox").css('display','none');
            }
        })
    }
    function getMore(searchItems) {
        var pages=$('.active a').html();
        if (searchItems != undefined) {
            var length = searchItems.length;
            var p = length % 3;
            if (length % 3 == 0) {
                p = length / 3;
            } else {
                p = parseInt(length / 3) + 1
            }
            var ar = Array();
            k = 0;
            for (var i = 0; i < p; i++) {
                if (ar[i]) {
                    ar[i] = ar[i];
                } else {
                    ar[i] = [];
                }
                for (var j = 0; j < 3; j++) {
                    if (k < searchItems.length) {
                        ar[i][j] = searchItems[k];
                        k++;
                    }
                }
            }
            var $a = ar;
            if (pages <= $a.length) {
                for (var i = 0; i < $a[pages - 1].length; i++) {
                    // var getId = Math.floor(Math.random() * 20);
                    var title = $a[pages - 1][i]['title'];
                    var url = $a[pages - 1][i]['url'];
                    var abs = $a[pages - 1][i]['abs'];
                    var sourceSite = $a[pages - 1][i]['sourceSite'];
                    var updateTime = $a[pages - 1][i]['updateTime'];
                    var searchFrom = $a[pages - 1][i]['searchFrom'];
                    var imgs = $a[pages - 1][i]['imgUrl'];
                    if (imgs == "") {
                        $("<li></li>").attr("id", "s" + i).insertBefore("#a" + 0);
                        $("<a target='_blank'></a>").attr({"href": url, "id": "ad" + i}).appendTo("#s" + i);
                        $("<div class='sTitle'></div>").css('color','#0091fa').html(title).appendTo("#ad" + i);
                        $("<div class='sText'></div>").html(abs).appendTo("#ad" + i);
                        $("<div class='sMore'></div>").attr("id", "mored" + i).appendTo("#ad" + i);
                        // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#mored" + i);
                        $("<div class='sFrom'></div>").html(sourceSite).appendTo("#mored" + i);
                        $("<div class='sTime'></div>").html(updateTime).appendTo("#mored" + i);
                    } else {
                        $("<li></li>").attr("id", "s" + i).insertBefore("#a" + 0);
                        $("<a target='_blank'></a>").attr({"href": url, "id": "ad" + i}).appendTo("#s" + i);
                        $("<div class='sTitle'></div>").css('color','#0091fa').html(title).appendTo("#ad" + i);
                        $("<div class='sImgbox'></div>").attr("id", "imgboxd" + i).appendTo("#ad" + i);
                        $("<div class='sImg'></div>").attr("id", "imgd" + i).appendTo("#imgboxd" + i);
                        $("<img src=" + imgs + ">").appendTo("#imgd" + i);
                        $("<div class='imgWord'>").attr("id", "wordd" + i).appendTo("#imgboxd" + i);
                        $("<div class='sText' style='margin-top:0'>").html(abs).appendTo("#wordd" + i);
                        $("<div class='sMore'></div>").attr("id", "mored" + i).appendTo("#wordd" + i);
                        // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#mored" + i);
                        $("<div class='sFrom'></div>").html(sourceSite).appendTo("#mored" + i);
                        $("<div class='sTime'></div>").html(updateTime).appendTo("#mored" + i);
                    }
                }
                if($(window).width()>992){
                    $(".buttonBox").css('margin', $('.mainBox').height() + 60 + 'px auto 50px auto');
                }else{
                    $(".buttonBox").css('margin', $('.mainBox').height() + 30 + 'px auto 50px auto');
                }
            } else {
                return;
            }
        }
    }
})