/*! fetch-Module - v0.1.0 - 2015-04-23 12:23:41 */
define("assets/widget/ui/lazyload/dom-lazyload",["assets/utils/util","assets/utils/event/publish","jquery"],function(a,b,c){"use strict";function d(a){var b=this;b.defaults={eles:".lazy_wrapper",loadingCls:"wrapper_loading",lazyNav:"#lazy_nav",fatchType:"GET",fatchDataType:"html",offset:100,isFatchUrls:!0},e.extend(b.defaults,a),b.init(),b.isShow()}var e=a("assets/utils/util"),f=a("assets/utils/event/publish"),g=a("jquery");e.extend(d.prototype,{init:function(){var a=this;g(a.defaults.eles).on("showview",function(){a.showview(this)}),g(window).on("scroll resize",function(b){a.isShow()})},isShow:function(){var a,b,c=this,d=g(c.defaults.eles),e=d.length,f="undefined"!=typeof document.compatMode&&"BackCompat"!=document.compatMode?document.documentElement:document.body,h=~~(f.scrollTop?f.scrollTop:window.scrollY);for(a=0;e>a;a++)b=d.eq(a),!b.data("isshow")&&h>b.offset().top-c.defaults.offset-f.clientHeight&&(b.data("isshow",1),b.trigger("showview"))},showview:function(a){var b=this,c=g(a);b.defaults.isFatchUrls?b.fatchMore(c,b.getUrlArr(a)):b.fatch(b.getUrl(a),b.defaults.fatchType,b.defaults.fatchDataType).done(function(a){c.removeClass(b.defaults.loadingCls),c.append(a),b.publish(c)})},getUrlArr:function(a){var b,c=this;return b=g(c.defaults.lazyNav).find("a").eq(g(a).index(c.defaults.eles)).attr("href"),b.split(",")},getUrl:function(a){var b=this;return g(b.defaults.lazyNav).find("a").eq(g(a).index(b.defaults.eles)).attr("href")},asyncEvent:function(a){var b,c=this,d=a.length,e=d,f=new jQuery.Deferred,g=[];for(b=0;d>b;b++)!function(b){c.fatch(a[b],c.defaults.fatchType,c.defaults.fatchDataType).done(function(a){g[b]=a,--e||f.resolve(g.join(""))})}(b);return f.promise()},fatchMore:function(a,b){var c=this;g.when(c.asyncEvent(b)).done(function(b){a.removeClass(c.defaults.loadingCls),a.append(b),c.publish(a)})},fatch:function(a,b,c){return g.ajax({url:a,type:b,dataType:c})},publish:function(a){f({attrs:a.data("bind")})}}),c.exports={build:function(a){var b=new d(a);return b}}});