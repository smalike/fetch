/*! fetch-Module - v0.1.0 - 2015-05-12 09:54:18 */
define("widget/ui/responsive/responsive",["utils/event/dispatcher","widget/ui/nav/responsive-nav","jquery"],function(a,b,c){"use strict";function d(a){this.defaults={limit:1250,cls:"normal-width",callback:function(){}},this.defaults=g.extend(this.defaults,a),this.initialize()}var e=a("utils/event/dispatcher"),f=a("widget/ui/nav/responsive-nav"),g=a("jquery");g.extend(d.prototype,{initialize:function(){var a,b=this;g(window).resize(function(){clearTimeout(b.resizeTimeId),b.resizeTimeId=setTimeout(function(){a=b.responseView(),b.defaults.callback(a)},200)}),a=b.responseView(),this.defaults.callback(a)},responseView:function(){var a=!1;return g("body").width()<this.defaults.limit?(g("html").addClass(this.defaults.cls),e.eventCenter.dispatch("navMoreShow"),a=!0):(g("html").removeClass(this.defaults.cls),e.eventCenter.dispatch("navMoreHide"),a=!1),a}}),c.exports={build:function(a){var b;return f.build(),b=new d(a)}}});