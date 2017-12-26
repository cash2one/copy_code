var User = function(ready){
	var uid = base.get_cookie("qidian_uid");
	if(uid){
		ready(uid,false);
	}else{
		this.sign_in(ready);
	}
}
User.prototype = {
	sign_in:function(ready){
		var path = "/v2/au/sin/g";
		var rqd = {
			utype:2,
			platform:3,
			province:"",
			city:"",
			district:""
		}
		var _this = this;
		base.jsonp_conn(path,rqd,function(data){
			var info = data.data;
			if(data.code==2000){
				_this.uid = info.uid;
				base.set_cookie("qidian_uid",info.uid,700);
				ready(info.uid,true);
			}else{
				console.log(info);
			}
		});
	}
}