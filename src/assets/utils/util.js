define("utils/util", function (fetch, exports, module) {
    "use strict";
    var Class2type = {
        "[object Array]": "array",
        "[object Boolean]": "boolean",
        "[object Date]": "date",
        "[object Error]": "error",
        "[object Function]": "function",
        "[object Number]": "number",
        "[object Object]": "object",
        "[object RegExp]": "regexp",
        "[object String]": "string"
    },
    CORE_TOSTRING = Class2type.toString,
    CORE_HASOWN = Class2type.hasOwnProperty,
    Util = {
        extend: function () {
            var T = this,
                options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if (typeof target !== "object" && !T.isFunction(target)) {
                target = {};
            }
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) !== null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (T.isPlainObject(copy) ||
                                             (copyIsArray = T.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && T.isArray(src) ? src : [];

                            } else {
                                clone = src && T.isPlainObject(src) ? src : {};
                            }
                            target[name] = T.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        },
        isFunction: function (obj) {
            return this.type(obj) === "function";
        },
        type: function (obj) {
            if (obj === null) {
                return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function" ?
                Class2type[CORE_TOSTRING.call(obj)] || "object" : typeof obj;
        },
        isPlainObject: function (obj) {
            var T = this;
            if (!obj || T.type(obj) !== "object" ||
                obj.nodeType || T.isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor && !CORE_HASOWN.call(obj, "constructor") &&
                    !CORE_HASOWN.call(obj.constructor.prototype,
                                      "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            var key;
            for (key in obj) {}
            return key === undefined || CORE_HASOWN.call(obj, key);
        },
        isWindow: function (obj) {
            return obj !== null && obj == obj.window;
        },
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        isDate: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Date]";
        },
        trim: function (str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    return Util;
});
