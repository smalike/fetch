/*! fetch-Module - v0.1.0 - 2015-04-23 12:23:41 */
define("assets/widget/ui/ie/tip-ie-old",function(){"use strict";function a(){var a=function(){var a=navigator.appName,b=navigator.appVersion,c=b.split(";"),d=(c[1]||"").replace(/[ ]/g,"");return"Microsoft Internet Explorer"!=a||"MSIE6.0"!=d&&"MSIE7.0"!=d?!1:!0}();if(a){var b=$("<div>").css({backgroundColor:"#fcf8e3",padding:"8px 35px 8px 14px",border:"1px solid #eed3d7",color:"#e22000",textAlign:"center",fontSize:"14px",fontFamily:'"宋体","Arial Unicode MS",System',cursor:"pointer"}).html('您的IE浏览器版本太低，大部分网站已经不兼容且存在安全隐患，建议<a href=" http://windows.microsoft.com/zh-cn/windows/upgrade-your-browser" target="_blank">升级IE</a>');b.prependTo($("body")),b.on("click",function(){b.hide()})}}a()});