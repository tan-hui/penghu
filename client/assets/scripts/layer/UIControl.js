
var UIControl = cc.Class({
    extends: cc.Component,   
    properties: { 
        prefabs: [cc.Prefab], 
    },

    ctor(){
        this.self = this;
        this.canvas = cc.find("Canvas"); //画布
        this.isFullScreen = true;	//是否是全屏UI
	    this.isTransparent = false; //是否是半透明UI	
        this.isAutoHide = false; //是否在有新弹窗时隐藏  
        this.scene = sceneMgr.getCurScene();
    },
    

    //显示
    show(){
        uiMgr.open(this);
    },

    //关闭
    close(){
        uiMgr.close(this);
    },

    //添加子节点
    addChild(node, zOrder){
        node.parent = this.node;
        if(zOrder){
            node.setLocalZOrder(zOrder);
        }  
    },

    //设置是否在有新弹窗时隐藏
    setAutoHide(autoHide){
        this.isAutoHide = autoHide;
    },

    //设置隐藏
    setVisible(visible){
        this.node.setVisible(visible);
    },
});

module.exports = UIControl;

