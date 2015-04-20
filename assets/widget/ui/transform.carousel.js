// 叠层切换图片轮播
// 新增适应屏幕宽度更改
define("common:chinaso/page/controller/transform.carousel", function (require, exports, module) {
	function transformCar(setting) {
		var self = this;
		this.initialize.call(this, setting);
		require(["common:chinaso/page/common/ie.version"], function (ieVertion) {
			self.ieVertion = ieVertion;
		});
	}
	jQuery.extend(transformCar.prototype, {
		initialize: function(setting) {
			var _this = this;
			this.defaults = {
				langer: 1,
				area: [{width: 205, height: 205, top: 40, left: 0, zIndex: 1 }, {width: 240, height: 240, top: 20, left: 162, zIndex: 2 }, {width: 275, height: 275, top: 0, left: 325, zIndex: 3 }, {width: 240, height: 240, top: 20, left: 520, zIndex: 2 }, {width: 205, height: 205, top: 40, left: 715, zIndex: 1 }]
			};
			this.defaults = jQuery.extend(this.defaults, setting);
//            if (!~~this.defaults.id) {
//                return false;
//            }
			this.wrap = typeof this.defaults.id === "string" ? document.getElementById(this.defaults.id) : this.defaults.id;
			this.buildFrame();
			this.prev = this.wrap.getElementsByTagName("span")[0];
			this.next = this.wrap.getElementsByTagName("span")[1];
			this.timer = 1000;
			this.iCenter = 2;
			this.initHandler();
		},
		initHandler: function () {
			var _this = this;
			this._doPrev = function() {
				return _this.doPrev.apply(_this);
			};
			this._doNext = function() {
				return _this.doNext.apply(_this);
			};
			this.addEvent(this.prev, "click", this._doPrev);
			this.addEvent(this.next, "click", this._doNext);
			this.doImgClick();
			this.timer = setInterval(function() {
				_this.doNext();
			}, 3000);
			this.wrap.onmouseover = function() {
				clearInterval(_this.timer);
			};
			this.wrap.onmouseout = function() {
				clearInterval(_this.timer);
				_this.timer = setInterval(function() {
					_this.doNext();
				}, 3000);
			}
		},
		resite: function () {
			this.buildFrame();
		},
		updateWidth: function (num) {
			this.defaults.langer = num;
		},
		buildFrame: function () {
			this.aSort = [];
			this.oUl = this.wrap.getElementsByTagName("ul")[0];
			this.aLi = this.wrap.getElementsByTagName("li");
			if (!this.aLi.length) {
				return !1;
			}
			for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
			this.aSort.unshift(this.aSort.pop());
			this.setUp();
			this.doImgClick();
			return 1;
		},
		doPrev: function() {
			this.aSort.unshift(this.aSort.pop());
			this.setUp();
		},
		doNext: function() {
			this.aSort.push(this.aSort.shift());
			this.setUp();
		},
		doImgClick: function() {
			var _this = this;
			for (var i = 0; i < this.aSort.length; i++) {
				this.aSort[i].onclick = function() {
					if (this.index > _this.iCenter) {
						for (var i = 0; i < this.index - _this.iCenter; i++) _this.aSort.push(_this.aSort.shift());
						_this.setUp();
						return false;
					} else if (this.index < _this.iCenter) {
						for (var i = 0; i < _this.iCenter - this.index; i++) _this.aSort.unshift(_this.aSort.pop());
						_this.setUp();
						return false;
					}
				};
			}
		},
		setUp: function() {
			var _this = this;
			var i = 0;
			if (!this.aLi.length) {
				return !1;
			}
			for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
			for (i = 0; i < this.aSort.length; i++) {
				this.aSort[i].index = i;
				if (i === 2) {
					_this.css3d(this.aSort[i], "perspective", "");
					_this.css3d(this.aSort[i], "perspective-origin", "");
					_this.css3d(this.aSort[i], "transform", "translateX(0px)");
					_this.setInfo(this.aSort[i].getAttribute("data-url"), this.aSort[i].getAttribute("data-desc"));
					_this.css3d(this.aSort[i].getElementsByTagName("img")[0], "box-reflect", "below 1px -webkit-gradient(linear, 0% 100%,100% 100%, from(rgba(255,255,255,0)), to(white))");
					_this.css3d(this.aSort[i].getElementsByTagName("a")[0], "transform", "rotateY(0deg)");
					_this.css(this.aSort[i].getElementsByTagName("img")[0], "filter", 0);
				} else if (i > 2) {
					_this.css3d(this.aSort[i], "perspective", "1200px");
					_this.css3d(this.aSort[i], "perspective-origin", "64% 47%");
					_this.css3d(this.aSort[i], "transform", "translateX(140px)");
					_this.css3d(this.aSort[i].getElementsByTagName("img")[0], "box-reflect", "");
					_this.css3d(this.aSort[i].getElementsByTagName("a")[0], "transform", "rotateY(-60deg)");
				} else if (i < 2) {
					_this.css3d(this.aSort[i], "perspective", "1200px");
					_this.css3d(this.aSort[i], "perspective-origin", "47% 47%");
					_this.css3d(this.aSort[i], "transform", "translateX(-140px)");
					_this.css3d(this.aSort[i].getElementsByTagName("img")[0], "box-reflect", "");
					_this.css3d(this.aSort[i].getElementsByTagName("a")[0], "transform", "rotateY(60deg)");
				}
				if (i === 0 || i === 4) {
					_this.css3d(this.aSort[i].getElementsByTagName("img")[0], "filter", 0);
				} else if (i === 1 || i === 3) {
					_this.css3d(this.aSort[i].getElementsByTagName("img")[0], "filter", 0);
				}
				if (i < 5) {
					this.css(this.aSort[i], "display", "block");
					this.doMove(this.aSort[i], this.defaults.area[i], function() {
						_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {
							opacity: 100
						}, function() {
							_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {
								opacity: 100
							}, function() {
								_this.aSort[_this.iCenter].onmouseover = function() {
									_this.doMove(this.getElementsByTagName("div")[0], {
										bottom: 0
									})
								};
								_this.aSort[_this.iCenter].onmouseout = function() {
									_this.doMove(this.getElementsByTagName("div")[0], {
										bottom: -100
									})
								}
							});
						});
					});
				} else {
					this.css(this.aSort[i], "display", "none");
					this.css(this.aSort[i], "width", 0);
					this.css(this.aSort[i], "height", 0);
					this.css(this.aSort[i], "top", 37);
					this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2);
				}
				if (i < this.iCenter || i > this.iCenter) {
					this.css(this.aSort[i].getElementsByTagName("img")[0], "opacity", 100)
					this.aSort[i].onmouseover = function() {
						_this.doMove(this.getElementsByTagName("img")[0], {
							opacity: 100
						});
					};
					this.aSort[i].onmouseout = function() {
						_this.doMove(this.getElementsByTagName("img")[0], {
							opacity: 100
						});
					};
					this.aSort[i].onmouseout();
				} else {
					this.aSort[i].onmouseover = this.aSort[i].onmouseout = null;
				}
			}
		},
		addEvent: function(oElement, sEventType, fnHandler) {
			return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler);
		},
		css3d: function (oElement, attr, value) {
			if (this.ieVertion && this.ieVertion < 10) {
				return !1;
			}
			try{
				oElement.style["-webkit-" + attr] = value;
				oElement.style["-moz-" + attr] = value;
				oElement.style["-ms-" + attr] = value;
				oElement.style["-o-" +attr] = value;
				oElement.style[attr] = value;
			}catch(e){}
		},
		css: function(oElement, attr, value) {
			if (arguments.length == 2) {
				return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr];
			} else if (arguments.length == 3) {
				switch (attr) {
					case "width":
					case "height":
					case "top":
					case "left":
					case "bottom":
						oElement.style[attr] = value / this.defaults.langer + "px";
						break;
					case "opacity":
						oElement.style.filter = "alpha(opacity=" + value + ")";
						oElement.style.opacity = value / 100;
						break;
					default:
						oElement.style[attr] = value;
						break;
				}
			}
		},
		setInfo: function (url, desc) {
			var info = this.wrap.getElementsByTagName("div")[0];
			info = info.getElementsByTagName("a")[0];
			/*info = info.childNodes[1];*/
			info.innerHTML = desc;
			info.setAttribute("href", url);
		},
		doMove: function(oElement, oAttr, fnCallBack) {
			var _this = this;
			if (oElement) {
				if (oElement.timer) {
					clearInterval(oElement.timer);
				};
				oElement.timer = setInterval(function() {
					var bStop = true;
					for (var property in oAttr) {
						var iCur = parseFloat(_this.css(oElement, property));
						property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
						var iSpeed = (oAttr[property] - iCur) / 5;
						iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

						if (iCur != oAttr[property]) {
							bStop = false;
							_this.css(oElement, property, iCur + iSpeed);
						}
					}
					if (bStop) {
						clearInterval(oElement.timer);
						fnCallBack && fnCallBack.apply(_this, arguments);
					}
				}, 30);

			};

		}
	});
	module.exports = {
		build: function (setting) {
			var t;
			return t = new transformCar(setting), t;
		}
	};
});