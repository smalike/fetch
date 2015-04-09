define("assets/utils/event/publish", ["assets/utils/util", "assets/utils/event/dispatcher"], function (fetch, exprots, module) {
	function publish (setting) {
		var arrs,
			i,
			keymap = {};
		if (setting.attrs) {
			arrs = setting.attrs.split(";");
			for (i = 0; keymap = this.invert(arrs)[i++];) {
				Dispatcher.eventCenter.dispatchEvent(keymap.type);
			}
		}
	}
    
	var Util = fetch("assets/utils/util"),
        Dispatcher = fetch("assets/utils/event/dispatcher");
    
	Util.extend(publish.prototype, {
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
		return s = new publish(setting), s;
	}
});