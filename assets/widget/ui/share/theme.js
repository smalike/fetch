// 分享组件主题样式
define("common:chinaso/page/common/widget/ui/share/theme", function (require, exports, module) {
    "use strict";
    var Theme = {
        config: {
            tmpl: {tsina: "新浪微博", qzone: "QQ空间", tqq: "腾讯微博", renren: "人人网", douban: "豆瓣网", t163: "网易微博"}
        },
//        tmpl: '<i class="">分享到：</i><a class="csos_tsina" data-type="tsina" href="#" title="新浪微博"></a><a class="csos_tqq" data-type="tqq" href="#" title="腾讯微博"></a><a class="csos_twangyi" data-type="twangyi" href="#" title="网易微博"></a><a class="csos_qq" data-type="qq" href="#" title="QQ空间"></a><a class="csos_renren" data-type="renren" href="#" title="人人网"></a><a class="csos_douban" data-type="douban" href="#" title="豆瓣网"></a>',
        getTmpl: function (themeParam) {
            var _this = this,
                cls = themeParam.type;
            _this.loadThemeCss(themeParam.cssPath + themeParam.type + ".css");
            return '<div class="csos-' + cls + '">' + _this.buildTmpl(themeParam) + '</div>';
        },
        buildTmpl: function (param) {
            var _this = this,
                tmpl = "",
                i,
                item;
            if (param.viewText) {
                tmpl += '<i class="fl">' + param.viewText + '</i>';
            }
            for (i = 0; i < param.list.length; i++) {
                item = param.list[i];
                tmpl += '<a class="csos_' + item + '" data-type="' + item + '" href="#" title="' + _this.config.tmpl[item] + '"></a>';
            }
            return tmpl;
        },
        loadThemeCss: function (path) {
            var head = document.getElementsByTagName("head")[0],
                link = document.createElement("link");
            link.href = path;
            link.rel = "stylesheet";
            link.type = "text/css";
            head.appendChild(link);
        }
    };
    return Theme;
});