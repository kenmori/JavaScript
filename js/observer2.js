// オブザーバを格納する配列を準備します
function ObserverList()  {
    this.observerList = [];
}

ObserverList.prototype = {
    add : function(obj){
        return this.observerList.push(obj);
    },

    count : function(){
        return this.observerList.length;
    },

    get : function(index){
        if (index > -1 && index < this.observerList.length){
            return this.observerList[index];
        }
    },

    indexOf : function(obj, startIndex){
        var i = startIndex;

        while( i < this.observerList.length ){
            if (this.observerList[i] === obj){
                return i;
            }
            i++;
        }
        return -1;
    },

    removeAt : function(index){
        this.observerList.splice(index, 1);
    }
}


function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype = {

    addObserver : function(observer){
        this.observers.add( observer );
    },

    removeObserver : function(observer){
        this.observers.removeAt(this.observers.indexOf(observer));
    },

    notify : function(context){
        var observerCount = this.observers.count();
        for(var i = 0; i < observerCount; i++){
            this.observers.update(context);
        }
    }
}

var DataUpdated = {
    update : function() {
        console.log("DataUpdated");
    }
};

var DataPublished = {
    update : function() {
        console.log("DataPublished");
    }
};


function Observer(){
    this.update = function(){
        console.log("Observer.update()");
    };

    this.publish = function(){
        console.log("Observer.publish()");
    };
}

var subject = new Subject();

subject.addObserver(ObserverUpdate);
subject.notify();

subject.addObserver(ObserverPublish);
subject.notify();

subject.removeObserver(ObserverUpdate);
subject.notify();