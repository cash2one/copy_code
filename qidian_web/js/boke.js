$(function(){
    //var num=$(".mainnei").length-1;
    //var temp;
    //$(".fenyedown").click(function(){
    //    num--;
    //    if(num>-1){
    //        $(".mainnei").css("opacity","0");
    //        $($(".mainnei")[num]).css("opacity","1");
    //        temp=num;
    //    }
    //
    //})
    //$(".fenyeup").click(function(){
    //    temp++;
    //    if(temp<$(".mainnei").length){
    //        $(".mainnei").css("opacity","0");
    //        $($(".mainnei")[temp]).css("opacity","1");
    //        num=temp;
    //    }
    //})

    $(".choseWord").each(function(i,obj){
      $(obj).click(function(){
          $(".mainbox").animate({opacity:"0"});
          $($(".mainbox")[i]).animate({opacity:"1"});


        var num=$($(".mainbox")[i]).find(".mainnei").length-1;
        //alert(num);
        var temp;
        $($(".mainbox")[i]).find(".fenyedown").click(function(){
            num--;
            if(num>-1){
                alert($(obj).parent().siblings().find(".mainnei").length)
                $(obj).parent().siblings().find(".mainnei").css("opacity","0");
                $($(obj).parent().siblings().find(".mainnei")[num]).css("opacity","1");
                temp=num;
            }

        })
        $($(".mainbox")[i]).find(".fenyeup").click(function(){
            temp++;
            if(temp<$(obj).parent().siblings().find(".mainnei").length){
                alert($(obj).parent().siblings().find(".mainnei").length)
                $(obj).parent().siblings().find(".mainnei").css("opacity","0");
                $($(obj).parent().siblings().find(".mainnei")[temp]).css("opacity","1");
                num=temp;
            }
        })
      })
    })
})