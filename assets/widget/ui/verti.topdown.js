define("common:chinaso/page/controller/verti.topdown", function (require, exports, module) {
	function vertiTopdown (setting) {
		this.defaults = {};
		this.defaults = jQuery.extend(this.defaults, setting);
		this.initialize();
	}
	jQuery.extend(vertiTopdown.prototype, {
		initialize: function () {
			this.eventHandler();
		},
		eventHandler: function () {
			var self = this;
			$(this.defaults.item).on({
				mouseover: function () {
					var $cur = $(this),
						$oDiv = $cur.find(self.defaults.showView),
						$desc = $cur.find(self.defaults.hideView),
						cur = this;
					clearInterval(this.timer);
					if ($oDiv.length) {
						this.timer = setInterval(function() {
							var speed = (0 - $oDiv[0].offsetTop) / 3;
							speed = speed > 0 ? Math.ceil((0 - $oDiv[0].offsetTop) / 10) : Math.floor((0 - $oDiv[0].offsetTop) / 10);
							$oDiv[0].style.top = $oDiv[0].offsetTop + speed + 'px';
							if (speed === 0) {
								clearInterval(cur.timer);
							}
							$desc.hide();
						}, 5)
					}
				},
				mouseout: function () {
					var $cur = $(this),
						$oDiv = $cur.find(self.defaults.showView),
						$desc = $cur.find(self.defaults.hideView),
						cur = this;
					clearInterval(this.timer);
					if ($oDiv.length) {
						this.timer = setInterval(function() {
							var speed = ($cur.height() - $oDiv[0].offsetTop) / 3;
							speed = speed > 0 ? Math.ceil(($cur.height() - $oDiv[0].offsetTop) / 10) : Math.floor(($cur.height() - $oDiv[0].offsetTop) / 10);
							$oDiv[0].style.top = $oDiv[0].offsetTop + speed + 'px';
							if (speed === 0) {
								$desc.show();
								clearInterval(cur.timer);
							}
						}, 5);
					}
				}
			});
		}
	});
	module.exports = {
		build: function (setting) {
			var v;
			return v = new vertiTopdown(setting), v;
		}
	}
});