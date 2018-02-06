
var Player = require("./model/Player")

//游戏数据管理器
class GameMgr{
    constructor() {
        //玩家列表
        this.playerList = new Vector()
        //桌子上牌列表
        this.cardList = new Vector()
        //上一把胜利者
        this.preWinner = 0
        //房间ID
        this.roomid = 0
        //创建时间
        this.createtime = 0

        this.addListener()
    }

    addListener(){
        protocolMgr.addListener(ClientProtocol.C_ROOM_INFO_RESP, handler(this, this.recvRoomInfoMsg))
    }
 
    //获取玩家信息
    getPlayerById(userId){
        for (let i = 0; i < this.playerList.size(); i++) {
            var player = this.playerList.get(i)
            if( player.userId == userId){
                return player;
            }
        }
        return null;
    }


    //请求创建房间
    sendCreateRoomMsg(){
        socket.send(ServerProtocol.S_CREATE_ROOM_RESP, {})
    }

    //请求加入房间
    sendJoinRoomMsg(roomid){
        socket.send(ServerProtocol.S_JOIN_ROOM_RESP, {
            roomid : roomid
        })
    }    

    //请求退出房间
    sendExitRoomMsg(){
        socket.send(ServerProtocol.S_EXIT_ROOM_RESP, {
            roomid : this.roomid
        })
    }

    //接受房间信息
    recvRoomInfoMsg(data){
        //创建用户信息
        
        var player = new Player(1, data.players[0].name, data.players[0].headimg, data.players[0].userid)
        this.playerList.add(player)
        //房间ID
        this.roomid = data.roomid
        //房间创建时间
        this.createtime = data.create_time
        //上一把胜利者(默认随机一个)
        this.preWinner = 0  //Util.Random(0, 4)%4

        var gameCtr = uiMgr.create("GameControl")
        gameCtr.show()
    }

}

window.gameMgr = new GameMgr()