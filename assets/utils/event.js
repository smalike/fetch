define("assets/utils/event", ["assets/utils/class"], function (fetch, exports, module) {
    
    var Class = fetch("assets/utils/class");
    
    function Event() {
        
    }
    
    Event = Class.extend(Event.prototype, {
        get: function (name) {
            console.log("Event get => " + name);
        }
    });
    
    return new Event();
});
