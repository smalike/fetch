define("assets/utils/event/subscriber", ["assets/utils/util", "assets/utils/event/dispatcher"], function (fetch, exports, module) {
    
    "use strict";
    
	var Util = fetch("assets/utils/util"),
        Dispatcher = fetch("assets/utils/event/dispatcher");
    
	function Subscriber (setting) {
		var arrs = setting.attrs.split(";"),
			i,
			keymap = {};
		for (i = 0; keymap = this.invert(arrs)[i++];) {
			Dispatcher.eventCenter.addEventListener(keymap.type, setting.fn, setting.owner, setting.args);
		}
	}
    
	Util.extend(Subscriber.prototype, {
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