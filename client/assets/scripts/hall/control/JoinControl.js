// **********************************************************************
// Copyright (C) 2017 The company name
//
// 文件名(FileName):			JoinControl.lua
// 作者(Author):				andy.chen
// 创建时间(Data):			2018-02-03
// 模块描述(Description):   加入游戏界面
// **********************************************************************
var UIControl = require('UIControl');

//加入房间
var JoinControl = cc.Class({
    extends: UIControl,
    properties: {
    },

    onLoad () {
        log("==========JoinControl onLoad===========");  
        this.joinPanel = sceneMgr.instantiatePrefab("joinPanel");
        this.addChild(this.joinPanel);  
    },

    start () {
        log("==========JoinControl start==========="); 
        eventMgr.dispatchEvent("VISIBLE_HALL_CONTROL", false);	

        this.backBtn = cc.find("backBtn", this.joinPanel);
        this.backBtn.on(cc.Node.EventType.TOUCH_END, handler(this, this.close)); 
    },

    onDestroy(){
        log("==========JoinControl onDestroy===========");
        eventMgr.dispatchEvent("VISIBLE_HALL_CONTROL", true);	
    },

});
