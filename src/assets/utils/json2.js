// JSON2 json对象转换
define("utils/json2", function (require, exprots, module) {
    
    "use strict";
    
    var JSON2 = {
        m: {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        s: {
            "boolean": function(e) {
                return String(e);
            },
            number: function(e) {
                return isFinite(e) ? String(e) : "null";
            },
            string: function(e) {
                return /["\\\x00-\x1f]/.test(e) && (e = e.replace(/([\x00-\x1f\\"])/g, function(e, t) {
                    var n = JSON2.m[t];
                    return n ? n : (n = t.charCodeAt(), "\\u00" + Math.floor(n / 16).toString(16) + (n % 16).toString(16));
                })), '"' + e + '"';
            },
            object: function(e) {
                if (e) {
                    var t = [],
                        n, r, i, o, u;
                    if (e instanceof Array) {
                        t[0] = "[", o = e.length;
                        for (i = 0; i < o; i += 1) u = e[i], r = JSON2.s[typeof u], r && (u = r(u), typeof u == "string" && (n && (t[t.length] = ","), t[t.length] = u, n = !0));
                        t[t.length] = "]";
                    } else {
                        if (!(e instanceof Object)) return;
                        t[0] = "{";
                        for (i in e) u = e[i], r = JSON2.s[typeof u], r && (u = r(u), typeof u == "string" && (n && (t[t.length] = ","), t.push(JSON2.s.string(i), ":", u), n = !0));
                        t[t.length] = "}";
                    }
                    return t.join("");
                }
                return "null";
            }
        },
        copyright: "(c)2005 JSON.org",
        license: "http://www.crockford.com/JSON/license.html",
        stringify: function(e) {
            var t = JSON2.s[typeof e];
            if (t) {
                e = t(e);
                if (typeof e == "string") return e;
            }
            return null;
        },
        parse: function(text) {
            try {
                return !/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g, "")) && eval("(" + text + ")");
            } catch (e) {
                return !1;
            }
        }
    }
    
    return JSON2;
    
});