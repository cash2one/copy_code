$(function(){
   $(".list-create").click(function(){
       $(".creatRule").css('display','block');
   });
    $(".quxiaoBtn").click(function(){
        $(".creatRule").css('display','none');
    });
    $('.list-right').css('height',$('body').height());
    //alert($('body').height())
    //添加对话
    var talk='';
    $(".addBtn").click(function(){
        talk='';
        talk+='<div class="talkBox"><div class="closeTalk"><img src="img/del.png"></div>';
        talk+='<form action="#" class="qBox"> <span><img src="img/user.png"></span><input type="text" class="question"/></form>';
        talk+='<form action="#" class="aBox"><span class="left"><img src="img/robert.png"></span><input type="text" class="answer"/></form></div>';
        $(".talkOut").append(talk);
    });
    //删除对话
    $('body').delegate('.closeTalk','click',function(){
            $(this).parent('.talkBox').remove();
    }).delegate('.talkBox','mouseover',function(){
        $(this).find('.closeTalk').css('opacity','1');
    }).delegate('.talkBox','mouseout',function(){
        $(this).find('.closeTalk').css('opacity','0');
    });
//    访问story列表接口
    var robert={};
    robert.robertid=base.getUrlParam('id');
    base.data_conn('story/show',robert,getListLeft,'get');
    function getListLeft(data){
        console.log(data)
        var robertList='';
        for(var i=0;i<data.length;i++){
            robertList+='<li id='+data[i]['_id']+'>'+data[i].name+'</li>';
        }
        $(".list-left").html(robertList);
    }
//    添加story
    $('.creatBtn').click(function(){
        robert.name=$('.creatName').val();
        robert.des=$('.creatDes').val()
        if(robert.name!=''){
            base.data_conn('story/add',robert,getListadd,'post');
        }
        function getListadd(){
            $('.creatName').val('');
            $('.creatDes').val('');
            $('.creatRule').css('display','none');
            $(".creatSuccess").css('display','block');
            setTimeout(function(){
                $(".creatSuccess").css('display','none');
            },1000)
            //$('.list-left li').remove();alert(1)
            base.data_conn('story/show',robert,getListLeft,'get');
        }
    });
//    获取对话
//
    $('.list-left').on('click','li',function(){
        $('.list-left li').each(function(i,obj){
        $(obj).removeClass('addBackground');
    });
        $(this).addClass('addBackground');
        robert.storyid=$(this).attr("id");
        base.data_conn('rule/show',robert,getTalk,'get');
    function getTalk(data){
        var talkData='';
        for(var i=0;i<data.length;i++){
            var getQ=data[i]['question'];
            var getA=data[i]['answer'];
            talkData+='<div class="talkBox"><div class="closeTalk">x</div><form action="#" class="qBox">';
            talkData+='<span>Q</span><input type="text" class="question" value="'+getQ+'"/></form>';
            talkData+='<form action="#" class="aBox"><input type="text" class="answer" value="'+getA+'"/><span class="left">A</span></form></div>';
        }
        $('.talkOut').html(talkData);
    }
    });
//    del story
    $('.list-del').click(function(){
        //$('.list-left li').remove();
        var roberts={};
        roberts.storyid=$('.addBackground').attr('id');
        base.data_conn('story/del',roberts,getListadd,'delete');
        function getListadd(){
            alert('确认删除');
            console.log(robert,'hfftcctd');
            base.data_conn('story/show',robert,getListLeft,'get');

        }
    });
//    添加对话
    $(".saveBtn").click(function(){
        var robert={};
        robert.storyid=$(".addBackground").attr('id');
        var talkBox=[];
        $('.talkBox').each(function(i,obj){
            var talk={};
            talk.question=$(obj).find(".question").val();
            talk.answer=$(obj).find(".answer").val();
            talkBox.push(talk);
        });
        robert.qa_list=talkBox;
        base.data_conn('rule/add',robert,addTalk,'post');
        function addTalk(data){
            alert('保存成功');
        }
    })
});