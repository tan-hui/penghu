var UIControl = require('UIControl');

var LoginControl = cc.Class({
    extends: UIControl,
    properties: {
    },

    onLoad () {
        log("==========LoginControl onLoad===========");  
        this.loginPanel = sceneMgr.instantiatePrefab("loginPanel");
        this.addChild(this.loginPanel);
    },

    start () {
        log("==========LoginControl start==========="); 
        this.username = cc.find("Loginbg/usernameEditBox", this.loginPanel).getComponent(cc.EditBox);
        this.password = cc.find("Loginbg/passwordEditBox", this.loginPanel).getComponent(cc.EditBox);
        this.loginBtn = cc.find("Loginbg/LoginBtn", this.loginPanel);
        this.loginBtn.on(cc.Node.EventType.TOUCH_END, handler(this, function(event){
            accountMgr.sendLoginMsg(this.username.string, this.password.string);
        })); 
    },

    onDestroy(){
        log("==========LoginControl onDestroy===========");
    },
    
});
