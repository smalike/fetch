// 分享组件
define("widget/ui/share/share", ["utils/event/event", "utils/util", "widget/ui/share/theme", "widget/ui/share/to"], function (fetch, exports, module) {
    
    "use strict";
    
    var Event = fetch("utils/event/event"),
        Util = fetch("utils/util"),
        Theme = fetch("widget/ui/share/theme"),
        To = fetch("widget/ui/share/to");
    
    function Share(setting) {
        var _this = this;
        _this.defaults = {
            
            // 主题类型
            themeType: "style0-24",

            // 主题样式文件路径
            cssPath: "widget/ui/share/",

            // 显示分享平台元数据列表
            list: ["tsina", "qzone", "tqq", "renren", "douban"],
            viewText: "分享到：",
            
            // 添加分享代码位置
            eles: "",
                
            // 用来区分是哪个平台
            type: "",

            // 分享的图片地址
            images: "",

            // 内容
            content: document.title,

            // 标题
            title: document.title,
            addURLContent: "",

            // 链接地址
            url: window.location.href,
            wangyi: {
                source: encodeURIComponent("中国搜索")
            },
            kaixin: {
              title: document.title
            },
            weiboAppKey: {
                qq: "",
                sina: "",
                wangyi: "",
                sohu: "",
                yidong139: ""
            },
            disType: "append",
            position: {

                // Use the corner...
                my: "top left",

                // ...and opposite corner
                at: "bottom right"
            }
        };
        _this.defaults = Util.extend(_this.defaults, setting);
        _this.tmpl = Theme.getTmpl({type: _this.defaults.themeType, cssPath: _this.defaults.cssPath, list: _this.defaults.list, viewText: _this.defaults.viewText});
        _this.buildShare();
    }
    
    Util.extend(Share.prototype, {
        getEles: function () {
            var _this = this;
            return _this.defaults.eles.length ? _this.defaults.eles : [_this.defaults.eles];
        },
        buildShare: function () {
            var _this = this,
                eles = _this.getEles(),
                i;
            for (i = 0; i < eles.length; i++) {
                eles[i].innerHTML = _this.tmpl;
                Event.addEventListener(eles[i], "click", function (e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        window.event.returnValue = false;
                    }
                    e.stopPropagation();
                    var target = e.target;
                    _this.defaults.type = target.getAttribute("data-type");
                    To.shareTo(_this.defaults);
                });
            }
        }
    });
    
    module.exports = {
        build: function (setting) {
            var c = new Share(setting);
            return c;
        }
    };
});