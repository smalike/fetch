/*! fetch-Module - v0.1.0 - 2015-05-12 09:54:18 */
define("widget/ui/tip/tip",["utils/util"],function(a,b,c){"use strict";function d(a){var b=this;b.defaults={wait:500,offset:20,showSpeed:300,hideSpeed:100,isLoadCss:!0,baseCssPath:"",cssPath:"widget/ui/tip/tip.css"},e.extend(b.defaults,a),b.defaults.isLoadCss&&b.loadCss(b.defaults.baseCssPath+b.defaults.cssPath)}var e=a("utils/util");e.extend(d.prototype,{tip:function(a,b,c){var d=this,e=$('<div style="display: none; position: absolute; text-align: center; z-index: 999999; top: '+a+"px; left: "+b+'px;"><div class="tooltip"><div class="tooltipMsg" style="width:60px">'+c+'</div><div class="tips_sanjiao" style="top:28px;left:27px"></div></div></div>');$("body").append(e),e.css({left:b-e.width()/2}),e.on("show",function(){d.tipShow(this)}),e.on("hide",function(){d.tipHide(this)}),setTimeout(function(){e.trigger("hide")},d.defaults.wait),e.trigger("show")},tipShow:function(a){var b=this;$(a).show().animate({top:"-="+b.defaults.offset},b.defaults.showSpeed)},tipHide:function(a){var b=this,c=$(a);c.animate({top:"-="+b.defaults.offset},b.defaults.hideSpeed,function(){$(this).remove()})},loadCss:function(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("link");c.href=a,c.rel="stylesheet",c.type="text/css",b.appendChild(c)}}),c.exports={P:d,build:function(a){var b=new d(a);return b}}});