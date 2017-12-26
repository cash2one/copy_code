$(".controler").on("click","button",function(){
	var data_type = $(this).attr("data-type");
	switch(data_type){
		case "android":
			$("button.device-type").removeClass("active");
			$("#model-style").prop("href","css/android.css");
			break;
		case "IOS":
			$("button.device-type").removeClass("active");
			$("#model-style").prop("href","css/IOS.css");
			break;
		case "daytime":
			$("button.view-type").removeClass("active");
			$(".page-content").removeClass('nighttime');
			$(".page-content").addClass('daytime');
			break;
		case "nighttime":
			$("button.view-type").removeClass("active");
			$(".page-content").removeClass('daytime');
			$(".page-content").addClass('nighttime');
			break;
		case "norm":
			$("button.font-type").removeClass("active");
			$(".page-content").addClass('norm');
			$(".page-content").removeClass('super');
			$(".page-content").removeClass('big');
			break;
		case "big":
			$("button.font-type").removeClass("active");
			$(".page-content").addClass('big');
			$(".page-content").removeClass('norm');
			$(".page-content").removeClass('super');
			break;
		case "super":
			$("button.font-type").removeClass("active");
			$(".page-content").addClass('super');
			$(".page-content").removeClass('norm');
			$(".page-content").removeClass('big');
			break;
	}
	$(this).addClass("active");
})
