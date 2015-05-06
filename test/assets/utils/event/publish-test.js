buster.spec.expose();

describe("event/publish base", function () {
    beforeAll(function () {
        var T = this;
        T.test = {
            attrs: "a:aaa;b:bbb;c:ccc"
        };
        fetch("assets/utils/event/publish", function (publish) {
//            debugger;
            T.publish = publish(T.test);
        });
    });
    
    it("invert", function () {
        var r = this.publish.invert(this.test.attrs.split(";"));
        buster.assert.equals(r[0].name, "a");
        buster.assert.equals(r[0].type, "aaa");
    });
    
    it("invert params error", function () {
        var r = this.publish.invert({});
        console.log(r.length);
        buster.assert.isArray(r);
        buster.assert.equals(r.length, 0);
        
        r = this.publish.invert([]);
        console.log(r.length);
        buster.assert.isArray(r);
        buster.assert.equals(r.length, 0);
    });
});
