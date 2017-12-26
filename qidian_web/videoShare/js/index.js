$(function(){
    $.ajax({
        url:'text.txt',
        type:'get',
        datatype:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success:function(data){
            var e=JSON.parse(data);
           console.log(e.data.videourl);
            $('video').attr('autoplay','false');
            $('.imgPlay').click(function(){
                $(this).hide();
                $('.videoBox').css('display','block');
                $('.videoBox').attr('src',e.data.videourl);

            })

            $('.videoTitle').html(e.data.title);
        }
    })
})