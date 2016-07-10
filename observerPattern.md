// ObserversList
function ObserversList() {
    this.handlers = []; // Observers
}

ObserversList.prototype = {
    add : function(obj) {
        this.handlers.push(obj);
    },
    remove : function(obj) {
        for ( var i = 0, len = this.handlers.length; i < len; i++ ) {
            if (this.handlers[i] === obj) {
                this.handlers.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    notify : function() {
        var args = Array.prototype.slice.call(arguments, 0);
        for (var i = 0, len = this.handlers.length; i < len; i++ ) {
            this.handlers[i].update.apply(null, args);
        }
    }
}
function Subject() {
    var observersList = new ObserversList();
    this.addObserver = function addObserver(obs) {
        observersList.add(obs);
    };
    this.removeObserver = function removeObserver(obs) {
        observersList.remove(obs);
    };
    this.fetchData = function fetchData() {
        // dummy data
        var data = {
            apple      : "red",
            strawberry : "red",
            banana     : "yellow"
        };
        observersList.notify(data);
    }
}

// Observers
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


var subject = new Subject();
subject.addObserver(DataUpdated);
subject.fetchData(); // returns "DataUpdated"

subject.addObserver(DataPublished);
subject.fetchData(); // returns "DataUpdated" and "DataPublished"

subject.removeObserver(DataUpdated);
subject.fetchData(); // returns "DataPublished"