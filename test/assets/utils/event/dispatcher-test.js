buster.spec.expose();

describe("evetn/dispatcher base", function () {
    beforeAll(function () {
        var T = this;
        T.test = {
            attrs: "a:aaa;b:bbb;c:ccc",
            fn: function () {console.log("a;b;c");}
        };
        fetch("assets/utils/event/dispatcher", function (dispatcher) {
            T.dispatcher = dispatcher.eventCenter;
        });
        fetch("assets/utils/event/subscriber", function (subscriber) {
            T.subscriber = subscriber(T.test);
        });
        fetch("assets/utils/event/publish", function (publish) {
//            debugger;
            T.publish = publish(T.test);
        });
    });
    
    it("addEventListener", function () {
        var T = this;
        T.xx = function () {console.log("xx")};
        T.dispatcher.addEventListener("xx", T.xx);
        buster.assert.isArray(T.dispatcher.eventMap.xx);
        buster.assert.isFunction(T.dispatcher.eventMap.xx[0]["handler"]);
        buster.assert.isObject(T.dispatcher.eventMap.xx[0]["target"]);
        buster.assert.isArray(T.dispatcher.eventMap.xx[0]["args"]);
    });
    
    it("removeEventListener", function () {
        var T = this;
        T.dispatcher.removeEventListener("xx");
        buster.assert.isArray(T.dispatcher.eventMap.xx);
        buster.assert.equals(T.dispatcher.eventMap.xx.length, 0);
    });
    
    it("removeEventListener only function", function () {
        var T = this;
        T.dispatcher.removeEventListener("xx", "aa");
        buster.assert.isArray(T.dispatcher.eventMap.xx);
        buster.assert.greater(T.dispatcher.eventMap.xx.length, 0);
        
        T.dispatcher.removeEventListener("xx", T.xx);
        buster.assert.isArray(T.dispatcher.eventMap.xx);
        buster.assert.equals(T.dispatcher.eventMap.xx.length, 0);
    });
});
