
// 天气情况显示
// 调用本地存储功能
define("assets/widget/ui/toolbar/com-toolbar/weather", ["assets/utils/util", "assets/utils/storage"], function (require, exports, module) {
    
    "use strict";
    
    var Util = require("assets/utils/util"),
        Storage = require("assets/utils/storage");
    
    function Weather(setting) {
        var T = this;
        T.defaults = {
            weatherStorageKey: "chinasoWeather",
            timestampDay: 0.166
        };
        
        Util.extend(T.defaults, setting);
        
        // 0.00138提供测试2分钟存储
        T.storageObj = new Storage(T.defaults.weatherStorageKey, T.defaults.timestampDay);
    }
    
    Util.extend(Weather.prototype, {
        isExists: function (text, flag) {
            var index = text.indexOf(flag);
            return {
                index: index,
                isTrue: index !== -1 ? 1 : 0
            }
        },
        weatherCut: function (data) {
            var t = this;
            var strExists = t.isExists(data, "转");
            if (strExists.isTrue) {
                return data.substring(0, strExists.index);
            }
            return data;
        },
        getWeatherData: function () {
            var T = this;
            return T.storageObj.get(T.defaults.weatherStorageKey) || null;
        },
        fillStorageWeatherData: function (weatherData) {
            var T = this,
                expires = new Date().getTime() + (1000 * 60 * 60 * (24 * T.defaults.timestampDay));
            weatherData.expires = +expires;
            T.storageObj.set(T.defaults.weatherStorageKey, weatherData);
        }
    });
    
    module.exports = function (setting) {
        return new Weather(setting);
    };
    
});