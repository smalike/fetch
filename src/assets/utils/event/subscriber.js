
// 事件订阅对象
define("utils/event/subscriber", ["utils/util", "utils/event/dispatcher"], function (fetch, exports, module) {
    
    "use strict";
    
	var Util = fetch("utils/util"),
        Dispatcher = fetch("utils/event/dispatcher");
    
	function Subscriber (setting) {
		var arrs,
			i,
			keymap = {};
		if (setting.attrs) {
            arrs = setting.attrs.split(";");
            for (i = 0; keymap = this.invert(arrs)[i++];) {
                
                // 绑定指定 type 类型事件到事件中心
                Dispatcher.eventCenter.addEventListener(keymap.type, setting.fn, setting.owner, setting.args);
            }
        }
	}
    
	Util.extend(Subscriber.prototype, {
        
        // 转换数组内字符串为对象
        // ["a:aa", "b:bb"]
		invert: function (arrs) {
			var item,
				i,
				maps = [],
				keyval;
			for (i = 0; item = arrs[i++];) {
				keyval = item.split(":");
				maps.push({name: keyval[0], type: keyval[1]});
			}
			return maps;
		}
	});
    
	module.exports = function (setting) {
		var s;
		return s = new Subscriber(setting), s;
	}
});