define("assets/widget/ui/switch/item-switch", ["jquery"], function (require, exports, module) {
    
    "use strict";
    
    var jQuery = require("jquery");
    
	function itemConvert (params) {
		var self = this,
			$item;
        this.defaults = {
            cur: "cur"
        };
		this.defaults = jQuery.extend(this.defaults, params);
		this.container = this.defaults.container || "body";
		$item = jQuery(this.container + " " + this.defaults.item);
		this.tabList =$item;
		$item.on({
			mouseover: function () {
				var $cur = jQuery(this);
				clearTimeout(self.tabClearTimeId);
				self.tabClearTimeId = setTimeout(function () {
					self.convert($cur);
				}, 200);
			},
			mouseout: function () {
				clearTimeout(self.tabClearTimeId);
			}
		});
		self.initialize();
	}

	jQuery.extend(itemConvert.prototype, {
		initialize: function () {
			if (this.defaults.num || this.defaults.num === 0) {
				this.convert();
			}
		},
		convert: function ($cur) {
			var self = this,
                itemIndex;
			$cur = $cur || jQuery(this.defaults.item).eq(0);
			itemIndex = self.tabList.index($cur);
			$cur.addClass(self.defaults.cur).siblings().removeClass(self.defaults.cur);
			$cur.parents(this.container).find(self.defaults.content).eq(itemIndex).show().siblings().hide();
			this.defaults.callback && this.defaults.callback(itemIndex);
		}
	});

	module.exports = {
		build: function (params) {
			var i;
			return i = new itemConvert(params), i;
		}
	};
});