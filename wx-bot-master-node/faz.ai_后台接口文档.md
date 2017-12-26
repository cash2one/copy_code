#faz.ai 后台接口文档

* location: http://60.28.29.47:9000



#### 1. 保存二维码
###### path(type)
* /wx/savesrc(post)

###### params(是否必填)
* _id:对应窗口的二维码ID
* src:登陆页面的二维码路径(true)
* pgv_si:cookie中的对应字段值 (true)

###### callback
	{
		"code":0,
		"info":"请求成功",
		"value":{
			"src":"http://image.jpg",
			"status":"wait",
			"time":"2017-01-16T08:23:35.659Z",
			"wxname":null,
			"pgv_si":"123456",
			"_id":"587c8307611ff013701310ee"
			}
	}
***
#### 2.确认登录
###### path(type)
* /wx/loginsync(post)

###### params
* pgv_si:窗口cookie中对应的值(true)
* name:微信名称(true)
* wxuin:微信页面上唯一标识(true)
* chatGroup:用户聊天群组(false)

###### callback
	{
    	"code": 0,
    	"info": "请求成功",
    	"value": {
    		"_id": "587c8307611ff013701310ee",
    		"src": "http://image.jpg",
    		"status": "wait",
    		"time": "2017-01-16T08:23:35.659Z",
    		"wxname": null,
    		"pgv_si": "123456"
    		}
    }
*** 
#### 3.获取二维码
###### path(type)
* /wx/login(get)

###### params
* null

###### callback
	{
		"code": 0,
		"info": "请求成功",
		"value": {
			"_id": "587c8307611ff013701310ee",
			"src": "http://image.jpg",
			"status": "wait",
			"time": "2017-01-16T08:23:35.659Z",
			"wxname": null,
			"pgv_si": "123456"
		}
	}
***   
#### 4.获取登录状态
###### path(type)
* /wx/status(get)

###### params
* _id:二维码对应的ID(true)

###### callback
	{
    	"code": 0,
    	"info": "请求成功",
    	"value": {
    		"_id": "587c8307611ff013701310ee",
    		"src": "http://image.jpg",
    		"status": "wait",
    		"time": "2017-01-16T08:23:35.659Z",
    		"wxname": null,
    		"pgv_si": "123456"
    		}
    }
***
#### 5.保存用户群组
###### path(type)
* /wx/save/group(post)

###### params
* wxuin:用户的唯一标识(true)
* wxname:用户名称(true)
* groups:用户群组(true) []

###### callback
	{
    	"code": 0,
    	"info": "请求成功",
    	"value": []
    }
***
#### 6.获取用户群组
###### path(type)
* /user/groups(get)

###### params
* wxuin:用户的唯一标识(true)

###### callback
	{
		"code": 0,
		"info": "请求成功",
		"value": [
				{
				"_id": "58a1761b2917eb162bc762b0",
				"wxuin": "207364874",
				"wxname": "小奇",
				"groupname": "测试群",
				"groupsign": "@@4378936aaa9919e588a5cf9518536aa0ad50d427d35d8270405c0053c99c3c78"
				},
				{
				"_id": "58a1761b2917eb162bc762b1",
				"wxuin": "207364874",
				"wxname": "小奇",
				"groupname": "喵喵喵,小奇,心书501号老编辑,米莫福利小鱼酱,",
				"groupsign": "@@e3b133ca532d05461971aaab70690bfe814454e26a681a749d842ff4b6ba72ec"
				},
				{
				"_id": "58a1761b2917eb162bc762bf",
				"wxuin": "207364874",
				"wxname": "小奇",
				"groupname": "晓勇💥victory",
				"groupsign": "@30e7a88e717a9f3ea49602c75852764c"
				}
			]
	}
***
#### 7.发送消息
###### path(type)
* /user/message/send(get)

###### params
* wxuin:用户的唯一标识(true)
* wxname:微信名称(true)
* sendTime:发送时间,(true)
* theme:信息主题,(false)
* targetGroup:目标群组,(true)
* type:信息类型,(true)
* content:信息内容,(true)

###### example
*{"wxname":"xxl","wxuin":"1234567","sendTime":"1487052469129","theme":"test message","targetGroup":[{"name":"test","sign":"@56563154643135846"}],"type":"text","content":"testText"}
###### callback
	{
		"code": 0,
		"info": "请求成功",
		"value": [
				{
				"_id": "58a1761b2917eb162bc762b0",
				"wxuin": "207364874",
				"wxname": "小奇",
				"groupname": "测试群",
				"groupsign": "@@4378936aaa9919e588a5cf9518536aa0ad50d427d35d8270405c0053c99c3c78"
				},
				{
				"_id": "58a1761b2917eb162bc762b1",
				"wxuin": "207364874",
				"wxname": "小奇",
				"groupname": "喵喵喵,小奇,心书501号老编辑,米莫福利小鱼酱,",
				"groupsign": "@@e3b133ca532d05461971aaab70690bfe814454e26a681a749d842ff4b6ba72ec"
				},
				{
				"_id": "58a1761b2917eb162bc762bf",
				"wxuin": "207364874",
				"wxname": "小奇",
				"groupname": "晓勇💥victory",
				"groupsign": "@30e7a88e717a9f3ea49602c75852764c"
				}
			]
	}
***
#### 8.查看消息
###### path(type)
* /user/message/show(get)

###### params
* wxuin:用户的唯一标识(true)
* status:信息状态(true)  /已发送信息('send')/草稿箱('edit')

###### callback
	{
  		"code": 0,
  		"info": "请求成功",
  		"value": [
    		{
      			"_id": "58a4149af6e92613a0cf902e",
      			"wxname": "小小鹿",
      			"wxuin": "947649266",
      			"theme": "test message",
     			"targetGroup": [
        			{
          				"name": "test",
          				"sign": "@56563154643135846"
        			}
      		],
      		"type": "text",
      		"content": "testText",
      		"status": "send",
      		"sendTime": "2017-02-14T06:07:49.129Z",
      		"createTime": "2017-02-15T08:43:06.017Z"
    		}
  		]
	}
***
#### 9.文件上传
###### path(type)
* /user/upload(post-formatData)

###### params
* wxuin:用户的唯一标识(true)
* type:文件类型("image"/"mp3")
* pics:表单文件

###### callback
	{"code":0,"info":"请求成功","value":{"name":"148877007885773.jpeg","src":"123456/image/148877007885773.jpeg"}}
***
#### 10.查看素材
###### path(type)
* /user/files/show(get)

###### params
* wxuin:用户的唯一标识(true)
* type:文件类型("image"/"mp3")

###### callback
	{
	  "code": 0,
	  "info": "请求成功",
	  "value": [
	    {
	      "_id": "58bcda903c7cd807bef04b16",
	      "wxuin": "123456",
	      "path": "123456/image/",
	      "name": "1488771728510967.jpeg",
	      "type": "image"
	    },
	    {
	      "_id": "58bcde3c5a48d208189837f4",
	      "wxuin": "123456",
	      "path": "123456/image/",
	      "name": "1488772668654750.jpeg",
	      "type": "image"
	    }
	  ]
	}
