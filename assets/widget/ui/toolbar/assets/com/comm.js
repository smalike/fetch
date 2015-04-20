(BL.Com.Comm = function() {
	return {
		t: new Date().getTime(),
		init: function() {
			/***两端去空格函数**/
			String.prototype.trim = function() {
				return this.replace(/(^\s*)|(\s*$)/g, "");
			};
		},
		isEmpty: function(str) {
			return (str && /^\s*$/.test(str));
		}
	};
}()).init();