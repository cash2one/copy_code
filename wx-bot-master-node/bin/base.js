var http = require('http');
var querystring = require('querystring');
var host = "localhost",port = 11000;
var controlor = {};
controlor.data_conn = function(domain,url,rqd,callback,type){
	var data = querystring.stringify(rqd);
	console.log(domain,rqd);
	var options = {
	    host: domain||host,
		port: port,
	    path: url,
	    method: type,
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Content-Length': data.length
	    }
	};
	var backData = {};
	backData.code = 200;
	var req = http.request(options, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
	    	backData.value = chunk;
	        callback(backData)
	    });
	    // res.on('end',function(chunk){
	    //     callback(chunk);
	    // })
	});
	req.on("error",function(e){
		backData.code = 500;
		backData.value = e;
		callback(backData);
	});
	req.write(data);
	req.end();
}
controlor.getIPv4 = function(){
	var os = require('os');  
	var IPv4,hostName;
	hostName=os.hostname();  
	// mac
	// var newworks = os.networkInterfaces().en0;
	// ubuntu
	var newworks = os.networkInterfaces().ens4;
	for(var i=0;i<newworks.length;i++){  
	    if(newworks[i].family=='IPv4'){  
	        IPv4=newworks[i].address;  
	    }
	}
	return {IP:IPv4,name:hostName}  
}
module.exports = controlor;