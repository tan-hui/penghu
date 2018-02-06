
//资源服配置
exports.res_server = function(){
	return {
		CLIENT_PORT: 3030,
		RES_PATH: "./resources",
		CLIENT_IP: "127.0.0.1",
		VERSION:'1.0.1',
	};
};


//数据库配置
exports.mysql = function () {
	return {
		HOST: '127.0.0.1',
		USER: 'root',
		PSWD: 'root',
		DB: 'penghu',
		PORT: 3306
	}
}

//账号服配置
exports.account_server = function(){
	return {
		CLIENT_PORT: 3080,
		CLIENT_IP: "127.0.0.1",
		VERSION:'1.0.1',
	};
};
