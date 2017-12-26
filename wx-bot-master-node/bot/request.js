var server_address = 'https://60.28.29.47:9001';
var urls = {
	// 获取新闻列表
	getnews:'http://121.40.34.56/news/baijia/fetchRelate',
	// 获取今日热点
	getHots:'http://bdp.deeporiginalx.com/v2/ns/fed/rn?cid=1&tcr='+new Date().getTime()+'&uid=14943912&t=1',
	// QA互动
	getAnswer:"http://121.40.34.56/news/baijia/fetchQuestion",
	// 获取自定义答案
	getMyine:"http://192.168.199.198:8383/get/answer",
	// 生成短连接
	// getShortUrl:"https://api.weibo.com/2/short_url/shorten.json",
	getShortUrl:'http://qqurl.com/create/?',
	// 关键词
	trigger_keywork:'今日热点',
	// 保存二维码路径
	savesrc: server_address + "/wx/savesrc",
	// 登陆确认
	loginsync: server_address + '/wx/loginsync',
	// 保存所有群组
	savegroup: server_address + '/wx/save/group',
	// 保存关联群组信息
	saverelate: server_address + '/wx/saverelate',
	// 取消关联群组信息
	delrelate: server_address + '/wx/delrelate',
	// 获取关联群组信息
	getrelate: server_address + '/wx/getrelate',
	// 保存关联热点信息
	savehotrelate: server_address + '/wx/savehotrelate',
	// 取消关联热点信息
	delhotrelate: server_address + '/wx/delhotrelate',
	// 获取关联热点信息
	gethotrelate: server_address + '/wx/gethotrelate',
	// 获取待发送信息
	getmessage: server_address + '/wx/message',
	// 关联用户群
	relate:"/-relate",
	// 取消关联用户群
	unrelate:"/-unrelate",
	// 关联热点
	hotRelate:'/-hotRelate',
	// 取消关联热点
	unhotRelate:'/-unhotRelate',
	// 定时发送时间
	msgSendTime:{h:12,m:00,s:0},
	// 定时发送目标群
	targetGroup:['测试群']
}

module.exports = urls;