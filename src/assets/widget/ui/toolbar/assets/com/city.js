
// 城市处理函数
BL.Com.City = function () {
    return {
        loadindex: 1,
        dsy: null,
        s: ["s_province", "s_city" /**,"s_county"**/ ],
        /***三个select的name**/
        opt0: [ /**,"市、县级市"**/ ],
        /***初始值**/
        /***由经纬度取详细城市信息回调函数**/
        getdetailinfo: function (data) {
            if (data.status == 'OK') {
                var long_name = data.results[0].address_components[2].long_name;
                if (long_name.length <= 0) {
                    long_name = data.results[0].address_components[1].long_name;
                }
                if (!BL.Com.Comm.isEmpty(long_name)) {
                    (long_name.charAt(long_name.length - 1) == "市") && (long_name = long_name.substring(0, long_name.length - 1));
                    var areacode_url = 'http://www.chinaso.com/weather/query/updateWheatherState?city=' + long_name;
                    document.write('<script type="text/javascript" src="' + areacode_url + '"><\/script>');
                }
            }
        },
        /***取经纬度回调函数**/
        getspatial: function (data) {
            if (data.status == '0') {
                var lng = data.lng;
                var lat = data.lat;
                if (!BL.Com.Comm.isEmpty(lng) && !BL.Com.Comm.isEmpty(lat)) {
                    var getdetail_url = 'http://mapsearch.chinaso.com/api/geocode/json?latlng=' + lat + ',' + lng + '&callback=BL.Com.City.getdetailinfo';
                    document.write('<script type="text/javascript" src="' + getdetail_url + '"><\/script>');
                }
            }
        },
        /***取城市回调函数**/
        getlocate: function (data) {
            if (data.status == '0') {
                if (!BL.Com.Comm.isEmpty(data.region)) {
                    var spatial_url = 'http://mapsearch.chinaso.com/api/iplocate.srv?reType=json&locateType=spatial&callback=BL.Com.City.getspatial';
                    document.write('<script type="text/javascript" src="' + spatial_url + '"><\/script>');
                }
            }
        },
        /***获得当前城市**/
        getCurrentCity: function () {
            var day = new Date();
            var areacode_url = 'http://www.chinaso.com/weather/query/updateWheatherState?' + Math.random() * 1000000 + day.toTimeString();
            document.write('<script type="text/javascript" src="' + areacode_url + '"><\/script>');
            /* var iplocate_url = 'http://mapsearch.chinaso.com/api/iplocate.srv?reType=json&locateType=area&callback=BL.Com.City.getlocate';
		document.write('<script src="' + iplocate_url + '"><\/script>');*/
        },
        /***延迟加载城市数据**/
        Dsy: function () {
            this.Items = {};
        },
        renderBack: function () {
            var t = this;
            if (t.loadindex) {
                t.initCitiDataList();
            }
            t.loadindex = 0;
        },
        /***初始化城市列表**/
        initCitiDataList: function () {
            var t = this;
            t.Dsy.prototype.add = function (id, iArray) {
                this.Items[id] = iArray;
            };
            t.Dsy.prototype.addObject = function (obj) {
                if (typeof obj == 'object') {
                    this.Items = $.extend(this.Items, obj);
                }
            };
            t.Dsy.prototype.Exists = function (id) {
                if (typeof (this.Items[id]) == "undefined") return false;
                return true;
            };
            t.dsy = new t.Dsy();

            $.getJSON('http://www.chinaso.com/common/component/toolbar/cityData.json?callback=?', null, function (data) {

            });
        },
        initSelectCityData: function () {
            var t = this;
            var cityData = "";
            for (var v in t.dsy.Items) {
                if (v.indexOf("_") != -1) {
                    for (var i = 0; i < t.dsy.Items[v].length; i++) {
                        cityData += '<option>' + t.dsy.Items[v][i] + '</option>';
                    }
                }
            }
            $("#id_searchCity").html(cityData);
        },
        /***初始化城市列表数据**/
        initNativeCityData: function () {
            var t = this;
            var cityData = "";
            for (var i = 0; i < t.dsy.Items.hotCity.length; i++) {
                cityData += '<li>' + t.dsy.Items.hotCity[i] + '</li>';
            }
            $("#hotCity").html(cityData);
        },
        /***全国三级城市联动**/
        change: function (v) {
            var t = this,
                str = "0",
                i,
                ar;
            for (i = 0; i < v; i++) {
                str += ("_" + (document.getElementById(t.s[i]).selectedIndex));
            }
            var ss = document.getElementById(t.s[v]);
            if (ss) {
                with(ss) {
                    length = 0;
                    //options[0] = new Option(t.opt0[v], t.opt0[v]);
                    if (v && document.getElementById(t.s[v - 1]).selectedIndex >= 0 || !v) {
                        if (t.dsy.Exists(str)) {
                            ar = t.dsy.Items[str];
                            for (i = 0; i < ar.length; i++) {
                                options[length] = new Option(ar[i], ar[i]);
                            }
                            if (v) {
                                options[0].selected = true;
                            }
                        }
                    }
                    if (++v < t.s.length) {
                        t.change(v);
                    }
                }
            }
        },
        initCityChange: function () {
            var t = this,
                i;
            for (i = 0; i < t.s.length - 1; i++) {
                var dd = document.getElementById(t.s[i]);
                if (dd) {
                    dd.onchange = new Function("BL.Com.City.change(" + (i + 1) + ")");
                }
            }
            t.change(0);
        },
        cityJsonCallback: function (data) {
            var t = this;
            if (data && data.data.length > 0) {
                var d = data.data;
                for (var i = 0; i < d.length; i++) {
                    t.dsy.addObject(d[i]);
                }
            }
            t.initNativeCityData();
            t.initSelectCityData();
            $("#id_searchCity").singleSelect({
                changeFunction: "addCityDouble(id_searchCity)"
            });
            t.initCityChange();
        }
    };
}();