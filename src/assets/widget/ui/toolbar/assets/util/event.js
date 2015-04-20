
// 定义事件对象
// 事件兼容处理
BL.Util.Event = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) { /***W3C**/
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) { /***IE**/
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},

	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}
};