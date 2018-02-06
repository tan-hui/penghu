global.log = function(resp)
{
    console.log(resp)
}

global.handler = function(obj, method)
{
    return function(resp, ...args) {
        return method.call(obj, resp, ...args);
    }
}

global.handlerd = function(obj, method, data)
{
    return function(resp, ...args) {
        return method.call(obj, data, resp, ...args);
    }
}

global.handlerds = function(obj, method, data1, data2)
{
    return function(resp, ...args) {
        return method.call(obj, data1, data2, resp, ...args);
    }
}

global.nop = function (a,b,c,d,e,f,g){
    
}