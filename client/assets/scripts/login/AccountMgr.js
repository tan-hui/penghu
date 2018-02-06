
//UI管理器
class AccountMgr{
    constructor() {
        this.addListener()
    }

    addListener(){
        protocolMgr.addListener(ClientProtocol.C_LOGIN_RESP, handler(this, this.recvLoginMsg))
    }

    //请求玩家登录
    sendLoginMsg(account, password){
        socket.send(ServerProtocol.S_LOGIN_RESP, {
            account: account,
            password: password
        })
    }

    //接收玩家登录信息
    recvLoginMsg(data){
        if(data.error == 0){
            sceneMgr.switchScene(SceneType.HALL);     
        }else if(data.error == -1){ //用户不存在
            log("用户不存在")
        }else if(data.error == -2){ //密码错误
            log("密码错误")
        }else if(data.error == -3){ //用户名和密码不能为空
            log("用户名和密码不能为空")
        }
    }
}

window.accountMgr = new AccountMgr()