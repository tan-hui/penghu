// **********************************************************************
// Copyright (C) 2018 The company name
//
// 文件名(FileName):			GameControl.js
// 作者(Author):				andy.chen
// 创建时间(Data):			
// 模块描述(Description):    游戏主界面
// **********************************************************************
var UIControl = require('UIControl');

//创建房间
var GameControl = cc.Class({
    extends: UIControl,
    properties: {
    },

    onLoad () {
        log("==========GameControl onLoad===========");  
        this.gamePanel = sceneMgr.instantiatePrefab("gamePanel");
        this.addChild(this.gamePanel);     	
    },

    start () {
        log("==========GameControl start==========="); 
        eventMgr.dispatchEvent("VISIBLE_HALL_CONTROL", false);//隐藏主界面

        this.startBtn = cc.find("StartBtn", this.gamePanel);//开始游戏
        this.startBtn.on(cc.Node.EventType.TOUCH_END, handler(this, this.OnStartBtn)); 

        this.exitBtn = cc.find("ExitBtn", this.gamePanel); //退出
        this.exitBtn.on(cc.Node.EventType.TOUCH_END, handler(this, this.OnExitBtn)); 
    },

    //创建游戏按钮
    OnStartBtn(event){
        
    },   

    //退出
    OnExitBtn(event){

    },

    onDestroy(){
        log("==========GameControl onDestroy===========");
        eventMgr.dispatchEvent("VISIBLE_HALL_CONTROL", true);	
    },

});
