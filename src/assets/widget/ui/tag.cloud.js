define("common:chinaso/page/controller/tag.cloud", function (require, exports, module) {
	function tagCloud (setting) {
		this.defaults = {};
		this.defaults = jQuery.extend(this.defaults, setting);
		this.$container = jQuery(this.defaults.container);
        radius = Math.min(this.$container.height(), this.$container.width()) / 2;
		this.build();
	}
	var dtr = Math.PI / 180, sa, ca, sb, cb, sc, cc, oTag, mcList = [], active
		, radius = 90, lasta = 1, lastb = 1, per, d = 300, howElliptical = 1, distr = true
		, mouseX = 0, mouseY = 0, size = 250, tspeed = 10;
	jQuery.extend(tagCloud.prototype, {
		build: function () {
			var self = this,
				curCls;
			this.$container.find(this.defaults.tag).each(function () {
				curCls = self.randomCls();
				jQuery(this).addClass(curCls);
				oTag = {};
				oTag.offsetWidth = this.offsetWidth;
				oTag.offsetHeight = this.offsetHeight;
				mcList.push(oTag);
			}).on({
				mouseover: function () {
					jQuery(this).addClass("cur").siblings().removeClass("cur");
				},
				mouseout: function () {
					jQuery(this).removeClass("cur");
				}
			});
			this.sineCosine(0, 0, 0);
			this.positionAll();
			this.$container.on({
				mouseover: function () {
					active = true;
				},
				mouseout: function () {
					active = false;
				},
				mousemove: function (ev) {
					var $this = $(this),
						oEvent = window.event || ev;
					mouseX = -(oEvent.pageX - ($this.offset().left + $this.width() / 2));
					mouseY = -(oEvent.pageY - ($this.offset().top + $this.height() / 2));
					mouseX /= 5;
					mouseY /= 5;
				}
			});
			setInterval(function () {
				self.updatePosition();
			}, 30);
		},
		sineCosine: function (a, b, c) {
			sa = Math.sin(a * dtr);
			ca = Math.cos(a * dtr);
			sb = Math.sin(b * dtr);
			cb = Math.cos(b * dtr);
			sc = Math.sin(c * dtr);
			cc = Math.cos(c * dtr);
		},
		updatePosition: function () {
			var i, y1, x1, z1, y2, x2, z2, y3, x3, z3, a, b, c = 0;
			if (active) {
				a = (-Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
				b = (Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
			} else {
				a = lasta * 0.98;
				b = lastb * 0.98;
			}
			lasta = a;
			lastb = b;
			if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
				return;
			}
			this.sineCosine(a, b, c);
			for (i = 0; i < mcList.length; i++) {
				x1 = mcList[i].cx;
				y1 = mcList[i].cy * ca + mcList[i].cz * (-sa);
				z1 = mcList[i].cy * sa + mcList[i].cz * ca;

				x2 = x1 * cb + z1 * sb;
				y2 = y1;
				z2 = x1 * (-sb) + z1 * cb;

				x3 = x2 * cc + y2 * (-sc);
				y3 = x2 * sc + y2 * cc;
				z3 = z2;

				mcList[i].cx = x3;
				mcList[i].cy = y3;
				mcList[i].cz = z3;

				per = d / (d + z3);
				mcList[i].scale = per;
				mcList[i].alpha = per;
				mcList[i].alpha = (mcList[i].alpha - 0.6) * (10 / 6);
			}
			this.doPosition();
		},
		doPosition: function () {
			var self = this;
			this.$container.find(this.defaults.tag).each(function (i) {
				this.style.left = mcList[i].cx + self.$container.width() / 2 - mcList[i].offsetWidth / 2 + "px";
				this.style.top = mcList[i].cy + self.$container.height() / 2 - mcList[i].offsetHeight / 2 + "px";

				this.style.fontSize = Math.ceil(12 * mcList[i].scale / 2) + 8 + 'px';

				this.style.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
				this.style.opacity = mcList[i].alpha;
			});
		},
		positionAll: function () {
			var self = this;
			var phi = 0;
			var theta = 0;
			var max = mcList.length;
			this.$container.find(this.defaults.tag).each(function (i) {
				if (distr) {
					phi = Math.acos(-1 + (2 * i) / max);
					theta = Math.sqrt(max * Math.PI) * phi;
				} else {
					phi = Math.random() * (Math.PI);
					theta = Math.random() * (2 * Math.PI);
				}
				mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
				mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
				mcList[i].cz = radius * Math.cos(phi);

				this.style.left = mcList[i].cx + self.$container.width() / 2 - mcList[i].offsetWidth / 2 + 'px';
				this.style.top = mcList[i].cy + self.$container.height() / 2 - mcList[i].offsetHeight / 2 + 'px';
			});
		},
		randomPosition: function () {
			Math.random()
		},
		randomCls: function () {
			var cls = this.defaults.cls;
			return cls[Math.floor(Math.random() * cls.length)];
		}
	});
	module.exports = {
		build: function (setting) {
			var t;
			return t = new tagCloud(setting), t;
		}
	};
});