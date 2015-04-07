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
    
    function Deferred() {
        var T = this;
        T.status = "PENDING";
        T.doResolves = [];
        T.doRejecteds = [];
    }
        
    Deferred.prototype.resolve = function (value) {
        var T = this,
            i = 0,
            len = T.doResolves.length;
        T.status = "FULFILLED";
        for (i = 0; i < len; i++) {
            T.doResolves[i].call(T, value);
        }
    };

    Deferred.prototype.reject = function (error) {
        var T = this,
            i,
            len = T.doRejecteds.length;
        T.status = "REJECTED";
        for (i = 0; i < len; i++) {
            T.doResolves[i].call(T, error);
        }
    };
    
    Deferred.prototype.done = function (onResolve) {
        var T = this;
        if (isFunction(onResolve)) {
            T.doResolves.push(onResolve);
        }
        return T;
    };
    
    Deferred.prototype.fail = function (onRejected) {
        var T = this;
        if (isFunction(onRejected)) {
            T.doRejecteds.push(onRejected);
        }
        return T;
    };
    
    Deferred.prototype.then = function (onResolve, onRejected) {
        
    };
    
    Deferred.prototype.always = function (onAlway) {
        var T = this;
        T.done(onAlway).fail(onAlway);
        return T;
    };
    
    Deferred.when = function (defs) {
        var deferred = new Deferred(),
            i,
            len = defs.length,
            def,
            results = [];
        for (i = 0; i < len; i++) {
            def = defs[i];
            if (!(def instanceof Deferred)) {
                return !1;
            }
            def.always(function (value) {
                if (this.status === "REJECTED") {
                    deferred.reject();
                }
                len--;
                results.push(value);
                if (!len) {
                    deferred.resolve(results);
                }
            });
        }
        return deferred;
    };
    
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
            timeoutClearId,
            deferred;
        deferred = new Deferred();
        timeoutClearId = setTimeout(timeoutError, fetch.timeout);
        script.onerror = function () {
            timeoutError(deferred);
        };
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                clearTimeout(timeoutClearId);
                deferred.resolve(name);
            }
            script.onload = script.onreadystatechange = null;
        };
        script.src = name + ".js";
        head.appendChild(script);
        return deferred;
    }
    
    function settingCache(name, depyObj, callback) {
        var i,
            len,
            names;
        if (!isArray(name)) {
            names = [name];
        } else {
            names = name;
        }
        len = name.length;
        for (i = 0; i < len; i++) {
            CacheKey[name[i]] = {dependency: depyObj, callback: callback};
        }
        CacheLoad[name].resolve(name);
    }
    
    function timeoutError(deferred, error) {
        deferred.reject(error);
    }
    
    var CacheKey = {},
        CacheLoad = {},
        DefDeps = [],
        head = document.getElementsByTagName("head")[0];
    
    define = function (name, dependencys, callback) {
        var i,
            len,
            item,
            depyObj = {},
            defs = [];
        if (isArray(dependencys)) {
            len = dependencys.length;
            for (i = 0; i < len; i++) {
                item = dependencys[i];
                if (!CacheKey[name]) {
//                    defs.push(loadJavascript(item));
                    loadJavascript(item).done(function (name) {
                        
                    });
                }
            }
//            if (!defs.length) {
//                settingCache(name, depyObj, callback);
//            } else {
                
//                Deferred.when(defs).done(function (names) {
//                    settingCache(names, depyObj, callback);
//                });
//            }
        } else if (isFunction(dependencys)) {
            callback = dependencys;
            settingCache(name, depyObj, callback);
        }
    };
    
    fetch = function (name, callback) {
        var item = CacheKey[name];
        if (!item) {
            CacheLoad[name] = loadJavascript(name);
            CacheLoad[name].done(function (loadName) {
                CacheKey[loadName] && requireBack(CacheKey[loadName], callback);
            });
        } else {
            requireBack(item, callback);
        }
    };
    
    function requireBack(loadItem, callback) {
        if (isFunction(callback)) {
            callback(loadItem.callback(fetch));
        }
    }
    
    fetch.timeout = 5e3;
    define.amd = {
        version: "0.1.0"
    };
    
}(this);