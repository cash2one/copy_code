$(function(){
    var explorer =navigator.userAgent ;
    var url=location.hash;
    var mm=new Object();
    if(url!='') {
        var hash=decodeURIComponent(url);
            var hashs=hash.split("=");
            mm[hashs[0]]=hashs[1];
            var sw=mm['#sw'];
        if($(window).width()>992){
            $(".sInput").val(sw);
            $(".errorBox").css("display","none");
            $("#test").css("display","block");
            $(".wait").css("display","block");
            $(".wait1").css("display","none");
            $(".buttonBox").remove();
            $(".sMainbox").remove();
            $(".sMainbox").css("border","0px solid #cfcfcf");
            $(".sMainbox li").remove();
            $.ajax({
                url:"http://fusion.deeporiginalx.com:8088/search?key="+sw,
                type:"get",
                dataType:"json",
                success:function(e){
                    $("#test").css("display","none");
                    $(".wait").css("display","none");
                    $('.phoneErroricon').css("display","none");
                    $(".phoneErrorword").css("display","none");
                    $(".sMainbox").css("border","1px solid #cfcfcf");
                    var searchItems=e["searchItems"];
                    if(searchItems==""){
                        $(".wait1").css("display","block");
                    }
                    var length=searchItems.length;
                    var p=length%20;
                    if(length%20==0){
                        p=length/20;
                    }else{
                        p=parseInt(length/20)+1
                    }
                    var ar = Array();
                    k = 0;
                    for ( var i = 0; i <p; i++) {
                        if(ar[i]){
                            ar[i]=ar[i];
                        }else{
                            ar[i]=[];
                        }
                        for ( var j = 0; j < 20; j++) {
                            if(k<searchItems.length){
                                ar[i][j] = searchItems[k];
                                k++;
                            }
                        }
                    }
                    var $a = ar;
                    for(var k=0;k<p;k++){
                        $("<ul class='sMainbox'></ul>").attr("id","sMainbox"+k).appendTo(".mainOutbox");

                        for(var i=0;i<$a[k].length;i++){
                            var title=$a[k][i]['title'];
                            var url=$a[k][i]['url'];
                            var abs=$a[k][i]['abs'];
                            var sourceSite=$a[k][i]['sourceSite'];
                            var updateTime=$a[k][i]['updateTime'];
                            var searchFrom=$a[k][i]['searchFrom'];
                            var imgs=$a[k][i]['imgUrl'];
                            if(imgs==""){
                                $("<li></li>").attr("id","s"+k+i).appendTo("#sMainbox"+k);
                                $("<a target='_blank'></a>").attr({"href":url,"id":"a"+k+i}).appendTo("#s"+k+i);
                                $("<div class='sTitle'></div>").html(title).appendTo("#a"+k+i);
                                $("<div class='sText'></div>").html(abs).appendTo("#a"+k+i);
                                $("<div class='sMore'></div>").attr("id","more"+k+i).appendTo("#a"+k+i);
                                // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#more"+k+i);
                                $("<div class='sFrom'></div>").html(sourceSite).appendTo("#more"+k+i);
                                $("<div class='sTime'></div>").html(updateTime).appendTo("#more"+k+i);
                            }else{
                                $("<li></li>").attr("id","s"+k+i).appendTo("#sMainbox"+k);
                                $("<a target='_blank'></a>").attr({"href":url,"id":"a"+k+i}).appendTo("#s"+k+i);
                                $("<div class='sTitle'></div>").html(title).appendTo("#a"+k+i);
                                $("<div class='sImgbox'></div>").attr("id","imgbox"+k+i).appendTo("#a"+k+i);
                                $("<div class='sImg'></div>").attr("id","img"+k+i).appendTo("#imgbox"+k+i);
                                $("<img src="+imgs+">").appendTo("#img"+k+i);
                                $("<div class='imgWord'>").attr("id","word"+k+i).appendTo("#imgbox"+k+i);
                                $("<div class='sText' style='margin-top:0'>").html(abs).appendTo("#word"+k+i);
                                $("<div class='sMore'></div>").attr("id","more"+k+i).appendTo("#word"+k+i);
                                // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#more"+k+i);
                                $("<div class='sFrom'></div>").html(sourceSite).appendTo("#more"+k+i);
                                $("<div class='sTime'></div>").html(updateTime).appendTo("#more"+k+i);
                            }
                        }}

                    //    页码按钮
                    //    for(var j=$(".sMainbox").length;j>0;j--){
                    //        $($(".sMainbox")[j]).css("z-Index",j);
                    //    }

                    $("<div class='buttonBox'></div>").insertAfter(".mainOutbox");
                    $(".buttonBox").css("margin-top",$("#sMainbox0").height()+50);
                    for(var i=1;i<$(".sMainbox").length+1;i++){

                        $("<div class='buttonNum'></div>").html(i).appendTo(".buttonBox");
                    }
                    $("<div class='next'></div>").html("下一页>").appendTo(".buttonBox");
                    $(".buttonNum").each(function(i,obj){
                        $(obj).click(function(){
                            for(var k=0;k<$(".sMainbox").length;k++){
                                $($(".sMainbox")[k]).css("display","none");
                                $($(".buttonNum")[k]).css("border","1px solid #ccc")
                            }
                            $(".buttonBox").css("margin-top",$("#sMainbox"+i).height()+50);
                            $(this).css("border","0px");
                            $($(".sMainbox")[i]).css("display","block");
                        })
                    })
                    var bNum=0;
                    $(".next").click(function(){
                        bNum++;
                        for(var k=0;k<$(".sMainbox").length;k++){
                            $($(".sMainbox")[k]).css("display","none");
                            $($(".buttonNum")[k]).css("border","1px solid #ccc")
                        }
                        if(bNum<$(".sMainbox").length){
                            $($(".sMainbox")[bNum]).css("display","block");
                            $($(".buttonNum")[bNum]).css("border","0px");
                            $(".buttonBox").css("margin-top",$("#sMainbox"+bNum).height()+50);
                        }else if(bNum==$(".sMainbox").length){
                            $($(".sMainbox")[0]).css("display","block");
                            $($(".buttonNum")[0]).css("border","0px");
                            $(".buttonBox").css("margin-top",$("#sMainbox0").height()+50);
                            bNum=0;
                        }

                    })
                },
                error:function(){
                    $(".errorTitle span").html($('.sInput').val());
                    $("#test").css("display","none");
                    $(".wait").css("display","none");
                    $('.errorBox').css("display","block");
                }
            })
            }else{
               $(".searchInput").val(sw); 
               $(".phoneTest").css("display","block");
                $(".phoneWait").css("display","block");
                $(".sMainbox").remove();
                $(".sMainbox").css("border", "0px solid #cfcfcf");
                $(".sMainbox li").remove();
                $.ajax({
                    url: "http://fusion.deeporiginalx.com:8088/search?key=" + sw,
                    type: "get",
                    dataType: "json",
                    success: function (e) {
                        $(".phoneTest").css("display","none");
                        $(".phoneWait").css("display","none");
                        $('.phoneErroricon').css("display","none");
                        $(".phoneErrorword").css("display","none");
                        $(".sMainbox").css("border", "1px solid #cfcfcf");
                        var searchItems = e["searchItems"];
                        $("<ul class='sMainbox'></ul>").appendTo(".mainOutbox");

                        for (var i = 0; i < searchItems.length; i++) {
                            var title = searchItems[i]['title'];
                            var url = searchItems[i]['url'];
                            var abs = searchItems[i]['abs'];
                            var sourceSite = searchItems[i]['sourceSite'];
                            var updateTime = searchItems[i]['updateTime'];
                            var searchFrom = searchItems[i]['searchFrom'];
                            var imgs = searchItems[i]['imgUrl'];
                            if (imgs == "") {
                                $("<li></li>").attr("id", "s" + i).appendTo(".sMainbox");
                                $("<a target='_blank'></a>").attr({"href": url, "id": "a" + i}).appendTo("#s" + i);
                                $("<div class='sTitle'></div>").html(title).appendTo("#a" + i);
                                $("<div class='sText'></div>").html(abs).appendTo("#a" + i);
                                $("<div class='sMore'></div>").attr("id", "more" + i).appendTo("#a" + i);
                                // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#more" + i);
                                $("<div class='sFrom'></div>").html(sourceSite).appendTo("#more" + i);
                                $("<div class='sTime'></div>").html(updateTime).appendTo("#more" + i);
                            } else {
                                $("<li></li>").attr("id", "s" + i).appendTo(".sMainbox");
                                $("<a target='_blank'></a>").attr({"href": url, "id": "a" + i}).appendTo("#s" + i);
                                $("<div class='sTitle'></div>").html(title).appendTo("#a" + i);
                                $("<div class='sImgbox'></div>").attr("id", "imgbox" + i).appendTo("#a" + i);
                                $("<div class='sImg'></div>").attr("id", "img" + i).appendTo("#imgbox" + i);
                                $("<img src=" + imgs + ">").appendTo("#img" + i);
                                $("<div class='imgWord'>").attr("id", "word" + i).appendTo("#imgbox" + i);
                                $("<div class='sText' style='margin-top:0'>").html(abs).appendTo("#word" + i);
                                $("<div class='sMore'></div>").attr("id", "more" + i).appendTo("#word" + i);
                                // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#more" + i);
                                $("<div class='sFrom'></div>").html(sourceSite).appendTo("#more" + i);
                                $("<div class='sTime'></div>").html(updateTime).appendTo("#more" + i);
                            }
                        }

                        //    页码按钮
                        //    for(var j=$(".sMainbox").length;j>0;j--){
                        //        $($(".sMainbox")[j]).css("z-Index",j);
                        //    }


                    },
                    error: function () {
                        $(".phoneTest").css("display","none");
                        $(".phoneWait").css("display","none");
                        $('.phoneErroricon').css("display","block");
                        $(".phoneErrorword").css("display","block");
                    }
                })
            }
     }
    if($(window).width()>992){
        var mm=new Object();
        $(".sInput").focus();
        $(".sButton").click(function(){
            $(".errorBox").css("display","none");
            $(".wait1").css("display","none");
            $("#test").css("display","block");
            $(".wait").css("display","block");
            $(".sMainbox").remove();
            $(".buttonBox").remove();
            $(".sMainbox").css("border","0px solid #cfcfcf");
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
            var sw=mm['#sw'];
            $.ajax({
                url:"http://fusion.deeporiginalx.com:8088/search?key="+sw,
                type:"get",
                dataType:"json",
                success:function(e){
                    $("#test").css("display","none");
                    $(".wait").css("display","none");
                    $('.phoneErroricon').css("display","none");
                    $(".phoneErrorword").css("display","none");
                    $(".sMainbox").css("border","1px solid #cfcfcf");
                    var searchItems=e["searchItems"];
                    if(searchItems==""){
                        $(".wait1").css("display","block");
                    }
                    var length=searchItems.length;
                    var p=length%20;
                    if(length%20==0){
                        p=length/20;
                    }else{
                        p=parseInt(length/20)+1
                    }
                    var ar = Array();
                    k = 0;
                    for ( var i = 0; i <p; i++) {
                        if(ar[i]){
                            ar[i]=ar[i];
                        }else{
                            ar[i]=[];
                        }
                        for ( var j = 0; j < 20; j++) {
                            if(k<searchItems.length){
                                ar[i][j] = searchItems[k];
                                k++;
                            }
                        }
                    }
                    var $a = ar;
                    for(var k=0;k<p;k++){
                        $("<ul class='sMainbox'></ul>").attr("id","sMainbox"+k).appendTo(".mainOutbox");

                        for(var i=0;i<$a[k].length;i++){
                            var title=$a[k][i]['title'];
                            var url=$a[k][i]['url'];
                            var abs=$a[k][i]['abs'];
                            var sourceSite=$a[k][i]['sourceSite'];
                            var updateTime=$a[k][i]['updateTime'];
                            var searchFrom=$a[k][i]['searchFrom'];
                            var imgs=$a[k][i]['imgUrl'];
                            if(imgs==""){
                                $("<li></li>").attr("id","s"+k+i).appendTo("#sMainbox"+k);
                                $("<a target='_blank'></a>").attr({"href":url,"id":"a"+k+i}).appendTo("#s"+k+i);
                                $("<div class='sTitle'></div>").html(title).appendTo("#a"+k+i);
                                $("<div class='sText'></div>").html(abs).appendTo("#a"+k+i);
                                $("<div class='sMore'></div>").attr("id","more"+k+i).appendTo("#a"+k+i);
                                // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#more"+k+i);
                                $("<div class='sFrom'></div>").html(sourceSite).appendTo("#more"+k+i);
                                $("<div class='sTime'></div>").html(updateTime).appendTo("#more"+k+i);
                            }else{
                                $("<li></li>").attr("id","s"+k+i).appendTo("#sMainbox"+k);
                                $("<a target='_blank'></a>").attr({"href":url,"id":"a"+k+i}).appendTo("#s"+k+i);
                                $("<div class='sTitle'></div>").html(title).appendTo("#a"+k+i);
                                $("<div class='sImgbox'></div>").attr("id","imgbox"+k+i).appendTo("#a"+k+i);
                                $("<div class='sImg'></div>").attr("id","img"+k+i).appendTo("#imgbox"+k+i);
                                $("<img src="+imgs+">").appendTo("#img"+k+i);
                                $("<div class='imgWord'>").attr("id","word"+k+i).appendTo("#imgbox"+k+i);
                                $("<div class='sText' style='margin-top:0'>").html(abs).appendTo("#word"+k+i);
                                $("<div class='sMore'></div>").attr("id","more"+k+i).appendTo("#word"+k+i);
                                // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#more"+k+i);
                                $("<div class='sFrom'></div>").html(sourceSite).appendTo("#more"+k+i);
                                $("<div class='sTime'></div>").html(updateTime).appendTo("#more"+k+i);
                            }
                        }}

                    //    页码按钮
                    //    for(var j=$(".sMainbox").length;j>0;j--){
                    //        $($(".sMainbox")[j]).css("z-Index",j);
                    //    }

                    $("<div class='buttonBox'></div>").insertAfter(".mainOutbox");
                    $(".buttonBox").css("margin-top",$("#sMainbox0").height()+50);
                    for(var i=1;i<$(".sMainbox").length+1;i++){

                        $("<div class='buttonNum'></div>").html(i).appendTo(".buttonBox");
                    }
                    $("<div class='next'></div>").html("下一页>").appendTo(".buttonBox");
                    $(".buttonNum").each(function(i,obj){
                        $(obj).click(function(){
                            for(var k=0;k<$(".sMainbox").length;k++){
                                $($(".sMainbox")[k]).css("display","none");
                                $($(".buttonNum")[k]).css("border","1px solid #ccc")
                            }
                            $(".buttonBox").css("margin-top",$("#sMainbox"+i).height()+50);
                            $(this).css("border","0px");
                            $($(".sMainbox")[i]).css("display","block");
                        })
                    })
                    var bNum=0;
                    $(".next").click(function(){
                        bNum++;
                        for(var k=0;k<$(".sMainbox").length;k++){
                            $($(".sMainbox")[k]).css("display","none");
                            $($(".buttonNum")[k]).css("border","1px solid #ccc")
                        }
                        if(bNum<$(".sMainbox").length){
                            $($(".sMainbox")[bNum]).css("display","block");
                            $($(".buttonNum")[bNum]).css("border","0px");
                            $(".buttonBox").css("margin-top",$("#sMainbox"+bNum).height()+50);
                        }else if(bNum==$(".sMainbox").length){
                            $($(".sMainbox")[0]).css("display","block");
                            $($(".buttonNum")[0]).css("border","0px");
                            $(".buttonBox").css("margin-top",$("#sMainbox0").height()+50);
                            bNum=0;
                        }

                    })
                },
                error:function(){
                    $(".errorTitle span").html($('.sInput').val());
                    $("#test").css("display","none");
                    $(".wait").css("display","none");
                    $('.errorBox').css("display","block");
                }
            })
        })
        $('.sInput').bind('keypress',function(event){
            if(event.keyCode == "13")
            {
                event.preventDefault();
                $(".sButton").click();
            }

        });

    }else{
        var mm=new Object();
        $(".searchInput").focus();
        $(".searchClose").click(function(){
            $('.searchInput').val("");
        })
        $("#back").click(function(){
            window.location="indexP.html";
        })
        $(document).bind('keydown',function(event){
            if(event.keyCode == "13") {
                event.preventDefault();
                $('.phoneErroricon').css("display","none");
                        $(".phoneErrorword").css("display","none");
                $(".phoneTest").css("display","block");
                $(".phoneWait").css("display","block");
                $(".sMainbox").remove();
                $(".sMainbox").css("border", "0px solid #cfcfcf");
                $(".sMainbox li").remove();
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
                var sw =mm['#sw'];
                $.ajax({
                    url: "http://fusion.deeporiginalx.com:8088/search?key=" + sw,
                    type: "get",
                    dataType: "json",
                    success: function (e) {
                        $(".phoneTest").css("display","none");
                        $(".phoneWait").css("display","none");
                        $('.phoneErroricon').css("display","none");
                        $(".phoneErrorword").css("display","none");
                        $(".sMainbox").css("border", "1px solid #cfcfcf");
                        var searchItems = e["searchItems"];
                        $("<ul class='sMainbox'></ul>").appendTo(".mainOutbox");

                        for (var i = 0; i < searchItems.length; i++) {
                            var title = searchItems[i]['title'];
                            var url = searchItems[i]['url'];
                            var abs = searchItems[i]['abs'];
                            var sourceSite = searchItems[i]['sourceSite'];
                            var updateTime = searchItems[i]['updateTime'];
                            var searchFrom = searchItems[i]['searchFrom'];
                            var imgs = searchItems[i]['imgUrl'];
                            if (imgs == "") {
                                $("<li></li>").attr("id", "s" + i).appendTo(".sMainbox");
                                $("<a target='_blank'></a>").attr({"href": url, "id": "a" + i}).appendTo("#s" + i);
                                $("<div class='sTitle'></div>").html(title).appendTo("#a" + i);
                                $("<div class='sText'></div>").html(abs).appendTo("#a" + i);
                                $("<div class='sMore'></div>").attr("id", "more" + i).appendTo("#a" + i);
                                // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#more" + i);
                                $("<div class='sFrom'></div>").html(sourceSite).appendTo("#more" + i);
                                $("<div class='sTime'></div>").html(updateTime).appendTo("#more" + i);
                            } else {
                                $("<li></li>").attr("id", "s" + i).appendTo(".sMainbox");
                                $("<a target='_blank'></a>").attr({"href": url, "id": "a" + i}).appendTo("#s" + i);
                                $("<div class='sTitle'></div>").html(title).appendTo("#a" + i);
                                $("<div class='sImgbox'></div>").attr("id", "imgbox" + i).appendTo("#a" + i);
                                $("<div class='sImg'></div>").attr("id", "img" + i).appendTo("#imgbox" + i);
                                $("<img src=" + imgs + ">").appendTo("#img" + i);
                                $("<div class='imgWord'>").attr("id", "word" + i).appendTo("#imgbox" + i);
                                $("<div class='sText' style='margin-top:0'>").html(abs).appendTo("#word" + i);
                                $("<div class='sMore'></div>").attr("id", "more" + i).appendTo("#word" + i);
                                // $("<div class='sWeb'></div>").html(searchFrom).appendTo("#more" + i);
                                $("<div class='sFrom'></div>").html(sourceSite).appendTo("#more" + i);
                                $("<div class='sTime'></div>").html(updateTime).appendTo("#more" + i);
                            }
                        }

                        //    页码按钮
                        //    for(var j=$(".sMainbox").length;j>0;j--){
                        //        $($(".sMainbox")[j]).css("z-Index",j);
                        //    }


                    },
                    error: function () {
                        $(".phoneTest").css("display","none");
                        $(".phoneWait").css("display","none");
                        $('.phoneErroricon').css("display","block");
                        $(".phoneErrorword").css("display","block");
                    }
                })
            }
        })

    }

})