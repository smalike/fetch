
// 城市处理函数
define("widget/ui/toolbar/com-toolbar/city", ["widget/com/jsonp"], function (require, exports, module) {
    
    "use strict";
    
    var JSONP = require("widget/com/jsonp");
    
    var City = {

        // 获得当前城市
        getCurrentCity: function () {
            JSONP('http://www.chinaso.com/weather/query/updateWheatherState?' + Math.random() * 1000000 + (new Date()).toTimeString());
        }
    }
});