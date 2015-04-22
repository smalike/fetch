define("assets/widget/ui/toolbar/com-toolbar/toolbar", ["assets/widget/com/jsonp", "assets/utils/cookie", "assets/utils/util", "assets/utils/event/event", "assets/utils/date/time", "assets/widget/ui/toolbar/com-toolbar/weather", "assets/utils/date/lunar-calendar", "assets/widget/ui/easter/easter", "jquery"], function (require, exports, module) {
    
    "use strict";
    
    var JSONP = require("assets/widget/com/jsonp"),
        Cookie = require("assets/utils/cookie"),
        Util = require("assets/utils/util"),
        Event = require("assets/utils/event/event"),
        Time = require("assets/utils/date/time"),
        Weather = require("assets/widget/ui/toolbar/com-toolbar/weather")(),
        Easter = require("assets/widget/ui/easter/easter"),
        LunarCalendar = require("assets/utils/date/lunar-calendar")(),
        $ = require("jquery");
    
    function Toolbar(setting) {
        var T = this;
        T.defaults = {
            CONST: {
                content: "",

                // 组件id
                CID: "jToolbar",

                // 天气id
                WID: "jToolbarWeather",

                // 退出id
                EXITID: "jToolbarExit",

                // 用户区id
                UAREA: "jToolbarUser",
                COOKIE_LOGIN: "chinasoticket_titlename",
                COOKIE_USER_NAME: "chinasoticket_titlename"
            },
            CONF: {

                // 新域名
                URL_UNAME: "http://www.chinaso.com/",

                // 用户名网址
                URL_LOGIN: "http://my.chinaso.com/",

                URL_EXIT: "https://passport.chinaso.com/",

                // 退出域名
                URL_AJAX_EXIT: "https://passport.chinaso.com/logout/doLogout.htm",
                VSTAR_PATH: "http://my.chinaso.com/",
                URL_WEATHER: "http://www.chinaso.com/weather/query/"
            },
            timeArr: []
        };

        Util.extend(T.defaults, setting);
        Easter.log();
    }
    
    Util.extend(Toolbar.prototype, {
        isLogin: function () {
            var T = this,
                lgc = Cookie.get(T.defaults.CONST.COOKIE_LOGIN, true);
            if (lgc !== null) {
                return true;
            } else {
                return false;
            }
        },
        // 判断是不是主页
        isHomePage: function () {
            if (/^http:\/\/((www\.chinaso\.com\/index.+)|(chinaso\.com\/)|(my\.chinaso\.com.+)|(www\.chinaso\.com\/?))$/.test(location.href)) {
                return true;
            } else {
                return false;
            }
        },
        getUserState: function () {
            var T = this,
                uarea = document.getElementById(T.defaults.CONST.UAREA),
                uname,
                html,
                weatherother,
                downloadA,
                downloadDiv;
            weatherother = '<div class="weather_other">' + '<div class="wo_box hide">' + '<div class="wo_box_wrap">' + '<div class="wo_search">' + '<ul class="list17" id="wo_city_list">' + '<li class="last" id="wo_last_input"><select class="input3" id="id_searchCity" placeholder="输入城市全拼/简拼"></select></li>' + '</ul>' + '<div class="clear"></div>' + '</div>' + '<div class="wo_tab"><a href="#" class="cur">热门城市</a><a href="#">省市</a></div>' + '<div class="wo_cont_box">' + '<div class="wo_cont">' + '<div class="h6"></div>' + '<ul class="list15" id="hotCity">' + '</ul>' + '<div class="h6 clear"></div>' + '</div>' + '<div class="wo_cont hide">' + '<div class="wo_sel_box">' + '<select multiple="multiple" name="s_province" id="s_province">' + '</select>' + '</div>' + '<div class="wo_sel_box">' + '<select multiple="multiple" id="s_city" name="s_city">' + '</select>' + '</div>' + '<div class="clear"></div>' + '</div>' + '</div>' + '<div class="wo_submit"><p><input type="button" class="btn3 mgr5" id="weatherSubmit" value="保存" /><input type="button" class="btn4" id="cancelSel" value="取消" /></p><span>您最多可同时选择3个城市</span></div>' + '</div>' + '<div class="wo_box_wrap hide">' + '<div class="wo_detail_box">' + '<ul class="list16">' + '<li class="wo_color1"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color2"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color3 last"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '</ul>' + '<ul class="list16 hide">' + '<li class="wo_color1"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color2"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color3 last"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '</ul>' + '<ul class="list16 hide">' + '<li class="wo_color1"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color2"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color3 last"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '</ul>' + '</div>' + '<div class="wo_detail_text"><p id="wo_sel_day"><a href="#" class="cur">今天</a><i>|</i><a href="#">明天</a><i>|</i><a href="#">后天</a></p><strong id="resetCity">重新设定</strong></div>' + '</div>' + '</div>' + '</div>';
            downloadA = '<a href="http://m.chinaso.com/wsdownload.html" class="a_download" target="_blank">移动客户端</a>';
            var downloadA2 = '<a href="http://m.chinaso.com/wsdownload.html" class="a_download" target="_blank">移动客户端</a>';
            var versionSel = '<a href="javascript:void(0)" class="a_version">版本选择<i class="arrow_down"></i></a>';
            downloadDiv = '';
            
            // 主页
            if (T.isHomePage()) {
                
                // 登陆状态
                if (T.isLogin()) {
                    uname = Cookie.get(T.defaults.CONST.COOKIE_USER_NAME, true) || "";
                    html = '<div id="jToolbarUser" class="account">' + '<div class="skinOpen">' +
                        '<b class="head_pic"></b><a href="javascript:void(0)" class="a_user">' + uname +
                        '<i class="arrow_down"></i></a>' +
                        downloadA2 + '<span>|</span><a target="_blank" id="jToolbarHomepage" href="http://www.chinaso.com" ' +
                        'onclick="setHome(this, \'http:\/\/www.chinaso.com\');">设国搜为主页</a>' + '</div>' +
                        '<div class="quit_box hide"><ul class="list51"><li><a target="_blank" href="http://wenda.chinaso.com/user/score.html">我的问答</a></li>' +
                        '<li><a target="_blank" href="http://forum.chinaso.com/home.php?mod=spacecp&ac=profile">我的论吧</a></li>' +
                        '<li><a target="_blank" href="http://baike.chinaso.com/wiki/user-doccontri-create.html">我的百科</a></li>' +
                        '<li class="last"><a id="jToolbarExit" href="javascript:void(0);">退出</a></li></ul></div></div>' +
                        '<div class="fl top_data">' + '<span id="jToolbarTime">' + T.setTimeArea() + '</span><a href="http://www.chinaso.com/search/pagesearch.htm?q=%E5%86%9C%E5%8E%86" target="_blank" class="date_lunar">' +
                        T.getCurCNDDate() + '</a><i>|</i><span id="jToolbarWeather"></span>' + '</div>' + weatherother;
                    
                // 非登陆
                } else {
                    var redirect = window.location.href;
                    var loginUrl = T.defaults.CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect)));
                    var registerUrl = T.defaults.CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect))) + "#register";
                    html = '<div id="jToolbarUser" class="account">' + '<div class="skinOpen">' + '<a id="jToolbarLogin" href="' + loginUrl + '" class="a_login">登录</a><a id="jToolbarReg" href="' + registerUrl + '">注册</a><span>|</span>' +
                        downloadA2 + '<span>|</span><a target="_blank" id="jToolbarHomepage" href="http://www.chinaso.com"' + '  onclick="setHome(this, \'http:\/\/www.chinaso.com\');">设国搜为主页</a>' + '</div>' + 
                        '</div>' + 
                        '<div class="fl top_data">' + '<span id="jToolbarTime">' + T.setTimeArea() + '</span><a href="http://www.chinaso.com/search/pagesearch.htm?q=%E5%86%9C%E5%8E%86" target="_blank" class="date_lunar">' + T.getCurCNDDate() + '</a><i>|</i><span id="jToolbarWeather"></span>' + '</div>' + weatherother;
                }
                
            // 非主页
            } else {
                
                // 登陆状态
                if (T.isLogin()) {
                    uname = Cookie.get(T.defaults.CONST.COOKIE_USER_NAME, true) || "";
                    html = '<div id="jToolbarUser" class="account">' + '<div class="skinOpen">' + '<b class="head_pic"></b><a href="javascript:void(0)" class="a_user">' + uname + '<i class="arrow_down"></i></a>' +
                        downloadA + '<span>|</span><a target="_blank" id="jToolbarHomepage" href="http://www.chinaso.com"' + ' onclick="setHome(this, \'http:\/\/www.chinaso.com\');">设国搜为主页</a>' + '</div>' + 
                        '<div class="quit_box hide noindex_pos">' + '<ul class="list51">' +
                        '<li><a target="_blank" href="http://wenda.chinaso.com/user/score.html">我的问答</a></li>' +
                        '<li><a target="_blank" href="http://forum.chinaso.com/home.php?mod=spacecp&ac=profile">我的论吧</a></li>' +
                        '<li><a target="_blank" href="http://baike.chinaso.com/wiki/user-doccontri-create.html">我的百科</a></li>' +
                        '<li class="last"><a id="jToolbarExit" href="javascript:void(0);">退出</a></li></ul>' +
                        '</div>' + '</div>' + '<div class="fl top_data">';
                    html += '<span id="jToolbarTime">' + T.setTimeArea() +
                        '</span><a target="_blank" href="http://www.chinaso.com/search/pagesearch.htm?q=%E5%86%9C%E5%8E%86" class="date_lunar">' + T.getCurCNDDate() + '</a><i>|</i><span id="jToolbarWeather"></span></div>' + weatherother;
                    
                // 非登陆
                } else {
                    var redirect = window.location.href;
                    var loginUrl = T.defaults.CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect)));
                    var registerUrl = T.defaults.CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect))) + "#register";
                    html = '<div id="jToolbarUser" class="account">' + '<div class="skinOpen">' + '<a id="jToolbarLogin" href="' + loginUrl + '" class="a_login">登录</a><a id="jToolbarReg" href="' + registerUrl + '">注册</a><span>|</span>' +
                        downloadA + '<span>|</span><a target="_blank" id="jToolbarHomepage" href="http://www.chinaso.com"' + ' onclick="setHome(this, \'http:\/\/www.chinaso.com\');">设国搜为主页</a></div>' + 
                        '</div>' + '<div class="fl top_data">';
                    html += '<span id="jToolbarTime">' + T.setTimeArea() + '</span><a target="_blank" href="http://www.chinaso.com/search/pagesearch.htm?q=%E5%86%9C%E5%8E%86" class="date_lunar">' +
                        T.getCurCNDDate() + '</a><i>|</i><span id="jToolbarWeather"></span>'
                    html += '</div>' + weatherother;
                }
            }
            html = '<div class="top_con">' + html + '</div>';
            return html;
        },
        // 将请求中的关键字进行转码，避免中文乱码问题。
        encodeKeyword: function (url) {
            var arr = url.split('&');
            for (var i = 0, l = arr.length; i < l; i++) {
                if (arr[i].indexOf('q') != -1) {
                    var kw = arr[i].substring(arr[i].indexOf('q'));
                    var convertKw = encodeURI(kw);
                    arr[i] = arr[i].replace(kw, convertKw);
                }
            }
            return arr.join('&');
        },
        updateUserState: function () {
            var T = this,
                u = document.getElementById(T.defaults.CONST.CID),
                wh;
            if (u) {
                wh = document.getElementById(T.defaults.CONST.WID).innerHTML;
                u.innerHTML = T.getUserState();
                document.getElementById(T.defaults.CONST.WID).innerHTML = wh;
            }
        },
        render: function () {
            var T = this,
                toolbar = document.getElementById(T.defaults.CONST.CID),
                content = T.getUserState(),
                wrapper = '<div class="top" id="jToolbar">' + content + '</div>',
                storageVal,
                nowDate = new Date();
            if (typeof toolbar === undefined) {
                document.writeln(wrapper);
            } else {
                toolbar.innerHTML = content;
            }
            storageVal = Weather.getWeatherData();
            if (storageVal || +nowDate.getTime() - storageVal.expires > 999) {
                JSONP('http://www.chinaso.com/weather/query/updateWheatherState?' + Math.random() * 1000000 + nowDate.toTimeString());
            }
        },
        logout: function () {
            JSONP(this.defaults.CONF.URL_AJAX_EXIT, "BL.Com.Toolbar.updateUserState");
        },
        // 注册用户相关事件
        bindUserEvent: function () {
            var T = this,
                exit = document.getElementById(T.defaults.CONST.EXITID);
            if (exit) {
                Event.addHandler(exit, "click", T.logout);
            }
        },
        unBindUserEvent: function () {
            var T = this,
                exit = document.getElementById(T.defaults.CONST.EXITID);
            if (exit) {
                Event.removeHandler(exit, "click", T.logout);
            }
        },
        getCurDate: function () {
            var T = this;
            return T.defaults.timeArr[0] + " " + Time.getDay();;
        },
        getCurCNDDate: function () {
            var T = this;
            return T.defaults.timeArr[1];
        },
        setTimeArea: function () {
            var T = this,
                nowDate = new Date();
            T.defaults.timeArr[0] = Time.formatting(nowDate, "yyyy-mm-dd");
            T.defaults.timeArr[1] = LunarCalendar.getLunarDay(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate());
            return T.getCurDate();
        },
        getWheather: function (city, callback) {
            var T = this,
                params;
            
            // @example{s.src = "http://www.chinaso.com/weather/query/Toolbar.updateWheatherState?city=北京";}
            city = city || "北京";
            callback = callback || "updateWheatherState";
            params = callback + "?city=" + city;
            JSONP(T.defaults.CONF.URL_WEATHER + params);
        },
        updateWheatherState: function (weatherData) {
            var T = this;
            Weather.fillStorageWeatherData(weatherData);
            return T.formatWeatherData(weatherData);
        },
        formatWeatherData: function (weatherData) {
            var T = this,
                city,
                forcast,
                airQuality,
                aqiClass,
                aqiText,
                w,
                o,
                disApi = "";
            if (weatherData) {
                city = weatherData.cityExt;
                forcast = weatherData.forcast;
                airQuality = weatherData.airQuality || {};
                if (airQuality.aqi >= 0 && airQuality.aqi <= 50) {
                    aqiClass = "you";
                    aqiText = "优";
                } else if (airQuality.aqi > 50 && airQuality.aqi <= 100) {
                    aqiClass = "liang";
                    aqiText = "良";
                } else if (airQuality.aqi > 100 && airQuality.aqi <= 150) {
                    aqiClass = "qingdu";
                    aqiText = "轻度污染";
                } else if (airQuality.aqi > 150 && airQuality.aqi <= 200) {
                    aqiClass = "zhongdu";
                    aqiText = "中度污染";
                } else if (airQuality.aqi > 200 && airQuality.aqi <= 300) {
                    aqiClass = "zhongdu2";
                    aqiText = "重度污染";
                } else if (airQuality.aqi > 300) {
                    aqiClass = "yanzhong";
                    aqiText = "严重污染";
                }
                aqiText && (disApi = '空气质量：<em class="' + aqiClass + '">' + aqiText + '</em></a>');
                w = '<a target="_blank" href="http://www.chinaso.com/search/pagesearch.htm?q=%E5%A4%A9%E6%B0%94%E9%A2%84%E6%8A%A5">' +
                    city.city + ' ：' + forcast.weathers[0].weather + " " + forcast.weathers[0].temp +
                    '</a><a target="_blank" href="http://www.chinaso.com/search/pagesearch.htm?q=%E7%A9%BA%E6%B0%94%E8%B4%A8%E9%87%8F" class="air_quality">' + disApi;
                o = document.getElementById(T.defaults.CONST.WID);
                if (o) {
                    o.innerHTML = w;
                }
            }
            return w;
        },
		initBaseEvent: function() {
			var T = this;

			$('.a_user').on('mouseover', function() {
                
				// 每次修改头部结构都要重新定义退出right值。
				// 这里用依靠定义法，获得依靠目标left值，定义给quit位置 - jlj
				$('.quit_box').css({
					left: this.offsetLeft
				}).show();
				return false;
			});
            
			// 移入空白处
			$(document).on('mouseover', function(e) {
				if ($(e.target).closest(".quit_box").length === 0) {
					$(".quit_box").hide();
				}
			});
            $('#jToolbarExit').on('click', function () {
                $(this).PassportLogoutWhy({
                    'basePath': T.defaults.CONF.VSTAR_PATH,
                    'passurl': T.defaults.CONF.URL_EXIT + 'logout/doLogout.htm',
                    'curUrl': encodeURIComponent(window.location.href)
                }, {
                    sucCb: function () {
                        if (/^.*my.chinaso.com.*$/ig.test(location.host)) {
                            window.location.href = T.defaults.CONF.URL_UNAME;
                        }
                        T.updateUserState();
                    },
                    errorCb: function () {
                        T.updateUserState();
                    }
                });
//                City.loadindex = 1;
                return false;
            });
		},
        init: function () {
            var T = this;
            T.render();
            T.initBaseEvent();
            return this;
        }
    });
    
    
//    module.exports = function () {
        var t = new Toolbar();
        
        // 请求天气回调函数
        window.updateWheatherState = function (data) {
            t.updateWheatherState(data);
        }
        t.init();
        return t;
//    };
    
});