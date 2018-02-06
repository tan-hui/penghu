var crypto = require('../utils/crypto');
var sqlClient = require('../utils/sqlclient');

//房间管理
var RoomDBMgr = class RoomDBMgr{
    //判断房间是否存在
    isRoomExist(roomId, callback){
        callback = callback == null? nop:callback;
        if(account == null){
            return callback(false);
        }
        var sql = 'SELECT * FROM t_rooms WHERE id = "' + roomId + '"';
        sqlClient.query(sql, function(err, rows, fields) {
            if(err){
                callback(false);
                throw err;
            }
            else{
                callback(rows.length > 0);
            }
        });  
    };



    //创建房间
    createAccount(callback){
        callback = callback == null? nop:callback;
        if(account == null || password == null){
            return callback(false);
        }

        var psw = password; //crypto.md5(password);
        var sql = 'INSERT INTO t_accounts(account,password) VALUES("' + account + '","' + psw + '")';
        sqlClient.query(sql, function(err, rows, fields) {
            if (err) {
                if(err.code == 'ER_DUP_ENTRY'){
                    callback(false);
                    return;         
                }
                callback(false);
                throw err;
            }
            else{
                callback(true);            
            }
        });
    }; 
    
    //登录账号
    loginAccount(account, password, callback){
        callback = callback == null? nop:callback;
        if(account == null || password == null){
            return callback(null, -3);//用户名和密码不能为空
        }
        var sql = 'SELECT * FROM t_accounts WHERE account = "' + account + '"';
        sqlClient.query(sql, function(err, rows, fields) {
            if (err) {
                callback(null, -4);//未知错误
                throw err;
            }
            if(rows.length == 0){
                return callback(null, -1); //找不到用户
            }

            if(password != null){
                var psw = password;//crypto.md5(password);
                if(rows[0].password != psw){
                    return callback(null, -2); //密码错误
                }    
            }
            callback(rows[0], 0); //登录成功
        });
    }; 
}

global.roomDBMgr = new RoomDBMgr()