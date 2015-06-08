// 切换同级节点选中状态
// 自定义event
define("widget/ui/cur-convert/cur-convert", ["jquery"], function (require, exports, module) {
    
    "use strict";
    
    var jQuery = require("jquery");
    
	function curConvert (setting) {
		var self = this;
		this.defaults = {};
		this.defaults = jQuery.extend(this.defaults, setting);
		jQuery(this.defaults.container).on(this.defaults.event, this.defaults.item + ":not(" + this.defaults.filter + ")", function () {
			jQuery(this).addClass(self.defaults.cur).siblings().removeClass(self.defaults.cur);
		});
	}
	module.exports = {
		build: function (setting) {
			var c;
			return c = new curConvert(setting), c;
		}
	};
});