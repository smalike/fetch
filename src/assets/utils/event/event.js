define("utils/event/event", function (fetch, exports, module) {
    
    var Event = {
        addEventListener: function (element, type, listener, capture) {
            if (element.addEventListener) {
                element.addEventListener(type, listener, ~~capture);
            } else {
                element.attachEvent("on" + type, function (e) {
                    listener.call(element, e);
                });
            }
        },
        removeEventListener: function (element, type, listener, capture) {
            if (element.removeEventListener) {
                element.removeEventListener(type, listener, ~~capture);
            } else {
                element.detachEvent(type, listener);
            }
        }
    };
    return Event;
});
