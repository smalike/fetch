// IE6, 7 提示浏览器过旧
define("assets/widget/ui/ie/tip-ie-old", function () {
    
    "use strict";
    
    function TipIeOld() {
        var isIE6 = (function() {
            var browser = navigator.appName;
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            var trim_Version = (version[1] || '').replace(/[ ]/g, "");
            if (browser == "Microsoft Internet Explorer") {
                if (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0") {
                    return true;
                }
            }
            return false;
        })();

        if (isIE6) {
            var newElem = $('<div>').css({
                backgroundColor: '#fcf8e3',
                padding: '8px 35px 8px 14px',
                border: '1px solid #eed3d7',
                color: '#e22000',
                textAlign: 'center',
                fontSize: '14px',
                fontFamily: '"宋体","Arial Unicode MS",System',
                cursor: 'pointer'
            }).html('您的IE浏览器版本太低，大部分网站已经不兼容且存在安全隐患，建议<a href=" http://windows.microsoft.com/zh-cn/windows/upgrade-your-browser" target="_blank">升级IE</a>')
            newElem.prependTo($('body'));
            newElem.on('click', function() {
                newElem.hide()
            });
        }
    }
    
    TipIeOld();
});
