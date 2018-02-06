var DialogControl = require('DialogControl');

var SettingControl = cc.Class({
    extends: DialogControl,
    properties: {
    },

    onLoad () {
        this._super();
        log("==========SettingControl onLoad===========");  
        this.settingPanel = sceneMgr.instantiatePrefab("settingPanel");
        this.addChild(this.settingPanel);
    },

    start () {
        log("==========SettingControl start==========="); 
        this.backBtn = cc.find("backBtn", this.settingPanel);
        this.backBtn.on(cc.Node.EventType.TOUCH_END, handler(this, this.close)); 
    },

    onDestroy(){
        log("==========SettingControl onDestroy===========");
    },
    
});
