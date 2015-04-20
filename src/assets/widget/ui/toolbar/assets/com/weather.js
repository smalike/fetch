
// 天气情况显示
// 调用本地存储功能
BL.Com.Weather = function () {
    var weatherStorageKey = "chinasoWeather",
        timestampDay = 0.166,
        /*0.00138提供测试2分钟存储*/
        storageObj = new BL.Com.Storage(weatherStorageKey, timestampDay);
    return {
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
            var self = this,
                storageVal = storageObj.get(weatherStorageKey) || null;
            storageVal ?
                (+BL.Com.Comm.t - storageVal.expires > 999 ?
                    self.requestWeatherData() :
                    BL.Com.Toolbar.formatWeatherData(storageVal)) :
                self.requestWeatherData();
        },
        requestWeatherData: function () {
            BL.Com.City.getCurrentCity();
        },
        fillStorageWeatherData: function (weatherData) {
            var self = this,
                expires = new Date().getTime() + (1000 * 60 * 60 * (24 * timestampDay));
            weatherData.expires = +expires,
                storageObj.set(weatherStorageKey, weatherData)
                /*,
                 	BL.Com.Toolbar.updateWheatherState(weatherData)*/
            ;
        }
    };
}();