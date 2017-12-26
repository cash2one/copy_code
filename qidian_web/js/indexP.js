$(function(){
    $(".navBox").find("a").each(function(i,index) {
        $(this).hover(function () {
            $(this).css("color","#6cc1fb");
            $(".underline").css("opacity","0");
            $(".sanjiao").css("opacity","0");
            $(this).find(".underline").animate({"opacity":"1"});
            $(this).find(".sanjiao").animate({"opacity":"1"});
        }, function () {
            $(this).css("color", "#878787");
            $(this).find(".underline").animate({"opacity":"0"});
            $(this).find(".sanjiao").animate({"opacity":"0"});
        })
    })
    $(".navBoxB").find("a").each(function(i,index) {
        $(this).hover(function () {
            $(".underline").css("opacity","0");
            $(".sanjiao").css("opacity","0");
            $(this).find(".underline").animate({"opacity":"1"});
            $(this).find(".sanjiao").animate({"opacity":"1"});
        }, function () {
            $(this).find(".underline").stop();
            $(this).find(".sanjiao").stop();
            $(this).find(".underline").animate({"opacity":"0"});
            $(this).find(".sanjiao").animate({"opacity":"0"});
        })
    })
    $('.tiyanBox').each(function(i,index){
        $(this).hover(function(){
            $(this).find(".tiyan").css("color","#6cc1fb");
            $(this).find("img").attr("src","img/jiantouHover.png")
        },function(){
            $(this).find(".tiyan").css("color","#979797");
            $(this).find("img").attr("src","img/jiantou.png")
        })
    })
    var ch=$(window).height();
    $(".bannerboxP").css("height",ch);
    $(".btnP").click(function(){
        $(".navP").slideToggle();
    })
})