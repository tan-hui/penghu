//用户模型
var Role = class Role{
    constructor() {
        this.account = 0;
        this.userid = null;
        this.name = "";
        this.coins = 0;
        this.gems = 0;
        this.sex = 0;
        this.headimg = "";
        this.lv = 0;
        this.exp = 0;
    }

    init(data){
        this.userid = data.userid;
        this.account = data.account;
        this.name = data.name == null ? "": data.name;
        this.coins = data.coins == null ? 0: data.coins;
        this.gems = data.gems == null ? 0: data.gems;
        this.sex = data.sex == null ? 0: data.sex;
        this.headimg = data.headimg == null ? "": data.headimg;
        this.lv = data.lv == null ? 0: data.lv;
        this.exp = data.exp == null ? 0: data.exp;
    }


    serialize(){
        return {
            account: this.account,
            userid: this.userid,
            name: this.name,
            coins: this.coins,
            gems: this.gems,
            sex: this.sex,
            headimg: this.headimg,
            lv: this.lv,
            exp: this.exp,
        }
    }    
}

module.exports = Role;
