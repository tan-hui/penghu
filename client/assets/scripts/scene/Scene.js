

var Scene = cc.Class({
    extends: cc.Component,   
    properties: { 
        prefabs: [cc.Prefab], 
    },

    ctor(){
        this.canvas = undefined;  //画布
        this.sceneType = undefined; //场景类型
        this.uiLayerList = []; //层列表
        this.self = this;
    },

    onLoad () { 
        for (var key in ZorderLayer) {
            var v = ZorderLayer[key];
            var layer = new cc.Node(key);
            layer.parent = this.node;
            layer.setPosition(0,0);
            layer.setLocalZOrder(v);
            this.uiLayerList[v] = layer;
        }
        this.addLuarnnerView();
    },


    start () {
        // var node = new cc.Node('Sprite');
        // node.parent = this.node;
        // var sprite = node.addComponent(cc.Sprite);
        // sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/game_setting_bg.png'));

        // var button = node.addComponent(cc.Button);  
        // button.transition = cc.Button.Transition.SCALE;
        // node.on(cc.Node.EventType.TOUCH_END, handler(this, this.onTestBtn));
    },

    //添加子节点
    addChild(uiControl, zOrder){
        var layer = this.uiLayerList[zOrder];
        uiControl.parent = layer;
    },

    //获取预制体
    getPrefab(name){
        for (let i = 0; i < this.prefabs.length; i++) {
            const prefab = this.prefabs[i];
            if (prefab.name === name){
                return prefab;
            }
        }
        return undefined;
    },
    

    //添加luarnner测试
    addLuarnnerView(){
        if (LUARNNER_DEBUG === 1)
        {
            var size = cc.director.getVisibleSize();
            var btn = new cc.Node('blockBtn');
            var sprite = btn.addComponent(cc.Sprite);
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/block.png'));
            btn.opacity = 100;
            btn.rotation = 45;
            btn.setPosition(-size.width/2, size.height/2);
            btn.setContentSize(70, 70);
            this.addChild(btn, ZorderLayer.Luarnner);

            var button = btn.addComponent(cc.Button);  
            button.transition = cc.Button.Transition.COLOR;
            btn.on(cc.Node.EventType.TOUCH_END, function(event){
                require("../testtool/JsRunner").runTest()
            });
        }
    },
        
});

module.exports = Scene;


