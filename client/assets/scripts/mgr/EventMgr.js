

var EventMgr = {};
EventMgr.eventType = {};

//根据回调名字，添加一个回调方法
EventMgr.addListener = function(name, func) {
	var tb = EventMgr.eventType[name];
	if (tb === undefined){
        tb = [];
		EventMgr.eventType[name] = tb;
    }
	tb.push(func);    
}

//根据回调名字，移除对应的一个回调方法
EventMgr.removeListener = function(name, func) {
    var tb = EventMgr.eventType[name];
    if (tb === undefined)
        return false;

    var index = tb.indexOf(func);
    if (index !== -1) {
        tb.splice(index, 1);
        return true;
    }
    return false;
}

//执行对应名字的回调方法
EventMgr.dispatchEvent = function(name,resp,...args) {
    var tb = EventMgr.eventType[name];
    if (tb === undefined || tb.length == 0) {
        return false;
    }

    for (let i = 0; i < tb.length; i++) {
        tb[i](resp,...args);   
    }
    return true;
}


window.eventMgr = EventMgr;