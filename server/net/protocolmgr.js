

var ProtocolMgr = {};
ProtocolMgr.eventType = {};

//根据回调名字，添加一个回调方法
ProtocolMgr.addListener = function(code, func) {
    if(!ProtocolMgr.check("addListener", code, func)){
        return false;
    }      
	var tb = ProtocolMgr.eventType[code];
	if (tb === undefined){
        tb = [];
		ProtocolMgr.eventType[code] = tb;
    }
	tb.push(func);    
}

//根据回调名字，移除对应的一个回调方法
ProtocolMgr.removeListener = function(code, func) {
    if(!ProtocolMgr.check("removeListener", code, func)){
        return false;
    }    
    var tb = ProtocolMgr.eventType[code];
    if (tb === undefined)
        return false;

    var index = tb.indexOf(func);
    if (index !== -1) {
        tb.splice(index, 1);
        return true;
    }
    return false;
}


//检查消息格式是否正常
ProtocolMgr.check = function(opportunity, code, func)
{
	if (code === undefined || typeof code != 'number'){
        log(opportunity + ", code can not be undefined or code is not an number");
		return false;
    }	
	else if (func === undefined){
        log(opportunity + ", code : " + code + ", target can not be undefined");
		return false;
    }	
	else if (func == undefined || typeof func != 'function'){
        log(opportunity + ", code : " + code + ", method can not be undefined or method is not an function");
		return false;
    }
	return true;
}

//执行对应名字的回调方法
ProtocolMgr.dispatchEvent = function(socket, data) 
{
    log('socket recv code:' + data.code + ", data:" + JSON.stringify(data.object));
    var code = data.code;
    var object = data.object;
    var tb = ProtocolMgr.eventType[code];
    if (tb === undefined || tb.length == 0) {
        return false;
    }

    for (let i = 0; i < tb.length; i++) {
        tb[i](socket, object);   
    }
    return true;
}


global.protocolMgr = ProtocolMgr;