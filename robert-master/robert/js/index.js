$(function(){
    //获取二维码
    var num,imgSrc,temp;
    $(".get-btns").on('click',function(){
        //alert(1);
        $('.erweimaBox').css('height',$('.bannerBox').height());
        $(".erweima").css('margin-top',($('.bannerBox').height()-200)/2);
        $('.loading').css('margin-top',($('.bannerBox').height()-30)/2)
        clearTimeout(temp);
        num=0;
        var robert={};
        base.data_conn('wx/login','',landImg,'get');

        function landImg(data){
            imgSrc=data['value']['src'];
            $('.erweimaBox').show();
                $('.erweima img').attr('src',imgSrc);
            $('.erweima').attr('name',data['value']['_id']);
            robert._id=$('.erweima').attr('name');
                Round();
        }
        function Round(){
            base.data_conn('user/status',robert,getStatus,'get');
            num++;
        }
        function getStatus(data){
            //console.log(data);
            if(data['value']['src']!=imgSrc){
                imgSrc=data['value']['src'];
                $('.erweima img').attr('src',imgSrc);
            }
            if(data['value']['status']=='online'){
                //alert('登录成功');

                $('.loading').show();
                $('.erweima').hide();
                $('.erweimaBox>span').hide();

                $.cookie('wxuin',data['value']['wxuin'],{expires:60});
                $.cookie('wxname',data['value']['wxname'],{expires:60});
                $('.land span').html(data['value']['wxname']);
                $('.land img').show();
                $(".get-btns").unbind('click');
                setTimeout(function(){
                    $('.erweimaBox').hide();
                    location.href='loadSuccess.html';
                },10000)

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
        base.data_conn('wx/loginout',robert,getOut,'get');
        function getOut(data){
            if(data.code==200){
                $('.erweima').css('display','none');
                $('.get-btn').css('opacity','1');
            }
        }
    }
});