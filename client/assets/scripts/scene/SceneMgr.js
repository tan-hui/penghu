
class SceneMgr{
    constructor() {
        this.sceneType = null; 
    }

    setSceneType(sceneType){
        this.sceneType = sceneType;
    }

    //切换场景
    switchScene(sceneType){
        this.setSceneType(sceneType);
        if (sceneType === SceneType.LOGIN){
            cc.director.loadScene("loginScene.fire"); 
        }
        else if(sceneType === SceneType.HALL){
            cc.director.loadScene("hallScene.fire"); 
        } 
    }  

    //获取当前场景
    getCurScene(){
        var canvas = cc.find("Canvas");
        if (this.sceneType === SceneType.LOGIN){
            return canvas.getComponent("LoginScene");
        }else if(this.sceneType === SceneType.HALL){
            return canvas.getComponent("HallScene");
        } 
        return undefined;
    }
    
    //实例化预制体
    instantiatePrefab(prefabName){
        var curScene = this.getCurScene();
        var object = curScene.getPrefab(prefabName);
        if (object){
            return cc.instantiate(object);
        }
        return undefined;
    }
}


window.sceneMgr = new SceneMgr();