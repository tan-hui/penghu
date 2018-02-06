//用户模型
var roomInfo = class roomInfo{
    constructor() {
        this.uuid = 0;
        this.roomid = null;
        this.create_time = "";
        this.players = new Vector();
    }


    init(data){
        this.uuid = data.uuid;
        this.roomid = data.roomid;
        this.create_time = data.create_time == null ? "": data.create_time;
    }

    //设置创建时间
    setCreateTime(time){
        this.create_time = time == null ? "": time;
    }

    //玩家加入房间
    addPlayer(userdata){
        this.players.add(userdata)
    }

    //玩家退出房间
    removePlayer(userid){
        for (let i = 0; i < this.players.size(); i++) {
            var player = this.players.get(i)
            if( player.userid == userid){
                this.players.removeAt(i);
                break;
            }
        }
    }

    //序列号数据
    serialize(){
        var playersInfo = [];
        for (let i = 0; i < this.players.size(); i++) {
            var player = this.players.get(i)
            playersInfo[i] = player.serialize()
        }
        return {
            uuid: this.uuid,
            roomid: this.roomid,
            create_time: this.create_time,
            players: playersInfo
        }
    }    
}

module.exports = roomInfo
