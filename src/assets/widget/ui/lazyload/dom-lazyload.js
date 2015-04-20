define("assets/widget/ui/lazyload/dom-lazyload", ["assets/utils/util", "assets/utils/event/publish", "jquery"], function (require, exports, module) {
    
    "use strict";
    
    var Utils = require("assets/utils/util"),
        Publish = require("assets/utils/event/publish"),
        $ = require("jquery");
    function DomLazyload(setting) {
        var T = this;
        T.defaults = {
            eles: ".lazy_wrapper",
            loadingCls: "wrapper_loading",
            lazyNav: "#lazy_nav",
            fatchType: "GET",
            fatchDataType: "html",
            offset: 100,
            isFatchUrls: true
        };
        Utils.extend(T.defaults, setting);
        T.init();
        T.isShow();
    }
    
    Utils.extend(DomLazyload.prototype, {
        init: function () {
            var T = this;
            $(T.defaults.eles).on("showview", function () {T.showview(this);});
            $(window).on("scroll resize", function (e) {
                T.isShow();
            });
        },
        isShow: function () {
            var T = this,
                $eles = $(T.defaults.eles),
                i,
                len = $eles.length,
                $ele,
                dom = (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') ?  document.documentElement : document.body,
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
            var T = this,
                $cur = $(cur);
            if (T.defaults.isFatchUrls) {
                T.fatchMore($cur, T.getUrlArr(cur));
            } else {
                T.fatch(T.getUrl(cur), T.defaults.fatchType, T.defaults.fatchDataType).done(function (html) {
                    $cur.removeClass(T.defaults.loadingCls);
                    $cur.append(html);
                    T.publish($cur);
                });
            }
        },
        getUrlArr: function (cur) {
            var T = this,
                url;
            url = $(T.defaults.lazyNav).find("a").eq($(cur).index(T.defaults.eles)).attr("href");
            return url.split(",");
        },
        getUrl: function (cur) {
            var T = this;
            return $(T.defaults.lazyNav).find("a").eq($(cur).index(T.defaults.eles)).attr("href");
        },
        asyncEvent: function (urls) {
            var T = this,
                i,
                len = urls.length,
                resolveCount = len,
                dfd = new jQuery.Deferred,
                jsonArr = [];
            for (i = 0; i < len; i++) {
                (function (i) {
                    T.fatch(urls[i], T.defaults.fatchType, T.defaults.fatchDataType).done(function (html) {
                        jsonArr[i] = html;
                        if (!--resolveCount) {
                            dfd.resolve(jsonArr.join(""));
                        }
                    });
                }(i));
            }
            return dfd.promise();
        },
        fatchMore: function ($cur, urls) {
            var T = this;
            $.when(T.asyncEvent(urls)).done(function (a) {
                $cur.removeClass(T.defaults.loadingCls);
                $cur.append(a);
                T.publish($cur);
            });
        },
        fatch: function (url, type, dataType) {
            return $.ajax({
                url: url,
                type: type,
                dataType: dataType
            });
        },
        publish: function ($cur) {
            Publish({attrs: $cur.data("bind")});
        }
    });
    
    module.exports = {
        build: function (setting) {
            var d = new DomLazyload(setting);
            return d;
        }
    };
});