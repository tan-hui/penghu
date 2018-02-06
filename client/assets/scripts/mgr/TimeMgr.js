
//时间管理
var TimeMgr = class TimeMgr{
    constructor() {
        this.time = new Date()
    }

    //获取当前服务器时间的秒数
    getTimeSec(){
        var t = this.time.getTime();
        return t;
    }

    //获取当前时间字符串
    getTimeStr(format){
        var s = this.time.toLocaleString();
        return s;
    }

}

window.timeMgr = new TimeMgr()