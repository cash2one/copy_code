$(function(){
    //base.data_conn('robert/show','',getList,'get');
    function getList(data){
        //console.log(data);
        var dataList='';
        for(var i=0;i<data.length;i++){
            dataList+='<li id="'+data[i]["_id"]+'">'+data[i]["name"]+'</li>';
        }
        $(".contentL").append(dataList);
        $(".contentL li").each(function(i,obj){
            $(obj).click(function(){
                for(var j=0;j<$(".contentL li").length;j++){
                    $($(".contentL li")[j]).css('background','');
                }
                $(this).css('background','#ddd');
                $(".des").html(data[i]['des']);
                //$('.href-btn').parent('a').attr('href','list.html?id='+data[i]['_id']);
                $('.erweima').attr('robertId',$(this).attr('id')).css('display','none');
                //$('.quit-btn').attr('id',$(this).attr('id'));
                $('.get-btn').css('opacity','1');
                num=30;
            })
        })
    }
    //获取二维码
    var num,imgSrc,temp;
    $(".get-btns").on('click',function(){
        clearTimeout(temp);
        $('.load').css('display','block');
        num=0;
        var robert={};
            $(".get-btn").css('opacity','0');
        //robert.robertid=$('.erweima').attr('robertId');
        base.data_conn('wx/login','',landImg,'get');

        function landImg(data){
            $('.load').css('display','none');
            imgSrc=data['src'];
                $('.erweima img').attr('src',imgSrc);
            $('.erweima').attr('name',data['_id']);
            //Round();
            robert._id=$('.erweima').attr('name');
            setTimeout(function(){
                Round();
            },3000);
        }
        function Round(){
            base.data_conn('login/status',robert,getStatus,'get');
            num++;
        }
        function getStatus(data){
            //console.log(data);
            if(data['src']!=imgSrc){
                imgSrc=data['src'];
                $('.erweima img').attr('src',imgSrc);
            }
            if(data['status']=='online'){
                //alert('登录成功');
                $.cookie('username',data['wxnum']);
                location.href='listNews.html?username='+data['wxnum'];
            }else{
                temp=setTimeout(function(){
                    //num<30?Round():out();
                    Round();
                },1000)
            }
        }
        $('.erweima').css("display",'block');
    });

    function out(){
        var robert={};
        robert._id=$('.erweima').attr('name');
        //robert.botname=$('.erweima').attr('name');
        base.data_conn('wx/loginout',robert,getOut,'get');
        function getOut(data){
            if(data.code==200){
                $('.erweima').css('display','none');
                $('.get-btn').css('opacity','1');
            }
        }
    }
//    退出二维码
    $('.quit-btn').click(function(){
        num=30;
        //var robert={};
        //robert.robertid=$('.erweima').attr('robertId');
        out();
    })

});