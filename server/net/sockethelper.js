
var SocketHelper = class SocketHelper{
    constructor() {
  
    }

    init(config){
        if( this.io == null){
            this.io = require("socket.io")(config.CLIENT_PORT)
            this.io.on("connection",handler(this, this.connection))
        }
    }

    connection(socket){
        var clientIp = socket.request.connection.remoteAddress  
        log("========one user connection=========ip:" + clientIp)
        socket.on("notify",handlerd(protocolMgr, protocolMgr.dispatchEvent, socket))
        socket.on("disconnect",function(reason) {
            protocolMgr.dispatchEvent(socket, {
                code : ServerProtocol.S_DISCONNECT_RESP,
                object : reason
            })
        })
    }

    send(socket, code, object){
        log("socket send code:" + code + " object:" + JSON.stringify(object));
        socket.emit('notify', {
            code : code,
            object : object
        })
    }
}

global.socketHelper = new SocketHelper();