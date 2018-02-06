var crypto = require('../utils/crypto');
var sqlClient = require('../utils/sqlclient');

//用户管理
var UserDBMgr = class UserDBMgr{
    //判断用户是否存在
    isUserExist(account, callback){
        callback = callback == null ? nop:callback;
        if(account == null){
            return callback(false);
        }
        var sql = 'SELECT userid FROM t_users WHERE account = "' + account + '"';
        sqlClient.query(sql, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            if(rows.length == 0){
                return callback(false);
            }
            callback(true);
        });  
    };

    //创建用户
    createUser(data, callback){
        callback = callback == null? nop:callback;
        if(data.account == null || data.name == null || data.coins==null || data.gems==null){
            callback(false);
            return;
        }
        if(data.headimg){
            data.headimg = '"' + data.headimg + '"';
        }
        else{
            data.headimg = 'null';
        }
        data.name = crypto.toBase64(data.name);
        var sql = 'INSERT INTO t_users(account,name,coins,gems,sex,headimg) VALUES("{0}","{1}",{2},{3},{4},"{5}")';
        sql = sql.format(data.account, data.name, data.coins, data.gems, data.sex, data.headimg);
        console.log(sql);
        sqlClient.query(sql, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            callback(true);
        });
    };

    getUserInfo(account,callback){
        callback = callback == null? nop:callback;
        if(account == null){
            return callback(null);
        }

        var sql = 'SELECT userid,account,name,lv,exp,coins,gems,roomid FROM t_users WHERE account = "' + account + '"';
        sqlClient.query(sql, function(err, rows, fields) {
            if (err) {
                callback(null);
                throw err;
            }
    
            if(rows.length == 0){
                return callback(null);
            }
            rows[0].name = crypto.fromBase64(rows[0].name);
            callback(rows[0]);
        });
    };
    
    //更新用户信息
    updateUserInfo(userid, name, headimg, sex, callback){
        callback = callback == null? nop:callback;
        if(userid == null){
            callback(null);
            return;
        }
     
        if(headimg){
            headimg = '"' + headimg + '"';
        }
        else{
            headimg = 'null';
        }
        name = crypto.toBase64(name);
        var sql = 'UPDATE t_users SET name="{0}",headimg={1},sex={2} WHERE account="{3}"';
        sql = sql.format(name,headimg,sex,userid);
        console.log(sql);
        sqlClient.query(sql, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    };

}

global.userDBMgr = new UserDBMgr()