/*! fetch-Module - v0.1.0 - 2015-05-12 09:54:18 */
define("widget/com/iframe/iframe-auto-height",function(a,b,c){"use strict";function d(a){var b=this;this.defaults={},document.domain="chinaso.com",jQuery.extend(this.defaults,a),b.myIframes=document.getElementsByTagName("iframe"),b.initialize()}jQuery.extend(d.prototype,{initialize:function(){var a=this;document.getElementById&&document.createTextNode&&(a.addEvent(window,"load",a.doIframe),a.addEvent(window,"resize",function(){clearTimeout(a.resizeTimeId),a.resizeTimeId=setTimeout(function(){a.doIframe()},300)}))},doIframe:function(){var a,b=this;for(a=0;a<b.myIframes.length;a++)/\bautoHeight\b/.test(b.myIframes[a].className)&&(b.setHeight(b.myIframes[a]),b.addEvent(b.myIframes[a],"load",b.doIframe))},setHeight:function(a){a.contentDocument?a.height=a.contentDocument.body.offsetHeight:a.height=a.contentWindow.document.body.scrollHeight},addEvent:function(a,b,c){var d=this;if(a.addEventListener)return a.addEventListener(b,function(a){c.call(d,a)},!1),!0;if(a.attachEvent){var e=a.attachEvent("on"+b,function(a){c.call(d,a)});return e}return!1}}),c.exports={build:function(){var a;return a=new d}}});