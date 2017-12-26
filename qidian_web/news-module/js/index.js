// 设置页面模式
// type值 1：白天模式 2：夜间模式 默认值：1
function set_page(type==1){
	if(type==1){
		$(".page-content").removeClass('nighttime');
		$(".page-content").addClass('daytime');
	}else if(){
		$(".page-content").removeClass('daytime');
		$(".page-content").addClass('nighttime');
	}else{
		console.log(type);
	}
}

// 设置字体模式
// type值 1：标准模式 2：大号字体 3：超大字体 默认值：1
function set_mode(type==1){
	if(type==1){
		$(".page-content").addClass('norm');
		$(".page-content").removeClass('super');
		$(".page-content").removeClass('big');
	}else if(type==2){
		$(".page-content").addClass('big');
		$(".page-content").removeClass('norm');
		$(".page-content").removeClass('super');
	}else if(type==3){
		$(".page-content").addClass('super');
		$(".page-content").removeClass('norm');
		$(".page-content").removeClass('big');
	}else{
		$(".page-content").addClass('norm');
		$(".page-content").removeClass('super');
		$(".page-content").removeClass('big');
	}
}