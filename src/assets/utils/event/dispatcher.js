
// 事件派发者
// 处理订阅事件绑定和事件发布触发
define("assets/utils/event/dispatcher", function (require, exports, module) {
    
    "use strict";
    
	function Dispatcher () {
		this.listeners = {};
	}
    
	Dispatcher.prototype = {
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
                item;
            if (T.eventMap[eventName]) {
                len = T.eventMap[eventName].length;
                e = e || {};
                for (i = 0; i < len; i++) {
                    item = T.eventMap[eventName][i];
                    if (item) {
                        item.args.unshift(e);
                        item.handler.apply(item.target, item.args);
                    }
                }
            }
        }
	};
    
	var e = new Dispatcher;
	return Dispatcher.eventCenter = e, Dispatcher;
});