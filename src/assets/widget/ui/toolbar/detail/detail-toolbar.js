! function(window, undefined) {
	var DT = window.DT || {};
	DT.CONF = {
		URL_LOGIN: "http://my.chinaso.com/",
		VSTAR_PATH: "http://my.chinaso.com/",
		URL_EXIT: "https://passport.chinaso.com/",
		URL_UNAME: "http://www.chinaso.com/",
		LOGIN_REG_TMPL: '<a id="jToolbarReg" class="register" href="{#registerUrl}">注册</a> | <a id="jToolbarLogin" href="{#loginUrl}" class="login">登录</a>',
		USER_TMPL: '<b></b><a href="javascript:;" class="account">{#uname}</a><i></i><div class="quit-box"><ul class="list51"><li><a target="_blank" href="http://wenda.chinaso.com/user/score.html">我的问答</a></li>'+
					'<li><a target="_blank" href="http://forum.chinaso.com/home.php?mod=spacecp&ac=profile">我的社区</a></li>' + 
					'<li><a target="_blank" href="http://baike.chinaso.com/wiki/user-doccontri-create.html">我的百科</a></li>'+
					'<li class="last"><a id="jToolbarExit" class="quit last" href="javascript:void(0);">退出</a></li></ul></div>',
		NAC_TMPL: ''
	},
	DT.CONST = {
		CID: "jToolbar",
		USERAREAID: "Id_loginBar",
		COOKIE_LOGIN: "chinasoticket_titlename",
		COOKIE_USER_NAME: "chinasoticket_titlename"
	};
	DT.initialize = function() {
		this.build();
		this.bindEvent();
	};
	DT.build = function() {
		var _html;
		if (DT.Cookie.isLogin()) {
			var uname = DT.Cookie.getCookie(DT.CONST.COOKIE_USER_NAME, true) || "";
			//uname = uname.substring(0, uname.indexOf("@"));
			_html = DT.CONF.USER_TMPL.replace("{#uname}", uname);
		} else {
			var redirect = window.location.href,
				loginUrl = DT.CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect))),
				registerUrl = DT.CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect))) + "#register";
			_html = DT.CONF.LOGIN_REG_TMPL.replace("{#loginUrl}", loginUrl).replace("{#registerUrl}", registerUrl);
		}
		document.getElementById(DT.CONST.USERAREAID).innerHTML = DT.CONF.NAC_TMPL + _html;
	};
	DT.bindEvent = function() {
		$("#jToolbar .quit").on('click', function() {
			$(this).PassportLogoutWhy({
				'basePath': DT.CONF.VSTAR_PATH,
				'passurl': DT.CONF.URL_EXIT + 'logout/doLogout.htm',
				'curUrl': encodeURIComponent(window.location.href)
			}, {
				sucCb: function() {
					if (/^.*my.chinaso.com.*$/ig.test(location.host)) {
						window.location.href = DT.CONF.URL_UNAME;
					}
					DT.build();
				},
				errorCb: function() {
					DT.build();
				}
			});
			return false;
		});
		$('#jToolbar .more-link').on({
			mouseover: function () {
				DT.Dom.hideBox();
				$("#jToolbar .more-list").show();
			}
		});
		$('#Id_loginBar').on('mouseover', function() {
			DT.Dom.hideBox();
			$('#Id_loginBar .quit-box').show();
			return false;
		});
		$(document).on('mouseover', function(e) {
			if (!$(e.target).closest(".quit-box").length) {
			  $("#Id_loginBar .quit-box").hide();
			}
			if (!$(e.target).closest(".more-link").length) {
				$("#jToolbar .more-list").hide();
			}
		});
	}
	DT.Dom = function () {
		return {
			hideBox: function() {
			  $("#jToolbar .hide").not(function() {
				if ($(this).parents(".hide").length) {
				  return this;
				}
			  }).hide();
			}
		};
	}();
	DT.Cookie = function() {
		return {
			isLogin: function() {
				var lgc = this.getCookie(DT.CONST.COOKIE_LOGIN, true);
				if (lgc !== null) {
					return true;
				} else {
					return false;
				}
			},
			getCookie: function(name, decode) {
				var cookies = document.cookie,
					arr,
					reg = new RegExp("(^|)" + name + "=([^;]*)(;|$)");
				arr = cookies.match(reg);
				if (arr) {
					if (decode === true) {
						return this.decodeStr(arr[2]);
					} else {
						return arr[2];
					}
				} else {
					return null;
				}
			},
			setCookie: function(name, value, expires, domain, path, secure) {
				var c = encodeURIComponent(name) + "=" + encodeURIComponent(value),
					d = null,
					days = 30;
				if (expires instanceof Date) {
					c += ";expires=" + expires.toGMTString();
				} else { /***不设置此参数，默认30天**/
					d = new Date();
					d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
					c += ";expires =" + d.toGMTString();
				}
				if (path) {
					c += ";path=" + path;
				}

				if (domain) {
					c += ";domain=" + domain;
				}

				if (secure) {
					c += ";secure";
				}

				document.cookie = c;
			},
			decodeStr: function(str) {
				var ret = "",
					i, len = str.length;
				for (i = 0; i < len; i++) {
					var chr = str.charAt(i);
					if (chr == "+") {
						ret += " ";
					} else if (chr == "%") {
						var asc = str.substring(i + 1, i + 3);
						if (parseInt("0x" + asc) > 0x7f) {
							ret += decodeURI("%" + str.substring(i + 1, i + 9));
							i += 8;
						} else {
							ret += String.fromCharCode(parseInt("0x" + asc));
							i += 2;
						}
					} else {
						ret += chr;
					}
				}
				return ret;
			},
			deleteCookie: function(name, domain, path, secure) {
				var c = encodeURIComponent(name) + "=" + encodeURIComponent("a");
				var date = new Date();
				date.setTime(date.getTime() - 10000);
				c += ";expires =" + date.toGMTString();
				if (path) {
					c += ";path=" + path;
				}
				if (domain) {
					c += ";domain=" + domain;
				}
				if (secure) {
					c += ";secure";
				}
				document.cookie = c;
			}
		};
	}();
	DT.initialize();
}(window);