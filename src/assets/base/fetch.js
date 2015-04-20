
// fetch 加载组件主文件

// 模块请求加载对象
var fetch,
    
    // 模块定义函数
    define;

!function () {
    
    // 用来判断是否是数组
    function isArray(arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
    }
    
    // 用来判断是否是函数
    function isFunction(fun) {
        return Object.prototype.toString.call(fun) === "[object Function]";
    }
    
    // 利用 Deferred（Promise） 模式处理异步加载执行方式
    function Deferred() {
        var T = this;
        
        // 加载状态
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
    
    // 加载css文件
    // 未完成
    function loadCss(name, callback) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = name;
    }
    
    // 加载 javascript 元素，利用 Deferred 模式提供异步处理方式
    function loadJavascript(name, callback) {
        var script = document.createElement("script"),
            timeoutClearId,
            deferred,
            path;
        deferred = new Deferred();
        timeoutClearId = setTimeout(function () {
            timeoutError(deferred, "timeout");
        }, fetch.timeout);
        script.onerror = function (e) {
            timeoutError(deferred, e);
        };
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                clearTimeout(timeoutClearId);
                deferred.resolve(name);
            }
            script.onload = script.onreadystatechange = null;
        };
//        fetch.config.paths = fetch.config.paths || {};
//        path = fetch.config.paths[name];
        if (fetch.config.paths && (path = fetch.config.paths[name])) {
            name = path;
        }
        if (!/^(http(s)?:)?\/\//i.test(name)) {
            if (fetch.config.debug) {
                name = "src/" + name;
            }
            name = (fetch.config.baseURL || "") + name;
        }
        script.src = name + ".js";
        head.insertBefore(script, head.firstChild);
        return deferred;
    }
    
    // 加载超时
    // 执行失败deferred
    function timeoutError(deferred, error) {
        deferred.reject(error);
    }
    
    // 模块接口对象
    var module = {
        
            // 动态延迟加载
            // 为实现
            load: function () {
            }
        },
        
        // 接口暴漏属性
        exports = {},
        
        // 缓存模块定义
        // 只有所有依赖全部加载完成才会存储
        CacheKey = {},
        
        // 依赖对象
        // 存储模块定义的依赖加载项
        DefDeps = {},
        
        // 请求依赖加载对象
        // 存储请求时的依赖项
        FetDeps = {},
        
        // 自定义事件对象
        // 用于自定义事件绑定、触发、删除
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
                    len,
                    item,
                    _map = T.eventMap[eventName];
                _map && (len = _map.length);
                e = e || {};
                for (i = 0; i < len; i++) {
                    item = _map[i];
                    if (item) {
                        item.args.unshift(e);
                        item.handler.apply(item.target, item.args);
                    }
                }
            }
        },
        
        // 页面head元素
        // 用来添加javascript标签
        head = document.getElementsByTagName("head")[0];
    
    // 设置缓存加载完成的模块定义
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
            if (!CacheKey[names[i]]) {
                CacheKey[names[i]] = {dependency: depyObj, callback: callback};
            }
        }
    }
    
    // 判断当前模块依赖加载是否完成
    // 加载完成执行向上冒泡触发
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
    
    // 处理依赖加载
    // 绑定响应事件，利用事件冒泡模式处理多层依赖加载完成
    function getDependency(name, dependencys, callback) {
        var i,
            len,
            item,
            depsIsLoad;
        len = dependencys.length;
        for (i = 0; i < len; i++) {
            item = dependencys[i];
            DefDeps[name] = DefDeps[name] || {};
            DefDeps[name][item] = !!CacheKey[item];
            if (!DefDeps[name][item]) {
                depsIsLoad = !0;
                Event.addEventListener(item, function (e, name, callback) {
                    DefDeps[name][e] = !0;
                    bubbling(name, callback);
                    Event.removeEventListener(e);
                }, null, [name, callback]);
                if (!module[item]) {
                    module[item] = {deps: []};
                    loadJavascript(item).done(function (name) {
                        // ...
                    });
                }
            }
        }
        return depsIsLoad;
    }
    
    // 处理fetch请求的依赖加载
    function getFetDependency(name, dependencys, callback) {
        if (isArray(dependencys)) {
            settingFetDeps(name, dependencys);
        }
        Event.addEventListener(name, function (e, name, callback) {
            var i,
                len,
                item,
                desCalls = [];
            Event.removeEventListener(e);
            if (isArray(FetDeps[name])) {
                desCalls.push(requireBack(name));
                len = FetDeps[name].length;
                for (i = 0; i < len; i++) {
                    item = requireBack(FetDeps[name][i]);
                    if (!item) {
                        return !1;
                    }
                    desCalls.push(item);
                }
                callback.apply(fetch, desCalls);
                return !1;
            }
            requireBack(name, callback);
        }, null, [name, callback]);
        if (!module[name]) {
            module[name] = {};
            loadJavascript(name).done(function (loadName) {
                // ...
            });
        } else {
            if (FetDeps[name]) {
                module[name].deps = module[name].deps.concat(FetDeps[name]);
                if (!getDependency(name, FetDeps[name], callback)) {
                    Event.dispatch(name, name);
                }
            }
        }
    }
    
    // 赋值加载依赖关系，用于请求时的依赖加载
    function settingFetDeps(name, dependencys) {
        var i,
            len,
            item;
        len = dependencys.length;
        FetDeps[name] = FetDeps[name] || [];
        for (i = 0; i < len; i++) {
            item = dependencys[i];
            FetDeps[name].push(item);
        }
    }
    
    // 模块定义函数
    // 定义模块加载名称、依赖以及回调执行方法
    define = function (name, dependencys, callback) {
        var i,
            len,
            item,
            depyObj = {},
            defs = [];
        if (CacheKey[name]) {
            return !1;
        }
        module[name] = module[name] || {deps: []};
        if (isFunction(dependencys)) {
            callback = dependencys;
        }
        if (FetDeps[name]) {
            if (!isArray(dependencys)) {
                dependencys = [];
            }
            dependencys = dependencys.concat(FetDeps[name]);
        }
        module[name].callback = callback;
        if (isArray(dependencys) && dependencys.length) {
            module[name].deps = dependencys;
            if (!getDependency(name, dependencys, callback)) {
                settingCache(name, depyObj, callback);
                Event.dispatch(name, name);
            }
        } else {
            settingCache(name, depyObj, callback);
            Event.dispatch(name, name);
        }
    };
    
    // 请求组件函数
    fetch = function (name, dependencys, callback) {
        var item = CacheKey[name],
            i,
            len;
        if (isFunction(dependencys)) {
            callback = dependencys;
        }
        if (!item) {
            getFetDependency(name, dependencys, callback);
        } else {
            if (!isArray(dependencys) || !dependencys.length) {
                return requireBack(name, callback);
            } else {
                getFetDependency(name, dependencys, callback);
            }
        }
    };
    
    // 请求回调函数
    // 执行请求模块回调，添加模块处理接口
    function requireBack(name, callback) {
        var loadItem = CacheKey[name],
            result,
            _module;
        if (!loadItem) {
            return !1;
        }
        _module = module[name];
        if (_module.exports) {
            if (isFunction(callback)) {
                return callback(_module.exports);
            }
            return _module.exports;
        }
        result = _module.callback(fetch, exports, _module);
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
    
    // 请求超时事件
    fetch.timeout = 5e3;
    
    // 请求配置属性
    fetch.config = {
        debug: !0,
        paths: {}
    };
    
    // 符合AMD模式
    define.amd = {
        version: "0.1.0",
        
        // 可加载jQuery库
        jQuery: !0
    };
    
}(this);