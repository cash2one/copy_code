$(function() {
	var keyword = base.get_url_param("keyword")||""; 	// 搜索关键词
	var count = base.get_url_param("count")||5;			// 新闻展示数量
	var type = base.get_url_param("type")||1;			// 标题样式类型
	var keyword_sign = base.get_url_param("keyword_sign")||false;		// 关键词是否高亮显示
	var source = base.get_url_param("source");			// SDK来源
	var path = "/v2/ns/es/s";
	var rqd = {};
	rqd.keywords = keyword;
	rqd.p = 1;
	rqd.c = (count>20?count:20);
	
	base.jsonp_conn(path,rqd,function(data){
		if(data.code!=2000){
			$("body").hide();
			return;
		}
		var news = data.data;
		var newsList = [];
		for(var n in news){
			news[n].ptime = Date.parse(new Date(news[n].ptime));
		}
		news = news.sort(base.compare("ptime"))
		var show_length = (count>=news.length?news.length:count);
		for(var n=0;n<show_length;n++){
			var str = "";
			var item = news[n];
			str += '<div class="recommend-item clearfix"><a target="_blank" href="http://deeporiginalx.com/news-share/?nid='+ item.nid +'&source='+ source +'">';
			if(item.imgs&&item.imgs.length>0){
				str += '<div class="recommend-img">';
				str += '<img src="'+ item.imgs[0] +'">';
				str += '</div>';
				str += '<div class="recommend-info">';
			}else{
				str += '<div class="recommend-info full">';
			}
			str += '<div class="recommend-title">'+ (keyword_sign?get_text(item.title):item.title) +'</div>';
			str += '<div class="recommend-foot">'+ item.pname +'</div>';
			str += '</div></a></div>';
			newsList.push(str);
		}
		$("#list-count").html(newsList.join(""));
		$(".recommend-info").addClass("style-SDK-"+type);
		if($("#list-count img").length>0){
			$("#list-count img").load(function() {
				$("#list-count").attr("data-load","true")
			});
		}else{
			$("#list-count").attr("data-load","true")
		}
		
	})
	function get_text(str){
		return $("<div>"+str+"</div>").text();
	}
});