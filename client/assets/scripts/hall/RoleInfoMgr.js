
var Role = require('./module/Role');

//UI管理器
class RoleInfoMgr{
    constructor() {
        this.role = new Role();
        this.addListener()
    }

    addListener(){
        protocolMgr.addListener(ClientProtocol.C_USERINFO_RESP, handler(this, this.recvPlayerMsg))
    }

    //接收玩家信息
    recvPlayerMsg(data){
        this.role.init(data)
        eventMgr.dispatchEvent("RECV_PLAYER_MSG", this.role);
    }
}

window.roleInfoMgr = new RoleInfoMgr()