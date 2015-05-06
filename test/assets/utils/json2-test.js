buster.spec.expose();

describe("json2 base", function () {
    beforeAll(function () {
        var T = this;
        fetch("assets/utils/json2", function (json2) {
            T.json2 = json2;
        });
    });
    
    it("stringify", function () {
        var test = {a: "aaa", b: "bbb"};
        test = this.json2.stringify(test);
        console.log(test);
        buster.assert.isString(test);
    });
    
    it("parse", function () {
        var test = '{"a": "aaa", "b": "bbb"}';
        test = this.json2.parse(test);
        console.log(test);
        buster.assert.isObject(test);
    });
});
