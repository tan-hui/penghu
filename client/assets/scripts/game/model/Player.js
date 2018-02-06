

//游戏数据模型
var Player = class Player{
    constructor(index, name, icon, userid) {
        //索引、玩家Id
        this.index = index
        //
        this.userId = userid
        //名称
        this.name = name
        //头像
        this.icon = icon
        //胡息
        this.huxi = 0
        //总胡息
        this.totalHuxi = 0
        //是否是庄家
        this.isbanker = false 
        //碰牌类型(碰3哈、碰四清、)
        this.pengType = PengType.Null
        //胡牌类型(平胡、碰胡、扫胡、大三连胡、扫大三连胡、四清连胡、扫四清连胡、跑起连胡、提龙连胡、五福、双龙、七小对、地胡、天胡)
        this.huType = HuType.Ping
        //状态(默认等待)
        this.state = PlayerState.Wait
        //手上抓的牌[14张牌值]
        this.faArray = new Vector() 
        //吃、碰、扫、提的牌 {type,1,1,11,0,src},{type,2,2,2,0,src},{type,6,6,6,6,src}
        this.cpstPaiArray = new Vector()
        //手上出的牌 1,5,7,9,3,2,6
        this.chuPaiArray = new Vector()
        //上家Id
        this.preIndex = index - 1 >= 1 ? index - 1 : 4
        //下家Id
        this.nextIndex = index + 1 <= 4 ? index + 1 : 1
    }


    //增加或者减少胡息
    AddHuXi(value){
        this.huxi = this.huxi + value
        this.totalHuxi = this.totalHuxi + value
    }

    //添加一张手牌
    AddCard(value){
        this.faArray.add(value)
    }

    //移除一张手牌
    RemoveCard(value){
        var index = this.faArray.find(value)
        if (index >= 0){
            this.faArray.removeAt(index)
            return true
        }
        return false
    }

    //添加一组吃、碰、扫、提
    //param：cards表示一组牌型{CardsType.Sao,2,2,2,}
    AddCPGWCard(cards){
        if (cards.length >= 4)
        {
            this.cpstPaiArray.add(cards)
        }   
    }

    //获取跑、提牌的数量
    GetPaoCardsNum(){
        var num = 0
        for (let i = 0; i < this.cpstPaiArray.size(); i++) {
            var cards = this.cpstPaiArray.get(i)
            if (cards[0] == CardsType.Pao || cards[0] == CardsType.Ti){
                num = num + 1
            }
        }
        return num  
    }

    //获取是否3碰、4清、5福
    GetPengCardsNum(){
        for (let i = 0; i < this.cpstPaiArray.size(); i++) {
            var cards = this.cpstPaiArray.get(i)
            if (cards[0] == CardsType.Pao || cards[0] == CardsType.Ti
            ||cards[0] == CardsType.Peng || cards[0] == CardsType.Sao){
                num = num + 1
            }
        }
        return num  
    }


    //添加一张手上出的牌
    //param：card表示出的牌值
    AddChuCard(value){
        this.chuPaiArray.add(value)
    }

    //查找手上出的牌
    FindChuCard(value){
        var index = this.chuPaiArray.find(value)
        if (index >= 0){
            return true
        }
        return false
    }

    //移除一张手上出的牌
    RemoveChuCard(value){
        var index = this.chuPaiArray.find(value)
        if (index >= 0)
        {
            this.chuPaiArray.removeAt(index)
            return true
        }
        return false
    }

    //设置玩家状态
    SetState(state){
        this.state = state
    }

    //设置庄家
    SetBanker(isbanker){
        this.isbanker = isbanker
    }

    // /**
    // * 牌型转换 
    // * size=21 ,0是无效的. 索引就是牌的值
    // * 数组对应索引出对应的值就是牌的数量 
    // */
    CradTransform(){
        //转换格式为：
        //{0, 2, 3, 3, 1, 1, 2, 0, 3, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0}
        // 2张二、3张三、3张四、1张五、1张六、2张七、3张九、1张十、3张叁这些牌
        var tempPaiArray = new Vector()
        for (let i = 0; i <= 21; i++) {
            tempPaiArray.add(0)   
        }
    
        for (let i = 0; i < this.faArray.size(); i++) {
            var value = this.faArray.get(i)
            tempPaiArray.set(value, tempPaiArray.get(value) + 1)
        }
        return tempPaiArray
    }

    // /**
    // * 整理扫、提、的牌型
    // * @param cardIndex
    // */
    TrimInitSTCard(){
        var tempArray = []
        var tempPaiArray = this.CradTransform()
        for (let i = 1; i < tempPaiArray.size(); i++) {
            var value = tempPaiArray.get(i)
            if (value == 3){
                tempArray[tempArray.length] = [CardsType.Sao,i,i,i,0,this.index]
            }
            else if(value == 4){
                tempArray[tempArray.length] = [CardsType.Ti,i,i,i,i,this.index] 
            }            
        }

        //添加吃、碰、扫、提
        for (const key in tempArray) {
            const cards = tempArray[key]
            this.AddCPGWCard(cards)
            for (let i = 1; i < 5; i++) {
                if (cards[i] != 0){
                    this.RemoveCard(cards[j])  
                }     
            }
        }
    }

    //清除数据
    Clear(){
        //清除系统开始发的牌
        this.faArray.clear()
        //清除吃、碰、扫、提的牌
        this.cpstPaiArray.clear()
        //清除手上出的牌
        this.chuPaiArray.clear()
        //清除庄家状态
        this.isbanker = false  
        //清除胡息
        this.huxi = 0
        //状态(默认等待)
        this.state = PlayerState.Wait
        //碰牌类型(碰3哈、碰四清、)
        this.pengType = PengType.Null
        //胡牌类型(平胡、碰胡、扫胡、大三连胡、扫大三连胡、四清连胡、扫四清连胡、跑起连胡、提龙连胡、五福、双龙、七小对、地胡、天胡)
        this.huType = HuType.Ping      
    }  

}

module.exports = Player;