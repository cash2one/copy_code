var http = require('http')
var data_request = {};
data_request.post_data = function(post_options,callback){
	var post_req = http.request(post_options, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
			onetimetoken_data = JSON.parse(chunk);
			callback(chunk);			        
	    });
	});
	post_req.write(post_data);
	post_req.end();
}




