var fss;
var tt;
var cw=$(window).width();
$(function() {
    fss = new ddfullscreenslider({
        sliderid: 'dowebok',
        onslide: function($slide, index) {
            if(cw>992){
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
                        $(".card31").animate({opacity:"1",left:"23%"},1000,"easeOutCubic",function(){
                            $(".card32").animate({opacity:"1",left:"26%"},1000,"easeOutCubic",function(){
                                $(".card33").animate({opacity:"1",left:"29%"},1000,"easeOutCubic",function(){
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
                $(".card31").css({"opacity":"0",left:"21%"});
                $(".card32").css({"opacity":"0",left:"24%"});
                $(".card33").css({"opacity":"0",left:"27%"});
                $(".phonen3 img").css("opacity","0");

                $(".phone3").stop();
                $(".phonen3").stop();
                $(".word3Tu img").stop();
                $(".word3").stop();
                $(".card31").stop();
                $(".card32").stop();
                $(".card33").stop();
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
            }else{
                if(index==0){
                    var t1=setTimeout(function(){
                        $($(".phonen img")[1]).css("transform","scale(1.2,1.2)").animate({opacity:"0"},function(){
                            $($(".phonen img")[0]).animate({top:"-297px"},1000)
                        })
                        clearTimeout(t1);
                    },1000)
                }else{
                    $($(".phonen img")[1]).css({"transform":"scale(1,1)","opacity":1});
                    $($(".phonen img")[0]).css({"top":0});
                    $($(".phonen img")[1]).stop();
                    $($(".phonen img")[0]).stop();
                }
                if(index==1){
                    var t2=setTimeout(function(){
                        $(".phonePhone2_2").animate({top:"25%",marginLeft:"-35%"},1600,"easeOutCubic",function(){
                            $(".phonePhonen2_2").animate({opacity:"1"});
                            $(".phoneShowcard2_2").animate({marginLeft:"-35%",opacity:"1"},1600,"easeOutCubic",function(){
                                $(".phoneWord2_2").animate({top:"15%",opacity:"1"},1600,"easeOutCubic",function(){
                                    $(".phoneWord2tu_2").animate({width:"70%"},1600,"easeOutCubic")
                                })
                            })
                        })
                        clearTimeout(t2);
                    },1000)
                }else{
                    $(".phonePhone2_2").css({"top":"100%","margin-left":"-55%"});
                    $(".phonePhonen2_2").css("opacity","0");
                    $(".phoneShowcard2_2").css({"margin-left":"-25%","opacity":"0"});
                    $(".phoneWord2_2").css({"top":"20","opacity":"0"});
                    $(".phoneWord2tu_2").css("width","0");
                    $(".phonePhone2_2").stop();
                    $(".phonePhonen2_2").stop();
                    $(".phoneShowcard2_2").stop();
                    $(".phoneWord2_2").stop();
                    $(".phoneWord2tu_2").stop();
                }
                if(index==2){
                    var t2=setTimeout(function(){
                        $(".phonePhone2_3").animate({top:"25%",marginLeft:"-35%"},1600,"easeOutCubic",function(){
                            $(".phonePhonen2_3").animate({opacity:"1"});
                            $(".phoneShowcard31").animate({marginLeft:"-20%",opacity:"1"},1000,"easeOutCubic",function(){
                            $(".phoneShowcard32").animate({marginLeft:"-12%",opacity:"1"},1000,"easeOutCubic",function(){

                            $(".phoneShowcard33").animate({marginLeft:"-4%",opacity:"1"},1000,"easeOutCubic",function(){
                                $(".phoneWord2_3").animate({top:"15%",opacity:"1"},1600,"easeOutCubic",function(){
                                    $(".phoneWord2tu_3").animate({width:"70%"},1600,"easeOutCubic")
                                })
                            })
                        })})})
                        clearTimeout(t2);
                    },1000)
                }else{
                    $(".phonePhone2_3").css({"top":"100%","margin-left":"-15%"});
                    $(".phonePhonen2_3").css("opacity","0");
                    $(".phoneShowcard31").css({"margin-left":"-30%","opacity":"0"});
                    $(".phoneShowcard32").css({"margin-left":"-22%","opacity":"0"});
                    $(".phoneShowcard33").css({"margin-left":"-14%","opacity":"0"});

                    $(".phoneWord2_3").css({"top":"20","opacity":"0"});
                    $(".phoneWord2tu_3").css("width","0");
                    $(".phonePhone2_3").stop();
                    $(".phonePhonen2_3").stop();
                    $(".phoneShowcard31").stop();
                    $(".phoneShowcard32").stop();
                    $(".phoneShowcard33").stop();

                    $(".phoneWord2_3").stop();
                    $(".phoneWord2tu_3").stop();
                }
                if(index==3){
                    var t2=setTimeout(function(){
                        $(".phonePhone2_4").animate({top:"25%",marginLeft:"-35%"},1600,"easeOutCubic",function(){
                            $(".phonePhonen2_4").animate({opacity:"1"});
                            $(".phoneShowcard2_4").animate({marginLeft:"-35%",opacity:"1"},1600,"easeOutCubic",function(){
                                $(".phoneWord2_4").animate({top:"15%",opacity:"1"},1600,"easeOutCubic",function(){
                                    $(".phoneWord2tu_4").animate({width:"70%"},1600,"easeOutCubic")
                                })
                            })
                        })
                        clearTimeout(t2);
                    },1000)
                }else{
                    $(".phonePhone2_4").css({"top":"100%","margin-left":"-55%"});
                    $(".phonePhonen2_4").css("opacity","0");
                    $(".phoneShowcard2_4").css({"margin-left":"-25%","opacity":"0"});
                    $(".phoneWord2_4").css({"top":"20","opacity":"0"});
                    $(".phoneWord2tu_4").css("width","0");
                    $(".phonePhone2_4").stop();
                    $(".phonePhonen2_4").stop();
                    $(".phoneShowcard2_4").stop();
                    $(".phoneWord2_4").stop();
                    $(".phoneWord2tu_4").stop();
                }
                if(index==4){
                    var t2=setTimeout(function(){
                        $(".phonePhone2_5").animate({top:"25%",marginLeft:"-35%"},1600,"easeOutCubic",function(){
                            $(".phonePhonen2_5").animate({opacity:"1"});
                            $(".phoneShowcard51").animate({marginLeft:"-20%",opacity:"1"},1000,"easeOutCubic",function(){
                                $(".phoneShowcard52").animate({marginLeft:"-15%",opacity:"1"},1000,"easeOutCubic",function(){

                                    $(".phoneShowcard53").animate({marginLeft:"-10%",opacity:"1"},1000,"easeOutCubic",function(){
                                        $(".phoneWord2_5").animate({top:"15%",opacity:"1"},1600,"easeOutCubic",function(){
                                            $(".phoneWord2tu_5").animate({width:"70%"},1600,"easeOutCubic")
                                        })
                                    })
                                })})})
                        clearTimeout(t2);
                    },1000)
                }else{
                    $(".phonePhone2_5").css({"top":"100%","margin-left":"-15%"});
                    $(".phonePhonen2_5").css("opacity","0");
                    $(".phoneShowcard51").css({"margin-left":"-30%","opacity":"0"});
                    $(".phoneShowcard52").css({"margin-left":"-25%","opacity":"0"});
                    $(".phoneShowcard53").css({"margin-left":"-20%","opacity":"0"});

                    $(".phoneWord2_5").css({"top":"20","opacity":"0"});
                    $(".phoneWord2tu_5").css("width","0");
                    $(".phonePhone2_5").stop();
                    $(".phonePhonen2_5").stop();
                    $(".phoneShowcard51").stop();
                    $(".phoneShowcard52").stop();
                    $(".phoneShowcard53").stop();

                    $(".phoneWord2_5").stop();
                    $(".phoneWord2tu_5").stop();
                }
                if(index==5){
                    var t2=setTimeout(function(){
                        $(".phonePhone2_6").animate({top:"25%",marginLeft:"-35%"},1600,"easeOutCubic",function(){
                            $(".phonePhonen2_6").animate({opacity:"1"});
                            $(".phoneShowcard61").animate({marginLeft:"-20%",opacity:"1"},1000,"easeOutCubic",function(){
                                $(".phoneShowcard62").animate({marginLeft:"-30%",opacity:"1"},1000,"easeOutCubic",function(){
                                        $(".phoneWord2_6").animate({top:"15%",opacity:"1"},1600,"easeOutCubic",function(){
                                            $(".phoneWord2tu_6").animate({width:"70%"},1600,"easeOutCubic")
                                        })
                                    })
                                })})
                        clearTimeout(t2);
                    },1000)
                }else{
                    $(".phonePhone2_6").css({"top":"100%","margin-left":"-55%"});
                    $(".phonePhonen2_6").css("opacity","0");
                    $(".phoneShowcard61").css({"margin-left":"-10%","opacity":"0"});
                    $(".phoneShowcard62").css({"margin-left":"-20%","opacity":"0"});
                    $(".phoneWord2_6").css({"top":"20","opacity":"0"});
                    $(".phoneWord2tu_6").css("width","0");
                    $(".phonePhone2_6").stop();
                    $(".phonePhonen2_6").stop();
                    $(".phoneShowcard61").stop();
                    $(".phoneShowcard62").stop();
                    $(".phoneWord2_6").stop();
                    $(".phoneWord2tu_6").stop();
                }


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
    $(".button").click(function () {
        $(".navbtn").toggle();
    })
});