var crypto = require('../utils/crypto');

//账号管理
var AccountsMgr = class AccountsMgr{
    constructor() {
        this.addListener()
    }

    //协议事件监听
    addListener(){
        protocolMgr.addListener(ServerProtocol.S_REGISTER_RESP, handler(this, this.recvRegisterMsg))
        protocolMgr.addListener(ServerProtocol.S_LOGIN_RESP, handler(this, this.recvLoginMsg))
    }

    //接收注册信息
    recvRegisterMsg(socket, data){
        log("recvRegisterMsg:" + JSON.stringify(data))  
    }

    //接收登录信息
    recvLoginMsg(socket, data){
        log("recvLoginMsg:" + JSON.stringify(data))
        var account = data.account
        var password = data.password
        accountDBMgr.loginAccount(account, password, function(data, error) {
            //登录成功失败都要返回客户端
            socketHelper.send(socket, ClientProtocol.C_LOGIN_RESP, {
                error : error, 
            })  
            if (error == 0){ //登录成功后添加在线用户
                usersMgr.addOnlineUser(socket, account)
            }
        })
    }
}

global.accountsMgr = new AccountsMgr()