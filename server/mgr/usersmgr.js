var crypto = require('../utils/crypto');
var playerInfo = require('../module/player');

//用户管理
var UsersMgr = class UsersMgr{
    constructor() {
        this.playerUsers = new Vector();//玩家用户信息列表
        this.addListener();
    }

    //协议事件监听
    addListener(){
        protocolMgr.addListener(ServerProtocol.S_DISCONNECT_RESP, handler(this, this.recvDisconnectMsg))
    }

    //判断用户是否在线
    getOnlineUserByAccount(account){
        for (let i = 0; i < this.playerUsers.size(); i++) {
            var player = this.playerUsers.get(i)
            if( player.account == account){
                return player;
            }
        }
        return null;
    }

     //判断用户是否在线
     getOnlineUserById(userid){
        for (let i = 0; i < this.playerUsers.size(); i++) {
            var player = this.playerUsers.get(i)
            if( player.userid == userid){
                return player;
            }
        }
        return null;
    }

    //添加登录在线用户
    addOnlineUser(socket, account){
        if(this.getOnlineUserByAccount(account) == null){
            userDBMgr.getUserInfo(account,handler(this,function(data) {
                if(data){//用户数据存在
                    var player = new playerInfo();
                    data.socket = socket;
                    player.init(data);
                    data.socket.userid = player.userid;
                    this.playerUsers.add(player);
                    this.sendUserInfo(player);
                }
                else{//创建一个默认的用户信息
                    var data = {};
                    var player = new playerInfo();
                    data.socket = socket;
                    data.account = account;
                    data.name = "晓强";
                    player.init(data);
                    userDBMgr.createUser(player,function(result){
                        data.socket.userid = player.userid;
                    });
                    this.playerUsers.add(player);
                    this.sendUserInfo(player);
                }
            }))
        }
    }

    //移除在线用户
    removeOnlineUser(socket){
        for (let i = 0; i < this.playerUsers.size(); i++) {
            var player = this.playerUsers.get(i)
            if( player.socket == socket){
                this.playerUsers.removeAt(i);
                break;
            }
        }
    }

    //发送用户信息
    sendUserInfo(player){
        socketHelper.send(player.socket, ClientProtocol.C_USERINFO_RESP, player.serialize()); 
    }

    //用户断开连接
    recvDisconnectMsg(socket, data){
        this.removeOnlineUser(socket);
    }
}

global.usersMgr = new UsersMgr()