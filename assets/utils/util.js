define("assets/utils/util", function (fetch, exports, module) {
    
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
    Util = {
        extend: function () {
            var _this = this,
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
            if (typeof target !== "object" && !_this.isFunction(target)) {
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
                        if (deep && copy && (_this.isPlainObject(copy) || (copyIsArray = _this.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && _this.isArray(src) ? src : [];

                            } else {
                                clone = src && _this.isPlainObject(src) ? src : {};
                            }
                            target[name] = _this.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        },
        isFunction: function(obj) {
            return this.type(obj) === "function";
        },
        type: function(obj) {
            if (obj === null) {
                return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function" ? Class2type[core_toString.call(obj)] || "object" : typeof obj;
        },
        isPlainObject: function(obj) {
            var t = this;
            if (!obj || t.type(obj) !== "object" || obj.nodeType || t.isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            var key;
            for (key in obj) {}
            return key === undefined || core_hasOwn.call(obj, key);
        },
        isWindow: function(obj) {
            return obj !== null && obj == obj.window;
        },
        isArray: function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
    };

    function core_toString() {
        return this.prototype.toString();
    }

    function core_hasOwn() {
        return this.hasOwnProperty();
    }
    
    return Util;
    
});
