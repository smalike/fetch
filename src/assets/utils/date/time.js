
// 处理显示当前日期
define("assets/utils/date/time", ["assets/utils/util"], function (require, exports, module) {
    
    "use strict";
    
    var Util = require("assets/utils/util");
    
    var Time = {
        
        // 获得星期字符形式
        getDay: function () {
            var arr = ["日", "一", "二", "三", "四", "五", "六"];
            var day = "周" + arr[new Date().getDay()];
            return day;
        },
        converte: function(str) {
            var strArray;
            var strDate;
            var strTime;
            if (Util.isDate(str)) {
                return str;
            }
            strArray = str.split(" ");
            strDate = strArray[0].split("-");
            strTime = strArray[1] ? strArray[1].split(":") : [0, 0, 0];
            return (new Date(strDate[0], (strDate[1] - parseInt(1)), strDate[2], strTime[0], strTime[1], (strTime[2]?strDate[2]:0)));
        },
        datafomatZero: function(param) {
            param = ~~param;
            return param < 10 ? "0" + param : param + "";
        },
        
         // 显示绝对时间
         // @param  {Date} original 原始时间
         // @param  {Date} curDate  当前时间
         // @return {String}          转换后日期
         //
        doTransferAbso: function(original, curDate) {
            var t = this,
                resultStr,
                year,
                month,
                day,
                hours,
                minutes,
                curYear,
                curMonth,
                curDay;
            original = t.converte(original),
            curDate = curDate || new Date(),
            
            // 设置传入时间的毫秒为0
            original.setMilliseconds(0),
                
            // 设置当前时间的毫秒为0
            curDate.setMilliseconds(0),
            year = original.getFullYear(),
            month = original.getMonth() + 1,
            day = original.getDate(),
            hours = original.getHours(),
            minutes = original.getMinutes(),
            curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth() + 1,
            curDay = curDate.getDate();
            if (year !== curYear) {
                resultStr = year + "-" + t.datafomatZero(month) + "-" + t.datafomatZero(day) + " " + t.datafomatZero(hours) + ":" + t.datafomatZero(minutes);
            } else if (month !== curMonth || day !== curDay) {
                resultStr = t.datafomatZero(month) + "-" + t.datafomatZero(day) + " " + t.datafomatZero(hours) + ":" + t.datafomatZero(minutes);
            } else {
                resultStr = t.datafomatZero(hours) + ":" + t.datafomatZero(minutes);
            }
            return resultStr;
        },
        
        // 执行时间差计算操作
        doTransfer: function(original, curDate) {
            if (!original) {
                return "";
            }
            var t = this;
            original = t.converte(original);
            curDate = curDate || new Date();
            
            // 用于存放返回的字符串
            var str = "";
            
            // 设置传入时间的毫秒为0
            original.setMilliseconds(0);
            
            // 设置当前时间的毫秒为0
            curDate.setMilliseconds(0);
            
            // 定义一年
            var YEAR1 = 1000 * 60 * 60 * 24 * 365;
            
            // 定义两年
            var YEAR2 = 1000 * 60 * 60 * 24 * 365 * 2;
            
            // 定义一天
            var DAY = 1000 * 60 * 60 * 24;
            
            // 定义一个小时
            var HOUR = 1000 * 60 * 60;
            
            // 定义1分钟
            var MIN = 1000 * 60;
            
            // 取得当前时间与传入时间的时间差
            var diff = curDate - original;
            
            // 判断是否是两年以上
            if ((diff - YEAR2) >= 0) {
                str += original.getFullYear() + "年";
                str += (original.getMonth() + 1) + "月" + original.getDate() + "日";
            } else {
                
                // 判断是否是1年以上
                if ((diff - YEAR1) >= 0) {
                    str += "1年前";
                } else {
                    var subdaynum = -1;
                    var workmonthnum = 0;
                    for (var i = original.getTime(); i <= curDate.getTime(); i = (i + DAY)) {
                        var days = new Date(i);
                        subdaynum++;
                        if (days.getDate() == 1) {
                            
                            // 记录当前时间与传入时间相差几个月
                            workmonthnum++;
                        }
                    }
                    
                    // 相差天数是否大于31天
                    if (subdaynum >= 31) {
                        str += workmonthnum + "个月前";
                    } else {
                        
                        // 相差天数是否大于1天
                        if (subdaynum >= 1) {
                            str += subdaynum + "天前";
                        } else {
                            var h = parseInt(diff / HOUR);
                            
                            // 相差时间是否大于1小时
                            if (h >= 1) {
                                
                                // 是否跨日期相差超过12小时
                                if ((curDate.getDate() - original.getDate()) == 1 && h > 12) {
                                    str += "1天前";
                                } else {
                                    str += h + "小时前";
                                }
                            } else {
                                var m = parseInt(diff / MIN);
                                
                                // 是否相差超过1分钟
                                if (m >= 1) {
                                    str += m + "分钟前";
                                } else {
                                    str += "刚刚";
                                }
                            }
                        }
                    }
                }
            }
            return str;
        },
        formatting: function(curDate, tag) {
            var t = this,
                year,
                month,
                day,
                hours,
                minutes,
                seconds,
                resultTimeStr;
            if (curDate) {
                curDate = t.converte(curDate),
                year = curDate.getFullYear(),
                month = curDate.getMonth() + 1,
                day = curDate.getDate(),
                hours = curDate.getHours(),
                minutes = curDate.getMinutes(),
                seconds = curDate.getSeconds();
                if (!tag) {
                    resultTimeStr = year + "年" + t.datafomatZero(month) + "月" + t.datafomatZero(day) + "日";
                } else {
                    tag = tag.replace("yyyy", year);
                    tag = tag.replace("mm", t.datafomatZero(month));
                    tag = tag.replace("dd", t.datafomatZero(day));
                    tag = tag.replace("hh", t.datafomatZero(hours));
                    tag = tag.replace("MM", t.datafomatZero(minutes));
                    tag = tag.replace("ss", t.datafomatZero(seconds));
                    resultTimeStr = tag;
                }
            }
            return resultTimeStr;
        }
    };
    
    return Time;
});