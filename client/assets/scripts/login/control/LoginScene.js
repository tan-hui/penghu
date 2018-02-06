
var Scene = require('Scene');

var LoginScene = cc.Class({
    extends: Scene,   

    start () {
        socket.connect();
        sceneMgr.setSceneType(SceneType.LOGIN);
        var loginCtr = uiMgr.create("LoginControl");
        loginCtr.show();
    },
        
});


