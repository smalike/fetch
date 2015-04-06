define("static/js/event", ["static/js/class"], function (fetch, exports, module) {
    
    var Class = fetch("static/js/class");
    
    function Event() {
        
    }
    
    Class.extend(Event, {
        get: function (name) {
            console.log("Event get => " + name);
        }
    });
    
//    Event.prototype.get = function (name) {
//        console.log("Event get => " + name);
//    };
    
    return new Event();
});