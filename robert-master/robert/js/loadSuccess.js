$(function(){
    $('.indexs').click(function(){
        location.href='index.html';
    });
    $('.main').css('height',($(document).height()-$('header').height())+'px');
    $('.username').html('欢迎你，'+ $.cookie('wxname'));
    $('.left-user span').html($.cookie('wxname'));
    $('.btnMass').click(function(){
        $(this).css('border','0');
        $(this).css({'background':'#007dc2','color':'#fff'});
        $('.warmBox').hide();
        $('.massBox').show();
        $('.sendSuccess').hide();
        $('.massBtn li').css('line-height',$('.massBtn li').height()+'px');
        $('.massTabs').css('line-height',($('.massTabs').height()+4)+'px');
        $('.target form>span').css('line-height',$('.target form').height()+'px');
        $('.addPerson').css('margin-top',($('.target form').height()-14)/2+'px');
    });
//    获取用户好友群
    $('.addPerson').click(function(){
        var robert={};
        //robert.wxuin= '3357361444';
        robert.wxuin= $.cookie('wxuin');
        base.data_conn('user/groups',robert,getGrounp,'get');
        $('.choosePerson').show();
    });

    function getGrounp(e){

        var getGrounds='';
        var data=e['value'];console.log(data);
        for(var i in data){
            var groupName=data[i]['groupname'];
            var groupSign=data[i]['groupsign'];
            getGrounds+='<div class="chooseName"><img src="img/group_normal.png" alt="" data-flag="true"/><span sign="'+groupSign+'" class="choosing">'+groupName+'</span></div>';
        }
        $('.chooseMain').html(getGrounds);

        $('.choosing').each(function (i,obj) {
            //判断选择过得群
            if($.inArray(($(obj).attr('sign')),arr)>=0){
                $(this).siblings('img').attr({'src':'img/group_selected.png','data-flag':'false'});
            }

        });
        arr=[];
    }
    //选择好友
    $('.chooseMain').on('click','img',function(){
        if($(this).attr('data-flag')=='true'){
            $(this).attr({'src':'img/group_selected.png','data-flag':'false'});

        }else if($(this).attr('data-flag')=='false'){
            $(this).attr({'src':'img/group_normal.png','data-flag':'true'});

        }
    });
//    提交好友
    var names='';
    var arr=[];
    $('.chooseSure').click(function(){
        names='';
        //arr=[];
        $('.chooseName img[data-flag="false"]').each(function(i,obj){
            //names+=$($(obj)).siblings('span').html()+'/';
            names+='<span sign="'+$($(obj)).siblings('span').attr('sign')+'">'+$($(obj)).siblings('span').html()+'</span>';
            arr.push($($(obj)).siblings('span').attr('sign'));
        });
        $('.choosePerson').hide();
        //$('.massName').val(names.substring(0,names.length-1));

        $('.massName').html(names);
        $('.massName span').css('margin-top',($('.massName').height()-parseInt($('.massName span').css('height')
            ))/2);
    });
    $('.chooseTitle img ').click(function(){
        $('.choosePerson').hide();
    });
    $('.chooseCancel').click(function(){
        $('.choosePerson').hide();
    });

    //选择发送信息内容
    $('.sendType img').each(function(i,obj){
        $(obj).click(function(){
            $('.sendType img').removeClass('active').each(function(i,objs){
                $(objs).attr('src',$(objs).attr('data-normal'));
            });
            $(obj).addClass('active');
            $(obj).attr('src',$(this).attr('data-select'));
            //发送文字
            if($(obj).attr('data-type')=='text'){
                $('.textBody').show().val('');
            }
        })

    });
//    点击发送按钮
    $('.sendBtn').click(function(){
        if($('.massName').html()!=''){
            var robert={};var groupArr=[];
            robert.wxuin= $.cookie('wxuin');
            robert.wxname=$('.left-user span').html();
            //robert.wxname='小微-001';
            robert.theme=$('.massTheme').val();
            robert.type=$('.active').attr('data-type');
            robert.sendTime=new Date().getTime();
            robert.content=$('.textBody').val();
            $('.massName span').each(function(i,obj){
                var group={};
                group.name=$(obj).html();
                group.sign=$(obj).attr('sign');
                groupArr.push(group);
            });
            robert.targetGroup=groupArr;
            arr=[]; //清空已选择的发送对象
            base.data_conn('user/message/send',robert,sendMass,'post');
        }else{
            alert('请选择发送对象');
        }

    });
    function sendMass(e){
        if(e.info=='请求成功'){
            $('.massBox').hide();
            $('.sendSuccess').show();
            $('.backIndex').click(function(){
                $('.sendSuccess').hide();
                $('.massName span').remove();
                $('.massTheme').val('');
                $('.textBody').val('');
                $('.massBox').show();
            })
        }
    }
});