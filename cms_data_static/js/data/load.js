$(function(){
    $('.btn').click(function(){
        var formdata=new FormData();
        formdata.append('account',$('.name').val());
        formdata.append('password',$('.password').val());
        $.ajax({
            url:"http://fez.deeporiginalx.com:9003/login",
            type:"post",
            data:formdata,
            processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
            contentType : false, // 不设置Content-type请求头
            success:function(e){
                if(e.code==200){
                    $.cookie('token', e.token);
                    location.href='index.html';
                }else {
                    alert(e.message)
                }
            }
        })
    })

});