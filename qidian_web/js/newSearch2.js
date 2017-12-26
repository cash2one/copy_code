$(function(){
    var explorer =navigator.userAgent ;
    var sw,total,totals,searchItems;
    var url=location.hash;
    var mm=new Object();
    if(url!=''){
        var hash=url;
        var hashs=hash.split("=");
        mm[hashs[0]]=hashs[1];
        sw = mm["#sw"];
        $(".sInput").val(sw);
        $(".searchInput").val(sw);
        if(explorer.indexOf("Safari") >= 0){
            //alert(2)
            var hash=decodeURIComponent(url);
            var hashs=hash.split("=");
            mm[hashs[0]]=hashs[1];
            sw=mm['#sw'];
            $(".sInput").val(sw);
            $(".searchInput").val(sw);
            //$(".sInput").val(encodeURIComponent(decodeURIComponent(sw)));
        }
        getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s',true,{"keywords":sw,"p":1});
    }
    $(".sButton").click(function(){
        $('.mainBox').remove();
        sw=$('.sInput').val();
        $("#test").css("display","block");
        $(".wait").css("display","block");
        getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s',true,{"keywords":sw,"p":1});
    });
        $(document).bind('keydown',function(event){
            if(event.keyCode == "13"){
                event.preventDefault();
                $('.mainBox').remove();
                if($(window).width()>992){
                    $(".sButton").click();
                    //alert(sw);
                    $('.searchInput').val(sw);
                    $(".errorBox").css("display","none");
                    $(".wait1").css("display","none");
                    $("#test").css("display","block");
                    $(".wait").css("display","block");
                }else{
                    sw=$('.searchInput').val();
                    $('.sInput').val(sw);
                    $('.phoneErroricon').css("display","none");
                    $(".phoneErrorword").css("display","none");
                    $(".phoneTest").css("display","block");
                    $(".phoneWait").css("display","block");
                }
                if (explorer.indexOf("MSIE") >= 0) {
                    window.location.hash="sw="+sw;
                }
//firefox
                else if (explorer.indexOf("Firefox") >= 0) {
                    window.location.hash="sw="+sw;
                }
//Chrome
                else if(explorer.indexOf("Chrome") >= 0){
                    window.location.hash="sw="+sw;
                }
//Opera
                else if(explorer.indexOf("Opera") >= 0){
                    window.location.hash="sw="+sw;
                }
//Safari
                else if(explorer.indexOf("Safari") >= 0){
                    window.location.hash="sw="+encodeURIComponent(decodeURIComponent(sw));
                }
//Netscape
                else if(explorer.indexOf("Netscape")>= 0) {
                    window.location.hash="sw="+sw;
                }
                getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s',true,{"keywords":sw,"p":1});
            }
        });

//    判断url是否为空
    if($(window).width()>992){
        $(".sInput").focus();
        $(".mainBox").css("border","1px solid #cfcfcf");
        //$(".mainBox").css("border","0px solid #cfcfcf");
    }else{
        $(".searchInput").focus();
        $(".searchClose").click(function(){
            $('.searchInput').val("");
        });
        $("#back").click(function(){
            window.location="indexP.html";
        });

        $('.mainBox').css({'border':'0px','box-shadow':'0 0 0 0','border-radius':'0'});

    }
//    样式适配
//    alert(sw)
    //if(sw!=undefined){

    //}

    function getAjax(url,isPage,datas){
        $.ajax({
            url:url,
            type:'get',
            dataType:'json',
            async:'true',
            data:datas,
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
                            var imgLists=data[i].imgs;
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
                                for(var j=0;j<style;j++){
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
                            totalPages: totals,
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
                                getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s',false,{"keywords":sw,"p":page});
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
                                getAjax('http://bdp.deeporiginalx.com/v2/ns/es/s',false,{"keywords":sw,"p":page});
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
                //searchItems?getMore(searchItems):'';
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
});