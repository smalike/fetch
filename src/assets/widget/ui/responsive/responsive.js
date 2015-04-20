define("assets/widget/ui/responsive/responsive", ["assets/utils/event/dispatcher", "assets/widget/ui/nav/responsive-nav", "jquery"], function (require, exports, module) {
    
    "use strict";
    
    var eventDispatcher = require("assets/utils/event/dispatcher"),
        nav = require("assets/widget/ui/nav/responsive-nav"),
        jQuery = require("jquery");
	function responsive(setting) {
		this.defaults = {
			limit: 1250,
			cls: 'normal-width',
			callback: function () {}
		};
		this.defaults = jQuery.extend(this.defaults, setting);
		this.initialize();
	}
	jQuery.extend(responsive.prototype, {
		initialize: function () {
			var self = this,
				isNormal;
			jQuery(window).resize(function() {
				clearTimeout(self.resizeTimeId);
				self.resizeTimeId = setTimeout(function () {
					isNormal = self.responseView();
					self.defaults.callback(isNormal);
				}, 200);
			});
			isNormal = self.responseView();
			this.defaults.callback(isNormal);
		},
		responseView: function () {
			var isNormal = !1;
			if (jQuery('body').width() < this.defaults.limit) {
				jQuery('html').addClass(this.defaults.cls);
                eventDispatcher.eventCenter.dispatch("navMoreShow");
				isNormal = !0;
			} else {
				jQuery('html').removeClass(this.defaults.cls);
                eventDispatcher.eventCenter.dispatch("navMoreHide");
				isNormal = !1;
			}
			return isNormal;
		}
	});
	module.exports = {
		build: function (setting) {
			var r;
            nav.build();
			return r = new responsive(setting), r;
		}
	};
});