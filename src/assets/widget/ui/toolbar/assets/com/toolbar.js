BL.Com.Toolbar = (function (BL) {
    var CONST = {
        content: "",

        // 组件id
        CID: "jToolbar",

        // 注册id
        REGID: "jToolbarReg",

        // 登陆id
        LGID: "jToolbarLogin",

        // 返回首页id
        BACKID: "jToolbarBack",

        // 收藏id
        FID: "jToolbarFav",

        // 设置主页id
        HPID: "jToolbarHomepage",

        // 天气id
        WID: "jToolbarWeather",

        // 日期id
        TID: "jToolbarTime",

        // 用户名id
        UNID: "jToolbarUserName",

        // 退出id
        EXITID: "jToolbarExit",

        // 用户区id
        UAREA: "jToolbarUser",
        COOKIE_LOGIN: "chinasoticket_titlename",
        COOKIE_USER_NAME: "chinasoticket_titlename"
    },
    CONF = {
        URL_UNAME: "http://www.chinaso.com/",

        // 新域名
        URL_UNAME: "http://www.chinaso.com/",

        // 用户名网址
        URL_LOGIN: "http://my.chinaso.com/",

        // 登陆域名
        URL_REG: "http://my.chinaso.com/",

        // 注册域名
        URL_PASSPORT_BASE: "https://passport.chinaso.com/",
        URL_EXIT: "https://passport.chinaso.com/",

        // 退出域名
        URL_AJAX_EXIT: "https://passport.chinaso.com/logout/doLogout.htm",
        VSTAR_PATH: "http://my.chinaso.com/",
        PASSPORT_PATH: "https://passport.chinaso.com/",
        URL_INDEX: "http://www.chinaso.com",
        URL_WEATHER: "http://www.chinaso.com/weather/query/"
    },
    cookieUtil = BL.Util.Cookie,
    timeUtil = BL.Util.Time,
    fav = BL.Util.FavSite,
    ev = BL.Util.Event,
    pageRankElems,
    timeArr;


//    cookieUtil.set(CONST.COOKIE_LOGIN,"dd",null,".panguso.com","/");
//    cookieUtil.set(CONST.COOKIE_USER_NAME,"wxm@163.com",null,".panguso.com","/");

    function isLogin() {
        var lgc = cookieUtil.get(CONST.COOKIE_LOGIN, true);
        if (lgc !== null) {
            return true;
        } else {
            return false;
        }
    }

    //  function getPageRank() {
    // var elems = BL.Util.Dom.getElementsByClassName("top_data"),
    //   fragment = document.createDocumentFragment(),
    //   navs = CONST.TOP_NAV,
    //   len = navs.length,
    //   i,
    //   elem,
    //   nav,
    //   txt;
    // if (elems.length > 0) {
    //   for (i = 0; i < len; i++) {
    // 	elem = document.createElement("a"),
    // 	nav = navs[i],
    // 	txt = document.createTextNode(nav.channal);
    // 	elem.href = nav.url;
    // 	elem.appendChild(txt);
    // 	fragment.appendChild(elem);
    //   };
    //   elems[0].innerHTML = "";
    //   elems[0].appendChild(fragment);
    // }
    // return elems;
    //  }

    pageRankElems = [] /*getPageRank()暂时取消二级页面判断显示导航，默认全部显示天气信息*/ ;

    /***
     * 判断是不是主页。chenbc 2013-11-28
     **/
    function isHomePage() {
        if (/^http:\/\/((www\.chinaso\.com\/index.+)|(chinaso\.com\/)|(my\.chinaso\.com.+)|(www\.chinaso\.com\/?))$/.test(location.href)) {
            return true;
        } else {
            return false;
        }
    }

    function getUserState() {
        var uarea = document.getElementById(CONST.UAREA),
            uname,
            html,
            weatherother,
            downloadA,
            downloadDiv;

        weatherother = '<div class="weather_other">' + '<i id="wo_switch">其它城市天气</i>' + '<div class="wo_box hide">' + '<div class="wo_box_wrap">' + '<div class="wo_search">' + '<ul class="list17" id="wo_city_list">' + '<li class="last" id="wo_last_input"><select class="input3" id="id_searchCity" placeholder="输入城市全拼/简拼"></select></li>' + '</ul>' + '<div class="clear"></div>' + '</div>' + '<div class="wo_tab"><a href="#" class="cur">热门城市</a><a href="#">省市</a></div>' + '<div class="wo_cont_box">' + '<div class="wo_cont">' + '<div class="h6"></div>' + '<ul class="list15" id="hotCity">' + '</ul>' + '<div class="h6 clear"></div>' + '</div>' + '<div class="wo_cont hide">' + '<div class="wo_sel_box">' + '<select multiple="multiple" name="s_province" id="s_province">' + '</select>' + '</div>' + '<div class="wo_sel_box">' + '<select multiple="multiple" id="s_city" name="s_city">' + '</select>' + '</div>' + '<div class="clear"></div>' + '</div>' + '</div>' + '<div class="wo_submit"><p><input type="button" class="btn3 mgr5" id="weatherSubmit" value="保存" /><input type="button" class="btn4" id="cancelSel" value="取消" /></p><span>您最多可同时选择3个城市</span></div>' + '</div>' + '<div class="wo_box_wrap hide">' + '<div class="wo_detail_box">' + '<ul class="list16">' + '<li class="wo_color1"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color2"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color3 last"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '</ul>' + '<ul class="list16 hide">' + '<li class="wo_color1"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color2"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color3 last"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '</ul>' + '<ul class="list16 hide">' + '<li class="wo_color1"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color2"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '<li class="wo_color3 last"><h1></h1><h2></h2><h3></h3><h4></h4></li>' + '</ul>' + '</div>' + '<div class="wo_detail_text"><p id="wo_sel_day"><a href="#" class="cur">今天</a><i>|</i><a href="#">明天</a><i>|</i><a href="#">后天</a></p><strong id="resetCity">重新设定</strong></div>' + '</div>' + '</div>' + '</div>';
        /*
		旧版下载地址：http://m.chinaso.com/wsdownload.html
		新版下载地址：http://www.chinaso.com/home/app_download.html
	 */
        // 删除“返回首页”修改：downloadA删除 <span>|</span> - jlj
        downloadA = '<a href="http://m.chinaso.com/wsdownload.html" class="a_download" target="_blank">移动客户端</a>';
        var downloadA2 = '<a href="http://m.chinaso.com/wsdownload.html" class="a_download" target="_blank">移动客户端</a>';
//        var appApplication = '<a href="http://app.chinaso.com" class="a_download app-red" target="_blank">国搜应用</a>';
        var versionSel = '<a href="javascript:void(0)" class="a_version">版本选择<i class="arrow_down"></i></a>';
        downloadDiv = ''; //'''<div class="download_box hide"><dl class="list18"><dt>选择下载平台</dt><dd><a href="http://news.chinaso.com/download/chinasoNews_web.apk">Android版</a></dd><dd><a href="http://news.chinaso.com/download/chinasoNews_web.ipa">iOS版</a></dd></dl></div>'
        if (isHomePage()) { /***主页**/
            if (isLogin()) { /***登陆状态**/
                uname = cookieUtil.get(CONST.COOKIE_USER_NAME, true) || "";
                //uname = uname.substring(0, uname.indexOf("@"));
                html = '<div id="jToolbarUser" class="account">' + '<div class="skinOpen">' +
                    '<b class="head_pic"></b><a href="javascript:void(0)" class="a_user">' + uname +
                    '<i class="arrow_down"></i></a>' +
//                    appApplication + '<span>|</span>' + 
                    downloadA2 + '<span>|</span><a target="_blank" id="jToolbarHomepage" href="http://www.chinaso.com" ' +
                    'onclick="setHome(this, \'http:\/\/www.chinaso.com\');">设国搜为主页</a>' + '</div>' +
                    
//                  downloadDiv +
                    '<div class="quit_box hide"><ul class="list51"><li><a target="_blank" href="http://wenda.chinaso.com/user/score.html">我的问答</a></li>' +
                    '<li><a target="_blank" href="http://forum.chinaso.com/home.php?mod=spacecp&ac=profile">我的论吧</a></li>' +
                    '<li><a target="_blank" href="http://baike.chinaso.com/wiki/user-doccontri-create.html">我的百科</a></li>' +
                    '<li class="last"><a id="jToolbarExit" href="javascript:void(0);">退出</a></li></ul></div></div>' +
                    '<div class="fl top_data">' + '<span id="jToolbarTime">' + setTimeArea() + '</span><a href="http://www.chinaso.com/search/pagesearch.htm?q=%E5%86%9C%E5%8E%86" target="_blank" class="date_lunar">' +
                    getCurCNDDate() + '</a><i>|</i><span id="jToolbarWeather"></span>' + '</div>' + weatherother;
            } else { /***非登陆**/
                var redirect = window.location.href;
                var loginUrl = CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect)));
                var registerUrl = CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect))) + "#register";
                html = '<div id="jToolbarUser" class="account">' + '<div class="skinOpen">' + '<a id="jToolbarLogin" href="' + loginUrl + '" class="a_login">登录</a><a id="jToolbarReg" href="' + registerUrl + '">注册</a><span>|</span>' +
                    // versionSel 
                    //				+ appApplication +'<span>|</span>' + 
                    downloadA2 + '<span>|</span><a target="_blank" id="jToolbarHomepage" href="http://www.chinaso.com"' + '  onclick="setHome(this, \'http:\/\/www.chinaso.com\');">设国搜为主页</a>' + '</div>' + 
                    
                    // downloadDiv + 
                    '</div>' + 
                    '<div class="fl top_data">' + '<span id="jToolbarTime">' + setTimeArea() + '</span><a href="http://www.chinaso.com/search/pagesearch.htm?q=%E5%86%9C%E5%8E%86" target="_blank" class="date_lunar">' + getCurCNDDate() + '</a><i>|</i><span id="jToolbarWeather"></span>' + '</div>' + weatherother;
            }
        } else { /***非主页**/
            if (isLogin()) { /***登陆状态**/
                uname = cookieUtil.get(CONST.COOKIE_USER_NAME, true) || "";
                //uname = uname.substring(0, uname.indexOf("@"));
                /*<a href="' + CONF.URL_INDEX + '">返回首页</a>*/
                html = '<div id="jToolbarUser" class="account">' + '<div class="skinOpen">' + '<b class="head_pic"></b><a href="javascript:void(0)" class="a_user">' + uname + '<i class="arrow_down"></i></a>' +
                    //                    appApplication + '<span>|</span>' + 
                    downloadA + '<span>|</span><a target="_blank" id="jToolbarHomepage" href="http://www.chinaso.com"' + ' onclick="setHome(this, \'http:\/\/www.chinaso.com\');">设国搜为主页</a>' + '</div>' + 
//                    downloadDiv + 
                    '<div class="quit_box hide noindex_pos">' + '<ul class="list51">' +
                    '<li><a target="_blank" href="http://wenda.chinaso.com/user/score.html">我的问答</a></li>' +
                    '<li><a target="_blank" href="http://forum.chinaso.com/home.php?mod=spacecp&ac=profile">我的论吧</a></li>' +
                    '<li><a target="_blank" href="http://baike.chinaso.com/wiki/user-doccontri-create.html">我的百科</a></li>' +
                    '<li class="last"><a id="jToolbarExit" href="javascript:void(0);">退出</a></li></ul>' +
                    '</div>' + '</div>' + '<div class="fl top_data">';
                if (pageRankElems.length > 0) {
                    html += pageRankElems[0].innerHTML;
                    html += '</div>';
                } else {
                    html += '<span id="jToolbarTime">' + setTimeArea() +
                        '</span><a target="_blank" href="http://www.chinaso.com/search/pagesearch.htm?q=%E5%86%9C%E5%8E%86" class="date_lunar">' + getCurCNDDate() + '</a><i>|</i><span id="jToolbarWeather"></span></div>' + weatherother;
                }

                /*$(document).on('click', '#jToolbarExit', function() {
		  $(this).PassportLogoutWhy({
			'basePath': CONF.VSTAR_PATH,
			'passurl': CONF.URL_EXIT + '/logout/doLogout.htm'
		  }, {
			sucCb: function() {
			  BL.Com.Toolbar.update();
			},
			errorCb: function() {
			  BL.Com.Toolbar.update();
			}
		  });
		});*/

            } else { /***非登陆**/
                var redirect = window.location.href;
                var loginUrl = CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect)));
                var registerUrl = CONF.URL_LOGIN + "login.jsp?url=http://my.chinaso.com/ts.htm?u=" + encodeURIComponent(encodeURIComponent(encodeURIComponent(redirect))) + "#register";
                /*<a href="' + CONF.URL_INDEX + '">返回首页</a>  注册 修改<span>|</span>*/
                html = '<div id="jToolbarUser" class="account">' + '<div class="skinOpen">' + '<a id="jToolbarLogin" href="' + loginUrl + '" class="a_login">登录</a><a id="jToolbarReg" href="' + registerUrl + '">注册</a><span>|</span>' +
//                    appApplication + '<span>|</span>' + 
                    downloadA + '<span>|</span><a target="_blank" id="jToolbarHomepage" href="http://www.chinaso.com"' + ' onclick="setHome(this, \'http:\/\/www.chinaso.com\');">设国搜为主页</a></div>' + 
//                    downloadDiv + 
                    '</div>' + '<div class="fl top_data">';
                if (pageRankElems.length > 0) {
                    html += pageRankElems[0].innerHTML;
                } else {
                    html += '<span id="jToolbarTime">' + setTimeArea() + '</span><a target="_blank" href="http://www.chinaso.com/search/pagesearch.htm?q=%E5%86%9C%E5%8E%86" class="date_lunar">' +
                        getCurCNDDate() + '</a><i>|</i><span id="jToolbarWeather"></span>'
                }
                html += '</div>' + weatherother;
            }
        }
        html = '<div class="top_con">' + html + '</div>';
        return html;
    }

    /***
     * 将请求中的关键字进行转码，避免中文乱码问题。songxg 2012-11-11
     **/
    function encodeKeyword(url) {
        var arr = url.split('&');
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i].indexOf('q') != -1) {
                var kw = arr[i].substring(arr[i].indexOf('q'));
                var convertKw = encodeURI(kw);
                arr[i] = arr[i].replace(kw, convertKw);
            }
        }

        return arr.join('&');
    }

    function updateUserState() {
        var u = document.getElementById(CONST.CID),
            wh;
        if (u) {
            wh = document.getElementById(CONST.WID).innerHTML;
            u.innerHTML = getUserState();
            document.getElementById(CONST.WID).innerHTML = wh;
            BL.Com.OperationAndExtend.initWeatherEvent();
        }
    }

    function render() {
        var toolbar = document.getElementById(CONST.CID);
        var content = getUserState();
        var wrapper = '<div class="top" id="jToolbar">' + content + '</div>';
        if (typeof toolbar === undefined) {
            document.writeln(wrapper);
        } else {
            toolbar.innerHTML = content;
        }
        if (pageRankElems.length <= 0) {
            /*BL.Com.City.getCurrentCity();*/
            BL.Com.Weather.getWeatherData();
        }
    }

    function logout() {
        BL.Util.JSONP(CONF.URL_AJAX_EXIT, "BL.Com.Toolbar.updateUserState");
    }

    /***注册用户相关事件**/
    function bindUserEvent() {
        var exit = document.getElementById(CONST.EXITID);
        if (exit) {
            ev.addHandler(exit, "click", logout);
        }
    }

    function unBindUserEvent() {
        var exit = document.getElementById(CONST.EXITID);
        if (exit) {
            ev.removeHandler(exit, "click", logout);
        }
    }

    function getCurDate() {
        return timeArr[0] + " " + timeUtil.getDay();;
    }

    function getCurCNDDate() {
        return timeArr[1];
    }

    function setTimeArea() {
        timeArr = timeUtil.getFormatDate();
        var d = getCurDate();
        /***var o = document.getElementById(CONST.TID);
	 if(o){
	   o.innerHTML = d;
	 }**/
        return d;
    }

    function getWheather(city, callback) {
        /***@example{s.src = "http://www.chinaso.com/weather/query/BL.Com.Toolbar.updateWheatherState?city=北京";}**/
        city = city || "北京";
        callback = callback || "updateWheatherState";
        var params = callback + "?city=" + city;
        BL.Util.JSONP(CONF.URL_WEATHER + params);
    }

    function updateWheatherState(weatherData) {
        BL.Com.Weather.fillStorageWeatherData(weatherData);
        return formatWeatherData(weatherData);
    }

    function formatWeatherData(weatherData) {
        var city,
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
            /***@view{<span>北京：晴 33 ～23℃</span><span class="air_quality">空气质量：86</span><em>轻度污染</em>}**/
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
            o = document.getElementById(CONST.WID);
            if (o) {
                o.innerHTML = w;
            }
        }
        return w;
    }

    // 整理去掉收藏功能
    //  function bindFavEvent() {
    // var f = document.getElementById(CONST.FID);
    // if (f) {
    //   ev.addHandler(f, "click", function() {
    // 	// mark.add(f);
    // 	fav.add(window.location.href, document.title);
    //   });
    // }
    //  }

    function bindExitEvent() {

        $('#jToolbarExit').on('click', function () {
            $(this).PassportLogoutWhy({
                'basePath': CONF.VSTAR_PATH,
                'passurl': CONF.URL_EXIT + 'logout/doLogout.htm',
                'curUrl': encodeURIComponent(window.location.href)
            }, {
                sucCb: function () {
                    if (/^.*my.chinaso.com.*$/ig.test(location.host)) {
                        window.location.href = CONF.URL_UNAME;
                    }
                    BL.Com.Toolbar.update();
                },
                errorCb: function () {
                    BL.Com.Toolbar.update();
                }
            });
            BL.Com.City.loadindex = 1;
            return false;
        });
    }



    function init(conf) {

        render();

        /***CONF = $.extend(CONF,conf);**/

        /***bindUserEvent();**/
        /***收藏网址**/
        // bindFavEvent(); 取消该功能
        bindExitEvent();

        return this;
    }

    /***登陆退出事件**/

    return {
        init: init,
        update: updateUserState,
        conf: CONF,
        updateWheatherState: updateWheatherState,
        formatWeatherData: formatWeatherData,
        getWheather: getWheather,
        isLogin: isLogin,
        pageRankElems: pageRankElems
    }

})(BL);