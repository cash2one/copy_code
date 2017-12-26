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

//alert(y);
        //    myScroll1.refresh();
        //}, 100);
        //$(".mainBox").empty();
        $(".channel").removeClass("border");
        $(obj).addClass("border");
        var val=$(obj).find("a").html();
        //$.ajax({
        //    url:"http://api.deeporiginalx.com/bdp/news/channels",
        //    type:"get",
        //    dataType:"json",
        //success:function(e){
        //    var mm= e.data;
        //for(var i=0;i< mm.length;i++){
        //if(mm[i]['cname']==val){
        //    var ids=mm[i]['id'];

        var datas={"utype":2,"platform":3,"province":"北京市","city":"北京市","district":"东城区"}
            $.ajax({
                url:'http://bdp.deeporiginalx.com/v2/au/sin/g',
                type:'post',
                datatype:"json",
                data:JSON.stringify (datas),
                contentType:'application/json',
                beforeSend:function(request,response,xhr){
                    
                    console.log(response);
                },
                success:function(data,status,xhr){
                    console.log(xhr.getResponseHeader('Authorization'));
                }
            })

        var ids=$(obj).attr("id");
        var title,pubTime,pubName,urls,nowTime,imgLists,timeCha;
        nowTime=getNowFormatDate();
        $.ajax({
            url:"http://api.deeporiginalx.com/bdp/news/load?cid="+ids+"&tstart="+transdate(nowTime),
            type:"get",
            dataType:"json",
            success:function(e){
                $(".loadMord").css("display","block");
                $(".load").css("display","none");
                $("#scroller-pullUp").css("display","block");
                $(".mainBox").html("");
                var data=e['data'];//console.log(data);
                $("<span class='first'></span>").css("display","none").html(data[0].pubTime).appendTo("body");
                $("<span class='last'></span>").css("display","none").html(data[data.length-1].pubTime).appendTo("body");
                for(var i=0;i<data.length;i++){
                    title=data[i].title;
                    pubTime=data[i].pubTime;
                    timeCha=timeDifference(nowTime,pubTime);
                    pubName=data[i].pubName;
                    urls=data[i].url;
                    //console.log(encodeURI(data[i].docid));
                    var aUrl=del_html_tags(base64encode(urls),"=","");//console.log(aUrl);
                    if(!("imgList" in data[i])){
                        $("<a class='a'></a>").attr({"id":"a"+i,"href":"http://deeporiginalx.com/news.html?type=0&url="+aUrl+"&interface"}).appendTo(".mainBox");
                        $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                        $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                        $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                        $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                        $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                    }else{
                        imgLists=data[i].imgList;
                        //alert(false)
                        if(imgLists.length==1){
                            $("<a class='a'></a>").attr({"id":"a"+i,"href":"http://deeporiginalx.com/news.html?type=0&url="+aUrl+"&interface"}).appendTo(".mainBox");
                            $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                            $("<div class='imgbox'></div>").attr("id","img"+i).appendTo("#li"+i);
                            $("<img src="+imgLists[0]+">").appendTo("#img"+i);
                            $("<div class='wordBox'></div>").attr("id","word"+i).appendTo("#li"+i);
                            $("<p class='titleWord'></p>").html(title).appendTo("#word"+i);
                            $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#word"+i);
                            $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                            $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                        }else if(imgLists.length>1){
                            //alert(1)
                            $("<a class='a'></a>").attr({"id":"a"+i,"href":"http://deeporiginalx.com/news.html?type=0&url="+aUrl+"&interface"}).appendTo(".mainBox");
                            $("<li></li>").attr("id","li"+i).appendTo("#a"+i);
                            $("<p class='titleWord'></p>").html(title).appendTo("#li"+i);
                            $("<div class='imgboxs'></div>").attr("id","tubox"+i).appendTo("#li"+i);
                            for(var j=0;j<imgLists.length;j++){
                                //alert(imgList.length)
                                $("<div><img src="+imgLists[j]+"></div>").appendTo("#tubox"+i);
                            }
                            $("<div class='fromBox'></div>").attr("id","from"+i).appendTo("#li"+i);
                            $("<div class='from'></div>").html(pubName).appendTo("#from"+i);
                            $("<div class='time'></div>").html(timeCha).appendTo("#from"+i);
                        }
                    }
                }
                $("img").load(function(){
                    setTimeout(function () {
                        myScroll1.refresh();
                    }, 100);
                })

            }

        })

    }
}