// 加入收藏
define("assets/widget/com/mark", ["assets/utils/util"], function (require, exports, module) {
    
    "use strict";
    
    var Util = require("assets/utils/util");
    
    function Mark() {
        this.defaults = {
            isIEmac: false,
            isMSIE: (-[1, ]) ? false : true,
            cjHref: location.href
        };
    }

    Util.extend(Mark.prototype, {
        hotKeys: function () {
            var ua = navigator.userAgent.toLowerCase();
            var str = '';
            var isWebkit = (ua.indexOf('webkit') != -1);
            var isMac = (ua.indexOf('mac') != -1);

            if (ua.indexOf('konqueror') != -1) {

                // Konqueror
                str = 'CTRL + B';
            } else if (window.home || isWebkit || this.defaults.isIEmac || isMac) {

                // Netscape, Safari, iCab, IE5/Mac
                str = (isMac ? 'Command/Cmd' : 'CTRL') + ' + D';
            }
            return ((str) ? 'Press ' + str + ' to bookmark this page.' : str);
        },
        isIE8: function () {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) !== null) {
                    rv = parseFloat(RegExp.$1);
                }
            }
            if (rv > -1) {
                if (rv >= 8.0) {
                    return true;
                }
            }
            return false;
        },
        add: function (a, cjTitle) {
            try {
                if (typeof a == "object" && a.tagName.toLowerCase() == "a") {
                    a.style.cursor = 'pointer';
                    if ((typeof window.sidebar == "object") && (typeof window.sidebar.addPanel == "function")) {

                        // Gecko
                        window.sidebar.addPanel(cjTitle, this.defaults.cjHref, "");
                        return false;
                    } else if (this.defaults.isMSIE && typeof window.external == "object") {
                        if (this.isIE8()) {

                            // IE 8
                            window.external.AddToFavoritesBar(this.defaults.cjHref, cjTitle);
                        } else {

                            // IE <=7
                            window.external.AddFavorite(this.defaults.cjHref, cjTitle);
                        }
                        return false;
                    } else if (window.opera) {
                        a.href = this.defaults.cjHref;
                        a.title = cjTitle;

                        // Opera 7+
                        a.rel = 'sidebar';
                        return true;
                    } else {
                        this.hotKeys();
                    }
                } else {
                    throw "Error occured.\r\nNote, only A tagname is allowed!";
                }
            } catch (err) {
            }
        }
    });
    
    return new Mark;
});
