
var BrowserWindow = require('electron').BrowserWindow
var app = require('electron').app
// var ipc = require('ipc')
var bytes = require('bytes')
var downloadDir = `${__dirname}/download`

// 获取要运行的机器人类型
var argu = process.argv.slice(2);
var type = argu[argu.length-1];
// 运行窗口
app.on('ready', function(){
	var cwd = process.cwd();
	var win = new BrowserWindow({
		width:2000,
		height:8000,
		resizable: true,
		movable:true,
		center: true,
		show: true,
		frame: true,
		autoHideMenuBar: false,
		titleBarStyle: 'default',
		webPreferences: {
			javascript: true,
			plugins: true,
			nodeIntegration: false,
			webSecurity: false,
			preload: __dirname + '/preload-' + type||"xue" + '.js'
		}
	});
	var urlStr = 'http://wx.qq.com/?lang=zh_CN&t=' + Date.now();
	win.loadURL(urlStr);
	win.webContents.openDevTools();
	win.on('closed', function() {
		app.quit();
	});
})

app.on('window-all-closed', () => {
	
})