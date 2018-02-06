
//UI管理器
class UIMgr{
    constructor() {
        console.log("UIMgr  constructor");
        this.uiControlList = new Vector();
        this.closeEvent = new Vector();
    }

    //创建UIControl面板
    create(uiClassName){
        var uiLayer = new cc.Node("uiLayer");
        return uiLayer.addComponent(uiClassName);
    }

    //打开UI面板
    open(uiControl){
        console.log("UIMgr  Open");
        var root = sceneMgr.getCurScene();
        if(root){
            root.addChild(uiControl.node, ZorderLayer.UIPanel);
            var preControl = this.uiControlList.get(this.uiControlList.size() - 1);
            this.uiControlList.add(uiControl);
            if (preControl && preControl.isAutoHide){
                preControl.setVisible(false);
            }
        }
        else{
            log("UIMgr:Open()  scene data not found root!!!!!!!")
        }
    }

    //关闭UI面板
    close(uiControl){
        console.log("UIMgr  Close");
        //要先从列表里删除
        this.uiControlList.removeData(uiControl);
        //销毁根节点对象
        uiControl.node.destroy();
        //自动显示上一个layer
        var preControl = this.uiControlList.get(this.uiControlList.size() - 1);
        if (preControl && preControl.isAutoHide){
            preControl.setVisible(true);
        }
    }   
    
    //关闭所有UI
    closeAll(){
        for (let i = 0; i < this.uiControlList.size(); i++) {
            const uiControl = this.uiControlList.get(i);
            uiControl.node.destroy(); //销毁
        }
	    this.uiControlList.clear();	
    }

    //隐藏UI
    //skipTop：顶部UILayer是否不隐藏
    hideAll(skipTop){
        var count = self.uiControlList.size() - 1;
        if (skipTop){
            count = count - 1;
        }
        for (let i = 0; i < this.uiControlList.size(); i++) {
            const uiControl = this.uiControlList.get(i);
            uiControl.setVisible(false);
        }
    }

    //恢复UI
    //skipTop：顶部UILayer是否不恢复
    resumeAll(skipTop){
        var count = self.uiControlList.size() - 1;
        if (skipTop){
            count = count - 1;
        }
        for (let i = 0; i < this.uiControlList.size(); i++) {
            const uiControl = this.uiControlList.get(i);
            uiControl.setVisible(true);
        }
    }

    //检测全屏层，隐藏底部的层
    checkFullScreen(){
        var index = -1;
        for (let i = this.uiControlList.size()-1; i >= 0; i--) {
            const uiControl = this.uiControlList.get(i);
            uiControl.setVisible(true);

            if(uiControl.isFullScreen && index == -1){
                index = i;
            }

            if(i >= index){
                uiControl.setVisible(true);
            }else{
                uiControl.setVisible(false);
            }
        }
    }

    //判断是否存在弹窗框
    isExistDialog(){
        for (let i = 0; i < this.uiControlList.size(); i++) {
            const uiControl = this.uiControlList.get(i);
            if (!uiControl.isFullScreen){
                return true;
            }
        }
        return false;
    }
}

window.uiMgr = new UIMgr();