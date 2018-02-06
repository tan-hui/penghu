// **********************************************************************
// Copyright (C) 2017 The company name
//
// 文件名(FileName):			HallControl.js
// 作者(Author):				andy.chen
// 创建时间(Data):			2018-02-03
// 模块描述(Description):    主界面
// **********************************************************************
var UIControl = require('UIControl');

var HallControl = cc.Class({
    extends: UIControl,
    properties: {
    },

    onLoad () {
        log("==========HallControl onLoad===========");  
        this.hallPanel = sceneMgr.instantiatePrefab("hallPanel");
        this.addChild(this.hallPanel);

        this.registerEventScript();
    },

    start () {
        log("==========HallControl start==========="); 
        this.operPanel = cc.find("OperPanel", this.hallPanel);
        this.nameText = cc.find("HeadImage/NameText", this.operPanel).getComponent(cc.Label)
        this.idText = cc.find("HeadImage/IdText", this.operPanel).getComponent(cc.Label)
        
        this.createBtn = cc.find("OperPanel/CreateBtn", this.hallPanel);
        this.createBtn.on(cc.Node.EventType.TOUCH_END, function(event){
             var createCtr = uiMgr.create("CreateControl");
             createCtr.show(); 
        }); 

        this.joinBtn = cc.find("OperPanel/JoinBtn", this.hallPanel);
        this.joinBtn.on(cc.Node.EventType.TOUCH_END, function(event){
             var joinCtr = uiMgr.create("JoinControl");   
             joinCtr.show(); 
        });        

        this.setingBtn = cc.find("OperPanel/SetingBtn", this.hallPanel);
        this.setingBtn.on(cc.Node.EventType.TOUCH_END, function(event){
             var settingCtr = uiMgr.create("SettingControl");   
             settingCtr.show(); 
        }); 

        this.updatePlayerMsg(roleInfoMgr.role)
    },

    //是否可见大厅
    visibleHallView(isVisible){
        this.operPanel.active = isVisible;
    },

    //更新用户数据信息
    updatePlayerMsg(data){
        this.nameText.string = data.name
        this.idText.string = Language.getText("hall_role_id", data.userid)
    },

    //事件消息注册
    registerEventScript(){
        this.visibleHallViewHandlerID = handler(this, this.visibleHallView);
        eventMgr.addListener("VISIBLE_HALL_CONTROL", this.visibleHallViewHandlerID);
        
        this.updatePlayerMsgHandlerID = handler(this, this.updatePlayerMsg);
        eventMgr.addListener("RECV_PLAYER_MSG", this.updatePlayerMsgHandlerID);
    },


    onDestroy(){
        log("==========HallControl onDestroy===========");
        eventMgr.removeListener("VISIBLE_HALL_CONTROL", this.visibleHallViewHandlerID)
        eventMgr.removeListener("RECV_PLAYER_MSG", this.updatePlayerMsgHandlerID);			
    },

});
