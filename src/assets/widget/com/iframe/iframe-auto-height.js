define("common:chinaso/page/controller/iframeAutoHeight", function (require, exports, module) {
    "use strict";
    function iframeAutoHeight(setting) {
        var self = this;
        this.defaults = {};
        document.domain = "chinaso.com";
        jQuery.extend(this.defaults, setting);
        self.myIframes = document.getElementsByTagName('iframe');
        self.initialize();
    }
    
    jQuery.extend(iframeAutoHeight.prototype, {
        initialize: function () {
            var self = this;
            if (document.getElementById && document.createTextNode) {
                self.addEvent(window, 'load', self.doIframe);
                self.addEvent(window, 'resize', function () {
                    clearTimeout(self.resizeTimeId);
                    self.resizeTimeId = setTimeout(function () {
                        self.doIframe();
                    }, 300);
                });
            }
        },
        doIframe: function () {
            var self = this
                , i
                ;
            for (i = 0; i < self.myIframes.length; i++) {
                if (/\bautoHeight\b/.test(self.myIframes[i].className)) {
                    self.setHeight(self.myIframes[i]);
                    self.addEvent(self.myIframes[i], 'load', self.doIframe);
                }
            }
        },

        setHeight: function (e) {
            if(e.contentDocument){
                e.height = e.contentDocument.body.offsetHeight;
            } else {
                e.height = e.contentWindow.document.body.scrollHeight;
            }
        },

        addEvent: function (obj, evType, fn) {
            var self = this;
            if (obj.addEventListener) {
                obj.addEventListener(evType, function (e) {
                    fn.call(self, e);
                }, false);
                return true;
            } else if (obj.attachEvent) {
                var r = obj.attachEvent("on"+evType, function (e) {
                    fn.call(self, e);
                });
                return r;
            } else {
                return false;
            }
        }
    });
    module.exports = {
        build: function () {
            var i;
            return i = new iframeAutoHeight(), i;
        }
    };
});