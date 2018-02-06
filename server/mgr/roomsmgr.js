var crypto = require('../utils/crypto');
var roomInfo = require('../module/room');

//房间管理
var RoomsMgr = class RoomsMgr{
    constructor() {
        this.roomPool = new Queue()//房间池子队列
        this.roomList = new Vector()//房间列表
        this.addListener()
        this.initRoomPool(100)
    }

    //初始化房间池子
    initRoomPool(num){
        for (let i = 0; i < num; i++){
            var data = {}
            var room = new roomInfo()
            data.roomid = 125300 + i*2
            data.uuid = timeMgr.getTimeSec()
            room.init(data)
            this.roomPool.enqueue(room)
        }
    }

    //协议事件监听
    addListener(){
        protocolMgr.addListener(ServerProtocol.S_CREATE_ROOM_RESP, handler(this, this.recvCreateRoomMsg))
        protocolMgr.addListener(ServerProtocol.S_JOIN_ROOM_RESP, handler(this, this.recvJoinRoomMsg))
    }

    //接收创建房间信息
    recvCreateRoomMsg(socket, data){
        log("recvLoginMsg:" + JSON.stringify(data))
        var userid = socket.userid
        var room = this.roomPool.dequeue()
        if(typeof (room) == "object"){
            var player = usersMgr.getOnlineUserById(userid)
            room.addPlayer(player)
            room.setCreateTime(timeMgr.getTimeStr())
            this.roomList.add(room)
            socketHelper.send(socket, ClientProtocol.C_ROOM_INFO_RESP, room.serialize()); 
        }
        else if(typeof (room) == "string")
            log(room)
    }

    //接收加入房间信息
    recvJoinRoomMsg(socket, data){
        log("recvLoginMsg:" + JSON.stringify(data))
        var roomId = data.roomId
        var userid = socket.userid
    }
}

global.roomsMgr = new RoomsMgr()