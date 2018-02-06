
var Scene = require('Scene');

var HallScene = cc.Class({
    extends: Scene,   

    start () {
        sceneMgr.setSceneType(SceneType.HALL);
        var hallCtr = uiMgr.create("HallControl");
        hallCtr.show();
    },
        
});
 

