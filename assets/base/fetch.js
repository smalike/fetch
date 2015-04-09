var fetch, define;

!function () {
    
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
        len = names.length;
        for (i = 0; i < len; i++) {
            CacheKey[names[i]] = {dependency: depyObj, callback: callback};
        }
//        CacheLoad[name].resolve(name);
    }
    
    function timeoutError(deferred, error) {
        deferred.reject(error);
    }
    
    var module = {
            load: function () {
                // 动态延迟加载
            }
        },
        exports = {},
        CacheKey = {},
        CacheLoad = {},
        DefDeps = {},
        Event = {
            eventMap: {},
            addEventListener: function (eventName, handler, target, args) {
                var T = this;
                if (!T.eventMap[eventName]) {
                    T.eventMap[eventName] = [];
                }
                target = target || T;
                args = args || [];
                T.eventMap[eventName].push({handler: handler, target: target, args: args});
                return T;
            },
            removeEventListener: function (eventName, handler) {
                var T = this,
                    i,
                    len,
                    item;
                if (handler) {
                    for (i = 0; i < len; i++) {
                        item = T.eventMap[eventName][i];
                        if (item.handler === handler) {
                            item = null;
                        }
                    }
                } else {
                    T.eventMap[eventName] = [];
                }
                return T;
            },
            dispatch: function (eventName, e) {
                var T = this,
                    i,
                    len = T.eventMap[eventName].length,
                    item;
                e = e || {};
                for (i = 0; i < len; i++) {
                    item = T.eventMap[eventName][i];
                    if (item) {
                        item.args.unshift(e);
                        item.handler.apply(item.target, item.args);
                    }
                }
            }
        },
        head = document.getElementsByTagName("head")[0];
    
    function bubbling(name, callback) {
        var item,
            isDeps;
        for (item in DefDeps[name]) {
            if (!item.hasOwnProperty(DefDeps[name])) {
                isDeps = DefDeps[name][item];
                if (!isDeps) {
                    break;
                }
            }
        }
        if (isDeps) {
            if (isFunction(callback)) {
                settingCache(name, DefDeps[name], callback);
            }
            Event.dispatch(name, name);
        }
    }
    
    define = function (name, dependencys, callback) {
        var i,
            len,
            item,
            depyObj = {},
            defs = [];
        if (CacheKey[name]) {
            return !1;
        }
        module[name] = {};
        if (isArray(dependencys)) {
            module[name].deps = dependencys;
            len = dependencys.length;
            for (i = 0; i < len; i++) {
                item = dependencys[i];
                DefDeps[name] = DefDeps[name] || {};
                DefDeps[name][item] = !!CacheKey[item];
                if (!DefDeps[name][item]) {
                    Event.addEventListener(item, function (e, name, callback) {
                        DefDeps[name][e] = !0;
                        bubbling(name, callback);
                    }, null, [name, callback]);
                    loadJavascript(item).done(function (name) {
                        // ...
                    });
                }
            }
        } else if (isFunction(dependencys)) {
            callback = dependencys;
            settingCache(name, depyObj, callback);
            Event.dispatch(name, name);
        }
    };
    
    fetch = function (name, callback) {
        var item = CacheKey[name];
        if (!item) {
            Event.addEventListener(name, function (e, name, callback) {
                requireBack(name, callback);
            }, null, [name, callback]);
            loadJavascript(name).done(function (loadName) {
                // ...
            });
        } else {
            return requireBack(name, callback);
        }
    };
    
    function requireBack(name, callback) {
        var loadItem = CacheKey[name],
            result,
            _module;
        if (!loadItem) {
            return !1;
        }
        _module = module[name];
        result = loadItem.callback(fetch, exports, _module);
        if (result) {
            _module.exports = result;
        } else if (!_module.exports) {
            _module.exports = exports;
        }
        if (isFunction(callback)) {
            callback(_module.exports);
        } else {
            return _module.exports;
        }
    }
    
    fetch.timeout = 5e3;
    define.amd = {
        version: "0.1.0"
    };
    
}(this);