/*! fetch-Module - v0.1.0 - 2015-04-23 12:23:41 */
define("assets/widget/ui/switch/item-switch",["jquery"],function(a,b,c){"use strict";function d(a){var b,c=this;this.defaults={cur:"cur"},this.defaults=e.extend(this.defaults,a),this.container=this.defaults.container||"body",b=e(this.container+" "+this.defaults.item),this.tabList=b,b.on({mouseover:function(){var a=e(this);clearTimeout(c.tabClearTimeId),c.tabClearTimeId=setTimeout(function(){c.convert(a)},200)},mouseout:function(){clearTimeout(c.tabClearTimeId)}}),c.initialize()}var e=a("jquery");e.extend(d.prototype,{initialize:function(){(this.defaults.num||0===this.defaults.num)&&this.convert()},convert:function(a){var b,c=this;a=a||e(this.defaults.item).eq(0),b=c.tabList.index(a),a.addClass(c.defaults.cur).siblings().removeClass(c.defaults.cur),a.parents(this.container).find(c.defaults.content).eq(b).show().siblings().hide(),this.defaults.callback&&this.defaults.callback(b)}}),c.exports={build:function(a){var b;return b=new d(a)}}});