
var Socket = class Socket{
    constructor() {
        this.networkMgr = null
    }

    connect(){
        log("Socket:connect() :", serverHost, serverPort)
        if (!cc.sys.isNative && !cc.sys.isBrowser) {
            window.io = require('./socket.io')
        }    
        this.networkMgr = io.connect(serverHost + ":" + serverPort)
        this.networkMgr.on('notify', handler(protocolMgr, protocolMgr.dispatchEvent))
        this.networkMgr.on('connect', function() {
            log("============connect success============")
        })
        this.networkMgr.on("disconnect",function(reason) {
            protocolMgr.dispatchEvent(socket, {
                code : ServerProtocol.S_DISCONNECT_RESP,
                object : reason
            })
        })
        this.networkMgr.on("connect_error",function(error) {
            log("============connect error============")
        })
    }
    
    close(){
        log("Socket:close() :", serverHost, serverPort)
        this.networkMgr.close()
    }

    send(code, object){
        log("socket send code:" + code + " object:" + JSON.stringify(object));
        this.networkMgr.emit('notify', {
            code : code,
            object : object
        })
    }
}

window.socket = new Socket()