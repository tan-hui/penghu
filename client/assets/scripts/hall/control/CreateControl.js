// **********************************************************************
// Copyright (C) 2017 The company name
//
// 文件名(FileName):			CreateControl.js
// 作者(Author):				andy.chen
// 创建时间(Data):			2018-02-03
// 模块描述(Description):   创建游戏界面
// **********************************************************************
var UIControl = require('UIControl');

//创建房间
var CreateControl = cc.Class({
    extends: UIControl,
    properties: {
    },

    onLoad () {
        log("==========CreateControl onLoad===========");  
        this.createPanel = sceneMgr.instantiatePrefab("createPanel");
        this.addChild(this.createPanel);     	
    },

    start () {
        log("==========CreateControl start==========="); 
        eventMgr.dispatchEvent("VISIBLE_HALL_CONTROL", false);

        this.createBtn = cc.find("createBtn", this.createPanel);
        this.createBtn.on(cc.Node.EventType.TOUCH_END, handler(this, this.onCreateBtn)); 

        this.backBtn = cc.find("backBtn", this.createPanel);
        this.backBtn.on(cc.Node.EventType.TOUCH_END, handler(this, this.close)); 
    },

    //创建游戏按钮
    onCreateBtn(event){
        gameMgr.sendCreateRoomMsg()
    },   

    onDestroy(){
        log("==========CreateControl onDestroy===========");
        eventMgr.dispatchEvent("VISIBLE_HALL_CONTROL", true);	
    },

});
