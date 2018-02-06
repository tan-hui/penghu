
var Queue = class Queue {
    //构造函数
    constructor() {
	    this._objects = [];
    }

    //向队列尾部添加一个（或是多个）元素
    enqueue( element ) {
        this._objects.push( element );
    }

    //移除队列的第一个元素，并返回被移除的元素。
    dequeue() {
        if( this.empty() ) 
            return 'This queue is empty';
        else 
            return this._objects.shift();
    }

    //查看队首元素，直接返回数组首个元素即可
    front(){
        if( this.empty() ) 
            return 'This queue is empty';
        else 
            return this._objects[0];
    }

    //查看队首元素，直接返回数组最后一个元素即可
    back() {
        if( this.empty() ) 
            return 'This queue is empty';
        else 
            return this._objects[ this._objects.length - 1 ];
    }


    //我们通过判断 dataStore 的长度就可知道队列是否为空
    empty(){
        return this._objects.length == 0;
    }

    //数组的大小
    size(){
        return this._objects.length;
    }

    //清除数组
    clear(){
        this._objects = [];//清空数组 
    }

    //查看对了所有元素，我这里采用数组的 join 方法实现
    toString(){
        return this._objects.join('\n');
    }
}

global.Queue = Queue;