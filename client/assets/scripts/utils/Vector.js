
var Vector = class Vector {
    //构造函数
    constructor() {
	    this._objects = new Array();
    }

    //添加一个对象
    add(object){
        if (object == undefined)
            return;
        this._objects.push(object);           
    }

    //添加vector的对象
    addAll(objects){
        if (objects == undefined)
            return;
        for (let i = 0; i < objects.size(); i++) {
            this.add(objects[i]);
        }       
    }

    //插入一个对象
    insert(index, object){
        this._objects.splice(index, 0, object); 
    }

    //修改一个对象
    set(index, object){
        if (typeof index !== 'number'){
            return;
        }

        if (index < this._objects.length){
            this._objects[index] = object;
        }else{
            this.add(object);
        }
    }


    //获取索引的对象
    get(index){
        return this._objects[index];
    }

    //是否包含
    contains(data){
        var i = this._objects.length;  
        while (i--) {  
            if (this._objects[i] === obj) {  
                return true;  
            }  
        }  
        return false;  
    }

    //排序
    sort(compare){
        if (typeof compare !== 'function'){
            return;
        }
        this._objects.sort(compare);
    }

    //通过索引移除对象
    removeAt(index){
        this._objects.splice(index, 1);
    }

    //移除对象
    removeData(data){
        var index = this._objects.indexOf(data);
        if (index !== -1) {
            this._objects.splice(index, 1);
        }
    }

    //查找元素，返回所在位置，找不到则返回-1
    find(data){
        return this._objects.indexOf(data);
    }

    //移除一组对象数据
    removeAll(datas){
        if(datas !== undefined || datas.size() <= 0){
            return ;
        }        

        var size = this._objects.length - 1;
        for (let i = size; i <= 0; i--) {
            var isExist = datas.contains(this._objects[i])
            if (isExist){
                this.removeAt(i);
            }
        }
    }

    //数组的大小
    size(){
        return this._objects.length;
    }

    //清除数组
    clear(){
        this._objects.splice(0,this._objects.length);//清空数组 
    }

    //
    tostring(){
        console.log("------------Tostring------------");
    }
}

window.Vector = Vector;