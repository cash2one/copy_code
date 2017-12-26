// 统一返回数据格式
var RestResult = function(){
	this.code = RestResult.NO_ERROR;
	this.info = RestResult.NO_ERROR_INFO;
	this.value = {};
}

// 错误信息号
RestResult.NO_ERROR = 0;					// 无任何错误
RestResult.BUSINIESS_ERROR_CODE= 2 			// 业务错误
RestResult.SOURCE_ERROR_CODE= 1 			// 资源错误
RestResult.AUTH_ERROR_CODE = 3 				// 认证错误
RestResult.SERVER_EXCEPTION_ERROR_CODE = 5	// 服务器未知错误
RestResult.TARGET_NOT_EXIT_ERROR_CODE = 6 	// 目标不存在错误


// 错误信息描述
RestResult.BUSINIESS_ERROR_INFO = '数据逻辑异常';
RestResult.SOURCE_ERROR_INFO = '资源错误';
RestResult.SERVER_EXCEPTION_ERROR_INFO = '服务器异常';
RestResult.TARGET_NOT_EXIT_ERROR_INFO = '请求参数异常';
RestResult.AUTH_ERROR_INFO = '验证失败';
RestResult.NO_ERROR_INFO = '请求成功';
module.exports = RestResult;