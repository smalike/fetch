define("common:chinaso/page/controller/responsive", ["require", "exports", "module", "common:chinaso/page/controller/event.dispatcher", "common:chinaso/page/common/controller/nav"], function (require, exports, module) {
    var eventDispatcher = require("common:chinaso/page/controller/event.dispatcher");
    var nav = require("common:chinaso/page/common/controller/nav");
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
			$(window).resize(function() {
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
			if ($('body').width() < this.defaults.limit) {
				$('html').addClass(this.defaults.cls);
                eventDispatcher.eventCenter.dispatchEvent("navMoreShow");
				isNormal = !0;
			} else {
				$('html').removeClass(this.defaults.cls);
                eventDispatcher.eventCenter.dispatchEvent("navMoreHide");
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