
// 处理异步请求jsonp方式
define("widget/com/jsonp", function (require, exports, module) {
    
    function JSONP(url, callback) {
        var s = document.createElement("script"),
            first = document.getElementsByTagName("script")[0];
        s.type = "text/javascript";
        s.src = !callback ? url : url + (url.indexOf("?") == -1 ? "?" : "&") + "jsonpcallback=" + callback;
        first.parentNode.insertBefore(s, first);
    };
    
    return JSONP;
});