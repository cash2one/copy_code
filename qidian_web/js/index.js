var fss;
var tt;
$(function() {
    fss = new ddfullscreenslider({
        sliderid: 'dowebok',
        onslide: function($slide, index) {
            setTimeout(function(){
                $(".jia").remove();
            },2000)
            if(index==0){
                var t1=setTimeout(function(){
                    $($(".phonen img")[1]).css("transform","scale(1.2,1.2)").animate({opacity:"0"},function(){
                        $($(".phonen img")[0]).animate({top:"-594px"},1000)
                    })
                    clearTimeout(t1);
                },1000)
                $(".android a").hover(function(){
                    $(this).find("#img").animate({opacity:"1"},100);
                },function(){
                    $(this).find("#img").animate({opacity:"0"},100);
                })
                $(".ios a").hover(function(){
                    $(this).find("#img2").animate({opacity:"1"},100);
                },function(){
                    $(this).find("#img2").animate({opacity:"0"},100);
                })
            }else {
                $($(".phonen img")[1]).css({"transform":"scale(1,1)","opacity":1});
                $($(".phonen img")[0]).css({"top":0})
                $($(".phonen img")[1]).stop();
                $($(".phonen img")[0]).stop();
            }
            if(index==1){
                var t2=setTimeout(function(){
                    $(".phone2").animate({top:"20%",right:"14%"},1600,"easeOutCubic")
                    $(".phonen2").animate({top:"26%",right:"16%"},1600,"easeOutCubic",function(){
                        $(".phonen2 img").animate({opacity:"1"},1600);
                        $(".showcard2").animate({right:"19%",opacity:"1"},1600,"easeOutCubic",function(){
                            $(".word2Tu img").animate({width:"100%"},1600,"easeOutCubic",function(){
                                $(".word2").animate({top:"37%",opacity:"1"},1600,"easeOutCubic")
                            })
                        })
                    })
                    clearTimeout(t2);
                },500)
            }else {
                $(".phone2").css({"top":"100%","right":"19%"});
                $(".phonen2").css({"top":"41%","right":"21%"});
                $(".showcard2").css({"right":"15%","opacity":"0"});
                $(".word2Tu img").css("width","0");
                $(".word2").css({"top":"50%","opacity":"0"});
                $(".phonen2 img").css("opacity","0");

                $(".phone2").stop();
                $(".phonen2").stop();
                $(".showcard2").stop();
                $(".word2Tu img").stop();
                $(".word2").stop();
                $(".phonen2 img").stop();
            }
            if(index==2){
                var t3=setTimeout(function(){
                    $(".phone3").animate({top:"20%",right:"14%"},1500,"easeOutCubic")
                    $(".phonen3").animate({top:"26.5%",left:"21%"},1600,"easeOutCubic",function(){
                        $(".phonen3 img").animate({opacity:"1"});
                        $(".card1").animate({opacity:"1",left:"23%"},1000,"easeOutCubic",function(){
                            $(".card2").animate({opacity:"1",left:"26%"},1000,"easeOutCubic",function(){
                                $(".card3").animate({opacity:"1",left:"29%"},1000,"easeOutCubic",function(){
                                    $(".word3Tu img").animate({width:"100%"},1600,"easeOutCubic",function(){
                                        $(".word3").animate({top:"43%",opacity:"1"},1600,"easeOutCubic")
                                    })
                                })
                            })
                        });

                        clearTimeout(t3);
                    });

                },500)
            }else{
                $(".phone3").css({"top":"100%","right":"19%"});
                $(".phonen3").css({"top":"41%","left":"21%"});
                $(".word3Tu img").css("width","0");
                $(".word3").css({"top":"50%","opacity":"0"});
                $(".card1").css({"opacity":"0",left:"21%"});
                $(".card2").css({"opacity":"0",left:"24%"});
                $(".card3").css({"opacity":"0",left:"27%"});
                $(".phonen3 img").css("opacity","0");

                $(".phone3").stop();
                $(".phonen3").stop();
                $(".word3Tu img").stop();
                $(".word3").stop();
                $(".card1").stop();
                $(".card2").stop();
                $(".card3").stop();
                $(".phonen3 img").stop();
            }
            if(index==3){
                var t4=setTimeout(function(){
                    $(".phone4").animate({top:"20%",right:"14%"},1500,"easeOutCubic")
                    $(".phonen4").animate({top:"26%",right:"16%"},1600,"easeOutCubic",function(){
                        $(".phonen4 img").animate({opacity:"1"});
                        $(".showcard4").animate({right:"19%",opacity:"1"},1600,"easeOutCubic",function(){
                            $(".word4Tu img").animate({width:"100%"},1600,"easeOutCubic",function(){
                                $(".word4").animate({top:"43%",opacity:"1"},1600,"easeOutCubic")
                            })
                        })
                    })
                    clearTimeout(t4);
                },500)
            }else{
                $(".phone4").css({"top":"100%","right":"19%"});
                $(".phonen4").css({"top":"41%","right":"21%"});
                $(".showcard4").css({"right":"15%","opacity":"0"});
                $(".word4Tu img").css("width","0");
                $(".word4").css({"top":"50%","opacity":"0"});
                $(".phonen4 img").css("opacity","0");

                $(".phone4").stop();
                $(".phonen4").stop();
                $(".showcard4").stop();
                $(".word4Tu img").stop();
                $(".word4").stop();
                $(".phonen4 img").stop();
            }
            if(index==4){
                var t5=setTimeout(function(){
                    $(".phone5").animate({top:"20%",right:"14%"},1600,"easeOutCubic")
                    $(".phonen5").animate({top:"26.5%",left:"21%"},1600,"easeOutCubic",function(){
                        $(".phonen5 img").animate({opacity:"1"});
                        $(".card5-1").animate({opacity:"1",left:"23%"},1000,"easeOutCubic",function(){
                            $(".card5-2").animate({opacity:"1",left:"25%"},1000,"easeOutCubic",function(){
                                $(".card5-3").animate({opacity:"1",left:"27%"},1000,"easeOutCubic",function(){
                                    $(".word5Tu img").animate({width:"100%"},1600,"easeOutCubic",function(){
                                        $(".word5").animate({top:"43%",opacity:"1"},1600,"easeOutCubic")
                                    })
                                })
                            })
                        });

                        clearTimeout(t5);
                    });

                },500)
            }else{
                $(".phone5").css({"top":"100%","right":"19%"});
                $(".phonen5").css({"top":"41%","left":"21%"});
                $(".word5Tu img").css("width","0");
                $(".word5").css({"top":"50%","opacity":"0"});
                $(".card5-1").css({"opacity":"0",left:"21%"});
                $(".card5-2").css({"opacity":"0",left:"23%"});
                $(".card5-3").css({"opacity":"0",left:"25%"});
                $(".phonen5 img").css("opacity","0");

                $(".phone5").stop();
                $(".phonen5").stop();
                $(".word5Tu img").stop();
                $(".word5").stop();
                $(".card5-1").stop();
                $(".card5-2").stop();
                $(".card5-3").stop();
                $(".phonen5 img").stop();
            }
            if(index==5){
                var t2=setTimeout(function(){
                    $(".phone6").animate({top:"20%",right:"14%"},1600,"easeOutCubic")
                    $(".phonen6").animate({top:"26%",right:"16%"},1600,"easeOutCubic",function(){
                        $(".phonen6 img").animate({opacity:"1"});
                        $(".card6-1").animate({right:"18%",opacity:"1"},1600,"easeOutCubic",function(){
                            $(".card6-2").animate({right:"22%",opacity:"1"},1600,"easeOutCubic",function(){
                                $(".word6Tu img").animate({width:"100%"},1600,"easeOutCubic",function(){
                                    $(".word6").animate({top:"43%",opacity:"1"},1600,"easeOutCubic")
                                })
                            })

                        })
                    })
                    clearTimeout(t2);
                },500)
            }else{
                $(".phone6").css({"top":"100%","right":"19%"});
                $(".phonen6").css({"top":"41%","right":"21%"});
                $(".card6-1").css({"right":"15%","opacity":"0"});
                $(".card6-2").css({"right":"15%","opacity":"0"});
                $(".word6Tu img").css("width","0");
                $(".word6").css({"top":"50%","opacity":"0"});
                $(".phonen6 img").css("opacity","0");

                $(".phone6").stop();
                $(".phonen6").stop();
                $(".card6-1").stop();
                $(".card6-2").stop();
                $(".word6Tu img").stop();
                $(".word6").stop();
                $(".phonen6 img").stop();
            }

             $(".navword").each(function(i,obj){
                 $(obj).hover(function(){
                     $(this).css("color","#fff")
                 },function(){
                     $(this).css("color","#eee")
                 })
             })



        }
    });
});