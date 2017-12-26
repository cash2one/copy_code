//(function(){
//    var script = document.createElement("script");
//    script.async = true;
//    script.src = "http://deeporiginalx.com/news-share/js/sdk.js";
//    var header = document.getElementsByTagName("head")[0];
//    header && header.insertBefore(script,header.firstChild);
//    script.onload = function(){
//        new List({
//            keyword:"端午节", // 新闻关键词
//            containerID:"news-content" ,//列表容器ID
//            count:3 	// 新闻显示条数
//        })
//    }
//})();
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null)
        return unescape(r[2]);
    return null;
}
function dates2(){
    $('.channel').click(function(){
        getData($(this));
        history.pushState({
            "id":$(this).attr('id')
        }, "", "indexQidian.html?to="+$(this).attr('id'));
    })


    //var url=location.search;
    //var urlNum=url.split('=');alert(urlNum['?to']);
    var num=getUrlParam('to');
    if(num==undefined){
        //alert(1);
        getData($('.border'));
    }else{
        $('#border').removeClass('border');
        $('#'+num).addClass('border');
        getData($('#'+num));
    }



        function getData(obj){
        $(".channel").removeClass("border");
        $(obj).addClass("border");
        var val=$(obj).find("a").html();
        var ids=$(obj).attr("id");
        var title,pubTime,pubName,urls,nowTime,imgLists,timeCha,nid,Authorizations,urlA,style,dataDiv='';
        nowTime=getNowFormatDate();console.log(nowTime);
    var datas={"utype":2,"platform":3,"province":"北京市","city":"北京市","district":"东城区"};
     //$.ajaxSetup({
     //       async: false
     //   });
            if($.cookie('uid')==null){
                $.ajax({
                    url:'http://bdp.deeporiginalx.com/v2/au/sin/g?token=1',
                    type:'post',
                    datatype:"json",
                    data:JSON.stringify (datas),
                    async: false,
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
                                async: false,
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
                url:'http://bdp.deeporiginalx.com/v2/ns/fed/ln?cid='+ids+"&tcr="+transdate(nowTime)+'&tmk=0&t=0'+'&uid='+ $.cookie('uid'),
                //url:'http://192.168.199.196:8080/json/test.json',
                type:'get',
                dataType:'json',
                beforeSend:function(request){
                    request.setRequestHeader("Authorization", $.cookie('Authorizations'));
                },
                success:function(e){
                    console.log(e);
                    $(".loadMord").css("display","block");
                            $(".load").css("display","none");
                            $("#scroller-pullUp").css("display","block");
                            //$(".mainBox").html("");
                            var data=e['data'];
                            $("<span class='first'></span>").css("display","none").html(data[0].ptime).appendTo("body");
                            $("<span class='last'></span>").css("display","none").html(data[data.length-1].ptime).appendTo("body");
                            for(var i=0;i<data.length;i++){
                                title=data[i].title;
                                pubTime=data[i].ptime;
                                timeCha=timeDifference(nowTime,pubTime);
                                pubName=data[i].pname;
                                var rtype=data[i].rtype;
                                nid=data[i].nid;
                                style=data[i].style;
                                var icon=data[i].icon;
                                //console.log(encodeURI(data[i].docid));
                                //var aUrl=del_html_tags(base64encode(urls),"=","");console.log(aUrl);
                                if(rtype==6){
                                    var thumbnail=data[i].thumbnail;
                                    var time=data[i].duration;
                                    if(time<60){
                                        time="00:"+((time%60)<10?'0'+(time%60):(time%60));
                                    }else{
                                        time=(parseInt(time/60)<10?'0'+parseInt(time/60):parseInt(time/60))+":"+((time%60)<10?'0'+(time%60):(time%60));
                                    }
                                    dataDiv+='<div class="videoCard"><a href="news.html?nid='+nid+'"><div class="videoWord">';
                                    dataDiv+='<div class="videoDes">'+title+'</div><div class="videoFrom">'+pubName+'</div></div>';
                                    dataDiv+='<div class="videoPlay"><img src="'+thumbnail+'" alt="">';
                                    dataDiv+='<div class="bgPlay"><div class="time">'+time+'</div><div class="video_playSmall">';
                                    dataDiv+='</div></div></div></a></div>';
                                }else if(rtype==8){
                                    dataDiv+='<a href="news.html?type=0&nid='+nid+'" target="_blank"><li>';
                                    dataDiv+='<div class="duanziIcon"><img src="'+(icon==undefined?"img/duanzi/ic_user_comment_default.png":icon)+'" alt=""/><span>'+pubName+'</span></div>';
                                    dataDiv+='<div class="duanziWord">'+title+'</div>';
                                    dataDiv+='<div class="duanziZan"><div class="dian"><img src="img/duanzi/up_normal_duanzi_day@3x.png" alt=""/><span>'+data[i].concern+'</span></div>';
                                    dataDiv+='<div class="dao"><img src="img/duanzi/down_normal_duanzi_day@3x.png" alt=""/><span>'+data[i].un_concern+'</span></div>';
                                    dataDiv+='<div class="comment"><img src="img/duanzi/comment_duanzi_day.png" alt=""/><span>'+data[i].comment+'</span></div></div>';
                                    dataDiv+='</li></a>';
                                }else{
                                    if(style==0){
                                        dataDiv+='<a href="news.html?type=0&nid='+nid+'" target="_blank"><li>';
                                        dataDiv+='<p class="titleWord">'+title+'</p>';
                                        dataDiv+='<div class="fromBox"><div class="from">'+pubName+'</div><div class="time">'+timeCha+'</div></div></li></a>';
                                    }else{
                                        imgLists=data[i].imgs;
                                        //alert(false)
                                        if(style!=0&&style!=3){
                                            dataDiv+='<a href="news.html?type=0&nid='+nid+'" target="_blank"><li>';
                                            dataDiv+='<div class="imgbox"><img src="'+imgLists[0]+'"></div>';
                                            dataDiv+='<div class="wordBox"><p class="titleWord">'+title+'</p>';
                                            dataDiv+='<div class="fromBox"><div class="from">'+pubName+'</div><div class="time">'+timeCha+'</div></div></div></li></a>';
                                        }else if(style==3){

                                            dataDiv+='<a href="news.html?type=0&nid='+nid+'" target="_blank"><li>';
                                            dataDiv+='<p class="titleWord">'+title+'</p><div class="imgboxs">';
                                            for(var j=0;j<imgLists.length;j++){
                                                dataDiv+='<div><img src="'+imgLists[j]+'"></div> ';
                                            }
                                            dataDiv+='</div><div class="fromBox"><div class="from">'+pubName+'</div><div class="time">'+timeCha+'</div></div></li></a>';
                                        }
                                    }
                                }
                            }
                    $('.mainBox').html(dataDiv);
                    $('.videoPlay').css('height',($('.videoPlay').width())/1.5);
                            $("img").load(function(){
                                setTimeout(function () {
                                    myScroll1.refresh();
                                }, 100);
                            })
                }
            })
    }
}