buster.spec.expose();

describe("cookie base", function () {
    beforeAll(function () {
        var T = this;
        fetch("assets/utils/cookie", function (cookie) {
            T.cookie = cookie;
            T.test = "key=测试1;val=美丽的值1";
            T.cookie.set("test", T.test);
        });
    });
    
//    it("set", function () {
//        var test = "key=测试2;val=美丽的值2";
//        this.cookie.set("test", test);
//    });
    
    it("get", function () {
        var test = this.cookie.get("test", true);
        buster.assert.equals(test, this.test);
        
        test = this.cookie.get("test");
        buster.assert(test !== this.test);
    });
    
    it("deleteCookie", function () {
        var test = this.cookie.get("test", true);
        buster.assert.equals(test, this.test);
        
        test = this.cookie.get("test");
        buster.assert(test !== this.test);
    });
});