
var UIControl = require('UIControl');

var DialogControl = cc.Class({
    extends: UIControl,   
    properties: { 
    },

    ctor(){
        this.isFullScreen = false;	//是否是全屏UI
        this.isTransparent = true; 	//是否是半透明UI
        this.isSwallow = false;  //是否吞并事件
    },

    onLoad () {
        log("DialogControl onLoad"); 
        var size = cc.director.getVisibleSize();
        var sprite = this.node.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/block.png'));
        this.node.setContentSize(size.width, size.height);
        this.node.setCascadeOpacityEnabled(false);
        this.node.color = new cc.Color(0, 0, 0);
        this.node.opacity = 150;
        this.touchBeganHandler = handler(this, this.touchBegan);
        this.swallowTouches(true);
    },

    //开始点击事件
    touchBegan(event){
        return this.isSwallow;
    },

    //设置背景透明度
    set0pacity(opacity){
        this.node.opacity = opacity; 
    },

    //设置是否吞并事件
    swallowTouches(isSwallow){
        this.isSwallow = isSwallow;
        if(isSwallow){
            this.node.on(cc.Node.EventType.TOUCH_START, this.touchBeganHandler);
        }else{
            this.node.off(cc.Node.EventType.TOUCH_START, this.touchBeganHandler, this); 
        }
    },

});

module.exports = DialogControl;