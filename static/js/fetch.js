var fetch, define;

! function () {
    
    // 用来判断是否是数组
    function isArray(arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
    }
    
    // 用来判断是否是函数
    function isFunction(fun) {
        return Object.prototype.toString.call(fun) === "[object Function]";
    }
    
    function load(name, callback) {
        var suffix = name.indexOf(".");
        switch (name.substring(suffix)) {
                case "css":
                    loadCss(name, callback);
                    break;
                case "js":
                    name = name.substring(0, suffix);
                    loadJavascript(name, callback);
                    break;
                default:
                    loadJavascript(name, callback);
                    break;
        }
    }
    
    function loadCss(name, callback) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = name;
    }
    
    function loadJavascript(name, callback) {
        var script = document.createElement("script"),
            timeoutClearId;
        timeoutClearId = setTimeout(timeoutError, fetch.timeout);
        script.onerror = function () {
            timeoutError();
        };
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                clearTimeout(timeoutClearId);
//                callback(CacheKey[name]);
            }
            script.onload = script.onreadystatechange = null;
        };
        script.src = name + ".js";
        head.appendChild(script);
    }
    
    function timeoutError() {
        
    }
    
    var CacheKey = {},
        head = document.getElementsByTagName("head")[0];
    
    define = function (name, dependencys, callback) {
        var i,
            len,
            item,
            depyObj = {};
        if (isArray(dependencys)) {
            len = dependencys.length;
            for (i = 0; i < len; i++) {
                item = dependencys[i];
                if (!CacheKey[name]) {
                    fetch(item);
                    depyObj[item] = !1;
                } else {
                    depyObj[item] = !0;
                }
            }
        } else if (isFunction(dependencys)) {
            callback = dependencys;
        }
        CacheKey[name] = {dependency: depyObj, callback: callback};
    };
    
    fetch = function (name, callback) {
        var item = CacheKey[name];
        if (!item) {
            load(name, function (loadItem) {
                if (isFunction(callback)) {
                    callback(loadItem.callback(fetch));
                }
            });
        } else {
            if (isFunction(callback)) {
                callback(item.callback(fetch));
            }
        }
    };
    fetch.timeout = 5e3;
    define.amd = {
        version: "0.1.0"
    };
}(this);