
// 处理显示当前日期
// 调用农历处理方法
BL.Util.Time = {
    getDay: function () {
        var arr = ["日", "一", "二", "三", "四", "五", "六"];
        var day = "周" + arr[new Date().getDay()];
        return day;
    },
    /**
     *
     * 按照格式yyyy-mm-dd获得当前年月日
     */
    getFormatDate: function () {
        var d, s;
        d = new Date();
        var yy = d.getFullYear();
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var ww = d.getDay();
        var ss = parseInt(d.getTime() / 1000);
        if (yy < 100) yy = "19" + yy;
        s = yy + "-" + mm + "-" + dd + "";
        return [s, BL.Com.LunarCalendar.GetLunarDay(yy, mm, dd)];
    }
};