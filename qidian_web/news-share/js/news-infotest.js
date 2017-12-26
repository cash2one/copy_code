
$(function() {
	var nid = base.get_url_param("nid");
	var nfrom = base.get_url_param("from")||"feed";
	var source = base.get_url_param("source")||1;
	// 日志记录
	var log ;
	var req_data = true;
	// alert("nid"+nid);
	// 设置IFRAME高度
	$(".GDT-ad").css({
		height:($(window).width()*0.936/6.4)
	});
	// 获取新闻数据
	(function(nid){
		var path = "/v2/ns/con";
		var rqd = {};
		if(nid){
			rqd.nid = nid;
		}else{
			$(".page-content").html("ERROR:nid not defined");
			console.log("请设置正确的新闻参数");
			return;
		}
		// 获取User
		// var user = new User(function(uid,if_sign){
			var uid = 123;
			rqd.uid = uid;
			base.jsonp_conn(path,rqd,function(data){
				var news_info = data.data;
				var chid = news_info.channel||0;
				for(var n in news_info){
					$("[data-"+n+"]").html(news_info[n]);
				}
				var contents = news_info.content;
				var news_html = [];
				for(var c in contents){
					if(contents[c].txt){
						news_html.push("<div>"+contents[c].txt+"</div>")
					}else if(contents[c].img){
						var size = base.img_size(contents[c].img);
						news_html.push("<img style='max-width:"+ size.w +"px' src="+ contents[c].img +" />")
					}
				}
				// 加载评论
				// get_comment_data(news_info.docid);
				$(".news-info").html(news_html.join(""));
				$(".page-content").show();
				$("#gdt-banner").attr('src', "gdt-banner.html?source="+source+"&uid="+uid);
				$("#gdt-recom").attr("src","gdt-recom.html?source="+source+"&uid="+uid);
				// log = new Log({
				// 	uid:uid,	// 用户ID
				// 	nid:nid,	// 新闻ID
				// 	cid:chid, 	// 频道ID
				// 	ctype:parseInt(source),
				// 	source:nfrom
				// },["#gdt-banner","#gdt-recom"]);
				// if(if_sign){
				// 	log.user_signin();
				// }
			})
		// });
	})(nid);
	
	// 获取相关推荐 
	var recomend_page = 1;
	get_recomend(nid,recomend_page);
	function get_recomend(nid,page){
		var path = "/v2/ns/asc";
		var rqd = {
			nid:nid,
			p:page,
			c:4
		};
		if(!nid){
			return;
		}
		base.jsonp_conn(path,rqd,function(data){
			var recommends = data.data;
			if(recommends.length>0){
				var reco_html = create_recomend(recommends);
				if(page==1){
					$("#recommend-content").html(reco_html.join(""));
				}else{
					$("#recommend-more").append(reco_html.join(""));
				}
			}else if(page==1){
				$(".news-recommend").hide();
			}else{
				$(".recommend-more").html("已显示全部推荐新闻");
			}
			recomend_page++;
			req_data = true;
		})
	};

	// 获取评论信息
	function get_comment_data(did){
		var path = "/v2/ns/coms/h";
		var rqd = {did:BASE64.encoder(did)};
		base.data_conn(path,rqd,function(data){
			var comments = data.data;
			if(data.code==2000){
				var coms = create_comment(comments);
				$(".comment-content").html(coms.join(""));
			}else{
				$(".news-comment").hide();
			}
		})
	}
	
	// 生成推荐页面
	function create_recomend(recos){
		var reco_arr = [];
		for(var r in recos){
			var str = "";
			var reco = recos[r];
			str += '<div class="recommend-item clearfix" data-href="http://deeporiginalx.com/news-share/index.html?nid='+ reco.nid +'&nfrom=relate&source='+source+'">';
			if(reco.img&&reco.img.length>0){
				str += '<div class="recommend-img">';
				str += '<img src="'+reco.img+'">';
				str += '</div>';
				str += '<div class="recommend-info">';
			}else{
				str += '<div class="recommend-info recommend-full">';
			}
			str += '<div class="recommend-title">'+ get_text(reco.title) +'</div>';
			str += '<div class="recommend-foot">'+ reco.pname +'</div></div></div>';
			reco_arr.push(str);
		}
		return reco_arr;
	}

	// 添加推荐信息
	function insert_recommend(num,flag){
		var left_reco = recommends_data.splice(num);
		var reco_html = create_recomend(recommends_data);
		if(flag){
			$("#recommend-content").prepend(reco_html.join(""));
		}else{
			$("#recommend-content").append(reco_html.join(""));
		}
		recommends_data = left_reco;
		if(left_reco.length<=0){
			$(".recommend-more").html("已显示全部推荐新闻");
		}
	}
	
	// 生成评论页面
	function create_comment(coms){
		var comm_arr = [];
		for(var c in coms){
			var str = "";
			var com = coms[c];
			str += '<div class="comment-item">';
			str += '<div class="comment-top">';
			str += '<img class="user-avat" src="'+ (com.avatar||"icon/avatar.jpg") +'">';
			str += '<span class="news-like">'+com.commend+'赞</span>';
			str += '<div class="comment-info">';
			str += '<div class="user-name">'+ com.uname +'</div>';
			str += '<div class="commnet-time">'+ com.ctime +'</div>';
			str += '</div></div>';
			str += '<div class="comment-txt">'+com.content+'</div></div>';
			comm_arr.push(str);
		}
		return comm_arr;
	}

	// 获取纯文本值
	function get_text(str){
		return $("<div>"+str+"</div>").text();
	}
	
	// 查看更多推荐
	// $(".recommend-more").click(function(){17452744 17452744
	// 	get_recomend(nid,recomend_page);
	// });

	// 点击推荐
	$(".news-recommend").on("click",".recommend-item",function(e){
		var url = $(this).attr("data-href");
		window.open(url);
		// log.user_action({
		// 	atype:"relateClick",
		// 	from:document.location.href,
		// 	to:url,
		// 	params:{nid:nid},
		// 	effective:true
		// });
	});

	// 下拉更多推荐
	$(window).scroll(function(){
		viewH =$(this).height(),//可见高度  
		contentH = $(document).height(),//内容高度  
		scrollTop =$(this).scrollTop();//滚动高度 
		if(contentH - viewH - scrollTop <=100){
			if(req_data){
				req_data = false;
				get_recomend(nid,recomend_page);
			}
		}
	})
	
	// 广告点击事件统计
	// base.iframeOnClick.track(document.getElementById("gdt-banner"), function() { log.ad_click("6060025218954940");});  
	// base.iframeOnClick.track(document.getElementById("gdt-recom"), function() { log.ad_click("8020224248367894");});  

	// $("#gdt-banner").load(function(){
	// 	base.addDocClickEvt($(this).get(0),function(){
	// 		log.ad_click("6060025218954940")
	// 	});
	// })
	// $("#gdt-recom").load(function(){
	// 	base.addDocClickEvt($(this).get(0),function(){
	// 		log.ad_click("8020224248367894")
	// 	});
	// })
});