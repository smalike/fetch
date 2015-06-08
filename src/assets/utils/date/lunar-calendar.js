
// 时间农历转换
define("utils/date/lunar-calendar", ["utils/util"], function (require, exports, module) {
    
    "use strict";
    
    var Util = require("utils/util");
    
    // 获取农历显示日期
    function LunarCalendar(setting) {
        var T = this;
        T.defaults = {
            
            // 获取农历显示日期的声明
            calendarData: [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95],
            madd: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
            tgString: "甲乙丙丁戊己庚辛壬癸",
            dzString: "子丑寅卯辰巳午未申酉戌亥",
            numString: "一二三四五六七八九十",
            monString: "正二三四五六七八九十冬腊",
            weekString: "日一二三四五六",
            sx: "鼠牛虎兔龙蛇马羊猴鸡狗猪",
            cYear: null,
            cMonth: null,
            cDay: null
        };
        Util.extend(T.defaults, setting);
    }
    
    Util.extend(LunarCalendar.prototype, {
        getBit: function(m, n) {
            return (m >> n) & 1;
        },
        e2c: function() {
            var T = this,
                theDate;
            theDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
            var total, m, n, k;
            var isEnd = false;
            var tmp = theDate.getYear();
            if (tmp < 1900) {
                tmp += 1900;
            }
            total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + T.defaults.madd[theDate.getMonth()] + theDate.getDate() - 38;

            if (theDate.getYear() % 4 == 0 && theDate.getMonth() > 1) {
                total++;
            }
            for (m = 0;; m++) {
                k = (T.defaults.calendarData[m] < 0xfff) ? 11 : 12;
                for (n = k; n >= 0; n--) {
                    if (total <= 29 + T.getBit(T.defaults.calendarData[m], n)) {
                        isEnd = true;
                        break;
                    }
                    total = total - 29 - T.getBit(T.defaults.calendarData[m], n);
                }
                if (isEnd) break;
            }
            T.defaults.cYear = 1921 + m;
            T.defaults.cMonth = k - n + 1;
            T.defaults.cDay = total;
            if (k == 12) {
                if (T.defaults.cMonth == Math.floor(T.defaults.calendarData[m] / 0x10000) + 1) {
                    T.defaults.cMonth = 1 - T.defaults.cMonth;
                }
                if (T.defaults.cMonth > Math.floor(T.defaults.calendarData[m] / 0x10000) + 1) {
                    T.defaults.cMonth--;
                }
            }
        },
        getcDateString: function() {
            var T = this,
                tmp = "";
//            tmp += T.defaults.tgString.charAt((T.defaults.cYear - 4) % 10);
//            tmp += T.defaults.dzString.charAt((T.defaults.cYear - 4) % 12);
//            tmp += "(";
//            tmp += T.defaults.sx.charAt((T.defaults.cYear - 4) % 12);
//            tmp += ")年 ";
            if (T.defaults.cMonth < 1) {
                tmp += "(闰)";
                tmp += T.defaults.monString.charAt(-T.defaults.cMonth - 1);
            } else {
                tmp += T.defaults.monString.charAt(T.defaults.cMonth - 1);
            }
            tmp += "月";
            tmp += (T.defaults.cDay < 11) ? "初" : ((T.defaults.cDay < 20) ? "十" : ((T.defaults.cDay < 30) ? "廿" : "三十"));
            if (T.defaults.cDay % 10 != 0 || T.defaults.cDay == 10) {
                tmp += T.defaults.numString.charAt((T.defaults.cDay - 1) % 10);
            }
            return tmp;
        },
        getLunarDay: function(solarYear, solarMonth, solarDay) {
            var t = this;
            // solarYear = solarYear<1900?(1900+solarYear):solarYear;
            if (solarYear < 1921 || solarYear > 2020) {
                return "";
            } else {
                solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
                t.e2c(solarYear, solarMonth, solarDay);
                return t.getcDateString();
            }
        }
    });
    
    module.exports = function (setting) {
        return new LunarCalendar(setting);
    };
    
});
