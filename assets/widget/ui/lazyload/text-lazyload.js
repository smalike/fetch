define("common:chinaso/page/controller/text.lazyload", ["require", "exports", "module", "common:chinaso/page/controller/utils"], function (require, exports, module) {
    
    "use strict";
    
    var Utils = require("common:chinaso/page/controller/utils");
    
    var TextConvertDom = {
        initialize: function (setting) {
            var T = this;
            T.defaults = {
                offset: 100,
                eles: ".lazy_text_wrapper"
            };
            Utils.extend(T.defaults, setting);
            $(T.defaults.eles).on("showview", function () {
                T.showview(this);
            });
            $(window).on("scroll resize", function () {
                T.isShow();
            });
            T.isShow();
        },
        isShow: function () {
            var T = this,
                $eles = $(T.defaults.eles),
                i, len = $eles.length,
                $ele, dom = (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') ? 
                    document.documentElement : 
                    document.body,
                scrollY = ~~(dom.scrollTop ? dom.scrollTop : window.scrollY);
            for (i = 0; i < len; i++) {
                $ele = $eles.eq(i);
                if (!$ele.data("isshow") && scrollY > $ele.offset().top - T.defaults.offset - dom.clientHeight) {
                    $ele.data("isshow", 1);
                    $ele.trigger("showview");
                }
            }
        },
        showview: function (cur) {
            var $cur = $(cur);
            $($.parseHTML($cur.val())).insertBefore($cur);
            $cur.remove();
        }
    };
    
    return TextConvertDom;
});