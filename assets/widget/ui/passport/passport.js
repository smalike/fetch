/*! fetch-Module - v0.1.0 - 2015-05-12 09:54:18 */
define("widget/ui/passport/passport",["utils/util","widget/com/jsonp"],function(a,b,c){"use strict";function d(a){this.defaults={basePath:"",passurl:"http://passport.chinaso.com/logout.htm",scall:!0,errorCb:function(){alert("服务失败，请稍候再试!")},failCb:function(){alert("退出失败，请稍候再试！")},sucCb:function(){alert("退出成功！")},finishCb:function(){}},e.extend(this.defaults,a)}var e=a("utils/util"),f=a("widget/com/jsonp");e.extend(d.prototype,{passportLogout:function(){var a=this;a.send(!0)},send:function(){var a=this,b=a.defaults.passurl+"?basePath="+a.defaults.basePath+"&curUrl="+a.defaults.curUrl;f(b,"passportJsonpcallback")},passportJsonpcallback:function(a){var b=this,c=a.flag;if(0==c)if(b.defaults.scall){var d=b.defaults.basePath+"ts.htm?u="+decodeURIComponent(a.url);a.logout&&(d+="&logout=1"),window.location.href=d}else b.defaults.sucCb();else b.defaults.failCb(c)}}),c.exports=function(a){var b=new d(a);return window.passportJsonpcallback=function(a){b.passportJsonpcallback(a)},b}});