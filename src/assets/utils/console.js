// console
define("assets/utils/console", ["assets/utils/util"], function (require, exports, module) {

    "use strict";

    var Util = require("assets/utils/util");

    function Console() {
        var T = this;
        T.compatibility();
    }

    Util.extend(Console.prototype, {
        compatibility: function () {
            var T = this,
                attrs = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "memoryProfile", "memoryProfileEnd", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"],
                i,
                len = attrs.length;
            if (!window.console) {
                window.console = {};
                for (i = 0; i < len; i++) {
                    window.console[attrs[i]] = function () {};
                }
            }
            for (i = 0; i < len; i++) {
                T[attrs[i]] = window.console[attrs[i]];
            }
        }
    });

    return new Console;
});