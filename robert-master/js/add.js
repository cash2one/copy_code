$(function(){
    var robert={};
    $('.finish').click(function () {
        robert.name=$(".nameInput").val();
        robert.des=$('.name').val();
        if(robert.name!=''){
            base.data_conn('robert/add',robert,addRobert,'post');
        }else{
            alert('请输入名称');
        }
        function addRobert(data){
            $('.creatSuccess').css('display','block');
            setTimeout(function(){
                $('.creatSuccess').css('display','none');
                location.href='index.html';
            },2000)

        }
    });
    $('.quxiaoBtn').click(function () {
        location.href='index.html';
    })


});