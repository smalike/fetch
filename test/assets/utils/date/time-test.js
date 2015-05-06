buster.spec.expose();

describe("date/time base", function () {
    beforeAll(function () {
        var T = this;
        fetch("assets/utils/date/time", function (time) {
            T.time = time;
        });
    });
    
    it("getDay", function () {
        var T = this;
        var test = T.time.getDay();
        console.log(test);
        buster.assert.isString(test);
    });
    
    it("converte", function () {
        var T = this;
        var test = new Date();
        var r = T.time.converte(test);
        console.log(r);
        buster.assert.isObject(r);
    });
    
    it("converte string params", function () {
        var T = this;
        var test = "2015-05-06 11:58:16";
        var r = T.time.converte(test);
        console.log(r);
        buster.assert.isObject(r);
    });
    
    it("datafomatZero", function () {
        var T = this;
        var r = T.time.datafomatZero(4);
        buster.assert.equals(r, "04");
        r = T.time.datafomatZero("4");
        buster.assert.equals(r, "04");
        r = T.time.datafomatZero(40);
        buster.assert.equals(r, "40");
        r = T.time.datafomatZero("40");
        buster.assert.equals(r, "40");
        r = T.time.datafomatZero();
        buster.assert.equals(r, "00");
    });
});
