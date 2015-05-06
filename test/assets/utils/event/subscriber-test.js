buster.spec.expose();

describe("event/subscriber base", function () {
    beforeAll(function () {
        var T = this;
        T.test = {
            attrs: "a:aaa;b:bbb;c:ccc"
        };
        fetch("assets/utils/event/subscriber", function (subscriber) {
            T.subscriber = subscriber(T.test);
        });
    });
    
    it("invert", function () {
        var r = this.subscriber.invert(this.test.attrs.split(";"));
        buster.assert.equals(r[0].name, "a");
        buster.assert.equals(r[0].type, "aaa");
    });
    
    it("invert params error", function () {
        var r = this.subscriber.invert({});
        console.log(r.length);
        buster.assert.isArray(r);
        buster.assert.equals(r.length, 0);
        
        r = this.subscriber.invert([]);
        console.log(r.length);
        buster.assert.isArray(r);
        buster.assert.equals(r.length, 0);
    });
});
