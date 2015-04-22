define("assets/widget/ui/passport/passport", ["assets/utils/util", "assets/widget/com/jsonp"], function (require, exports, module) {
    
    "use strict";
    
    var Util = require("assets/utils/util"),
        JSONP = require("assets/widget/com/jsonp");
    
    function Passport(setting) {
        this.defaults = {
            basePath: "",
            passurl: 'http://passport.chinaso.com/logout.htm',
            scall: !0,
            errorCb: function () {
                alert('服务失败，请稍候再试!');
            },
            failCb: function () {
                alert('退出失败，请稍候再试！');
            },
            sucCb: function () {
                alert('退出成功！');
            },
            finishCb: function () {}
        };
        Util.extend(this.defaults, setting);
    }
    
    Util.extend(Passport.prototype, {
        passportLogout: function () {
            var T = this;
            T.send(true);
        },
        send: function () {
            var T = this,
                passurl = T.defaults['passurl'] + "?basePath=" + T.defaults.basePath + "&curUrl=" + T.defaults.curUrl;
            JSONP(passurl, "passportJsonpcallback");
        },
        passportJsonpcallback: function (data) {
            var T = this,
                c = data.flag;
            if (c == 0) {
                if (T.defaults.scall) {
                    var turl = T.defaults.basePath + "ts.htm?u=" + decodeURIComponent(data.url);
                    if (data.logout) {
                        turl += "&logout=1";
                    };
                    window.location.href = turl;
                } else {
                    T.defaults.sucCb();
                }
            } else {

                //未成功，回调错误处理函数
                T.defaults.failCb(c);
            }
        }
    });
    
    module.exports = function (setting) {
        var p = new Passport(setting);
        window.passportJsonpcallback = function (data) {
            p.passportJsonpcallback(data);
        }
        return p;
    };
    
});