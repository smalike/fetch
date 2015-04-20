// 时间控件切换，整合叠层轮播、responsive功能处理
// 根据时间异步获取数据
define("common:chinaso/page/controller/simple.calendar", ["require", "exports", "module", "common:chinaso/page/controller/transform.carousel"], function (require, exports, module) {
	function simpleCal (setting) {
		var self = this;
		this.defaults = {
			baseUrl: "/source/lunbo.php?date="
		};
		this.defaults = jQuery.extend(this.defaults, setting);
		this.$container = jQuery(this.defaults.container);
		this.$content = jQuery(this.defaults.content);
        if (!this.$container.length) {
            return false;
        }
		this.transCar = transformCar.build({
            id: this.$content[0]
        });
		this.initialize();
	    require(["common:chinaso/page/controller/responsive"], function (responsive) {
	        responsive.build({
	        	callback: function (isNormal) {
	        		var num = 1;
	        		if (isNormal) {
	        			num = 1.5;
	        		} else {
	        			num = 1;
	        		}
	        		self.transCar.defaults.area = [
		                {width:Math.floor(640 / num), height:Math.floor(300 / num), top:40, left:0, zIndex:1},
		                {width:Math.floor(680 / num), height:Math.floor(300 / num), top:40, left:132, zIndex:2},
		                {width:Math.floor(720 / num), height:Math.floor(380 / num), top:0, left:264, zIndex:3},
		                {width:Math.floor(680 / num), height:Math.floor(300 / num), top:40, left:436, zIndex:2},
		                {width:Math.floor(640 / num), height:Math.floor(300 / num), top:40, left:608, zIndex:1}
		            ]
	        	}
	        });
	    });
	}
	var transformCar = require("common:chinaso/page/controller/transform.carousel");
	jQuery.extend(simpleCal.prototype, {
		initialize: function () {
			var self = this;
			this.$container.find(".arr-left").on("click", function () {
				self.convertTime(-1);
				return !1;
			});
			this.$container.find(".arr-right").on("click", function () {
				self.convertTime(1);
				return !1;
			});
			this.convertTime(0);
		},
		convertTime: function (direction) {
			var self = this;
			if (!direction) {
				this.timeObj = new Date();
                //this.timeObj.setFullYear(2014, 8, 25); // 临时明确指定显示天数
			} else {
				this.timeObj = new Date(this.timeObj.getTime() + (direction * (1000 * 3600 * 24)));
			}
			this.updateTimeView();
			this.fetchFilm();
		},
		updateTimeView: function () {
			var self = this;
			this.$container.find(".year").text(this.timeObj.getFullYear());
			this.$container.find(".month").text(self.datafomatZero(this.timeObj.getMonth() + 1));
			this.$container.find(".day").text(self.datafomatZero(this.timeObj.getDate()));
		},
        datafomatZero: function(param) {
            return param < 10 ? "0" + param : param;
        },
        fetchFilm: function () {
        	var self = this,
        		url = this.defaults.baseUrl + this.timeObj.getFullYear() + "-" + (this.timeObj.getMonth() + 1) + "-" + this.timeObj.getDate();
        	require([url], function (filmJson) {
//        		var _html = _.template(document.getElementById("Id_filmCalendar_tmpl").innerHTML, filmJson);
//				self.$content.find("ul").html(_html);
				self.transCar.resite();
        	});
        }
	});
	module.exports = {
		build: function (setting) {
			var s;
			return s = new simpleCal(setting), s;
		}
	};
});