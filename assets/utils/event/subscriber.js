define("assets/utils/event/subscriber", ["assets/utils/util", "assets/utils/event/dispatcher"], function (fetch, exports, module) {
	function subscriber (setting) {
		var arrs = setting.attrs.split(";"),
			i,
			keymap = {};
		for (i = 0; keymap = this.invert(arrs)[i++];) {
			Dispatcher.eventCenter.addEventListener(keymap.type, setting.fn, setting.owner, setting.args);
		}
	}
    
	var Util = fetch("assets/utils/util"),
        Dispatcher = fetch("assets/utils/event/dispatcher");
    
	Util.extend(subscriber.prototype, {
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
		return s = new subscriber(setting), s;
	}
});