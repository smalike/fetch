define("common:chinaso/page/controller/select", function (require, exports, module) {
	function selectController (params) {
		var self = this,
			$disTxt,
			$tgg,
			$selView;
		this.defaults = {
			con: "document",
			disTxt: ".display-text",
			tgg: ".toggle-flag",
			selView: ".select-view"
		};
		this.defaults = jQuery.extend(this.defaults, params);
		$disTxt = jQuery(params.con).find(this.defaults.disTxt),
		$tgg = $disTxt.parents(params.con).find(this.defaults.tgg),
		$selView = $disTxt.parents(params.con).find(this.defaults.selView);
		$disTxt.on("click", function () {
			self.hideOther();
			self.showSelect(this);
		});
		$tgg.on("click", function () {
			self.hideOther();
			self.showSelect(this);
		});
		$selView.find(".item").on("click", function () {
			var $cur = $(this),
				val = $cur.data("val");
			$cur.parents(self.defaults.con).find(self.defaults.selView).toggle().end().find(self.defaults.disTxt).text(val);
		});
	}

	jQuery.extend(selectController.prototype, {
		showSelect: function (cur) {
			jQuery(cur).parents(this.defaults.con).find(this.defaults.selView).toggle();
		},
		hideOther: function () {
			jQuery(this.defaults.selView).hide();
		}
	});

	module.exports = {
		build: function (params) {
			var s;
			return s = new selectController(params), s;
		}
	};
});