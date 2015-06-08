// 提示组件
// @author jlj
define("widget/ui/tip/tip", ["utils/util"], function (fetch, exports, module) {
    
    "use strict";
    
    var Utils = fetch("utils/util");
    
    function Tip(setting) {
        var T = this;
        T.defaults = {
            
            // 提示停顿时间
            wait: 500,
            
            // 提示动画偏移距离
            offset: 20,
            
            // 显示动画时长
            showSpeed: 300,
            
            // 隐藏动画时长
            hideSpeed: 100,
            
            isLoadCss: !0,
            baseCssPath: "",
            cssPath: "widget/ui/tip/tip.css"
        };
        Utils.extend(T.defaults, setting);
        T.defaults.isLoadCss && T.loadCss(T.defaults.baseCssPath + T.defaults.cssPath);
    }
    
    Utils.extend(Tip.prototype, {
        
        // 生成提示信息
        tip: function (top, left, message) {
            var T = this,
                $tip = $('<div style="display: none; position: absolute; text-align: center; z-index: 999999; top: ' + top + 'px; left: ' + left + 'px;"><div class="tooltip"><div class="tooltipMsg" style="width:60px">' + message + '</div><div class="tips_sanjiao" style="top:28px;left:27px"></div></div></div>');
            $("body").append($tip);
            $tip.css({
                
                // 设置提示居中
                left: left - $tip.width() / 2
            });
            
            // 订阅提示框显示、隐藏触发
            $tip.on("show", function () {T.tipShow(this);});
            $tip.on("hide", function () {T.tipHide(this);});
            setTimeout(function () {
                $tip.trigger("hide");
            }, T.defaults.wait);
            $tip.trigger("show");
        },
        
        // 显示提示信息
        tipShow: function (cur) {
            var T = this;
            $(cur).show().animate({
                top: "-=" + T.defaults.offset
            }, T.defaults.showSpeed);
        },
        
        // 隐藏提示信息
        tipHide: function (cur) {
            var T = this,
                $cur = $(cur);
            $cur.animate({
                top: "-=" + T.defaults.offset
            }, T.defaults.hideSpeed, function () {
                $(this).remove();
            });
        },
        loadCss: function (path) {
            var head = document.getElementsByTagName("head")[0],
                link = document.createElement("link");
            link.href = path;
            link.rel = "stylesheet";
            link.type = "text/css";
            head.appendChild(link);
        }
    });
    
    module.exports = {
        P: Tip,
        build: function (setting) {
            var t = new Tip(setting);
            return t;
        }
    };
});