window.log = function(resp)
{
    console.log(resp)
}

window.handler = function(obj, method)
{
    return function(resp, ...args) {
        return method.call(obj, resp, ...args);
    }
}

window.handlerd = function(obj, method, data)
{
    return function(resp, ...args) {
        return method.call(obj, data, resp, ...args);
    }
}

window.handlerds = function(obj, method, data1, data2)
{
    return function(resp, ...args) {
        return method.call(obj, data1, data2, resp, ...args);
    }
}