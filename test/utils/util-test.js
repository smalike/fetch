//debugger;
var assert = buster.assert;

buster.testCase("util base", {
    "extend": function () {
        fetch("assets/utils/util", function (util) {
            
            var test = {
                a: "a",
                b: function () {},
                obj: {
                    v: "a"
                }
            };
            var r = {
                obj: {
                    v: "v"
                }
            };
            util.extend(r, test);
            assert(r.b);
            assert.equals(r.obj.v, "a");
        });
    },
    "isFunction": function () {
        fetch("assets/utils/util", function (util) {
            function a () {};
            var test = util.isFunction(a);
            assert(test);
        });
    },
    "type": function () {
        fetch("assets/utils/util", function (util) {
            var test = function () {};
            assert.equals(util.type(test), "function");
        });
    },
    "isArray": function () {
        fetch("assets/utils/util", function (util) {
            var test = [];
            assert(util.isArray(test));
            test = "";
            assert(!util.isArray(test));
            test = new Date();
            assert(!util.isArray(test));
            test = function () {};
            assert(!util.isArray(test));
        });
    },
    "isDate": function () {
        fetch("assets/utils/util", function (util) {
            var test = new Date();
            assert(util.isDate(test));
            test = "";
            assert(!util.isDate(test));
            test = [];
            assert(!util.isDate(test));
            test = function () {};
            assert(!util.isDate(test));
        });
    },
    "trim": function () {
        fetch("assets/utils/util", function (util) {
            var test = "  abc  ";
            assert.equals(util.trim(test), "abc");
            test = "a bc  ";
            assert.equals(util.trim(test), "a bc");
            test = "a b c";
            assert.equals(util.trim(test), "a b c");
        });
    }
});
