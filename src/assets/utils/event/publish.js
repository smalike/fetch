
// 事件发布对象
define("assets/utils/event/publish", ["assets/utils/util", "assets/utils/event/dispatcher"], function (fetch, exprots, module) {
    
    "use strict";
    
	var Util = fetch("assets/utils/util"),
        Dispatcher = fetch("assets/utils/event/dispatcher");
    
	function Publish (setting) {
		var arrs,
			i,
			keymap = {};
		if (setting.attrs) {
			arrs = setting.attrs.split(";");
			for (i = 0; keymap = this.invert(arrs)[i++];) {
                
                // 触发指定 type 类型事件
				Dispatcher.eventCenter.dispatch(keymap.type);
			}
		}
	}
    
	Util.extend(Publish.prototype, {
        
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
		return s = new Publish(setting), s;
	}
});