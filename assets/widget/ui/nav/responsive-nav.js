/*! fetch-Module - v0.1.0 - 2015-05-12 09:54:18 */
define("widget/ui/nav/responsive-nav",["utils/util","utils/event/dispatcher","jquery"],function(a,b,c){"use strict";function d(a){var b=this;b.defaults={container:".video-Navigation",content:".nav-ctn dl",item:"dd",moreContainer:".all-nav",moreContent:".nav-more",moreBtn:".look-all",moreClass:"bg-color",tagClass:"cur",extendWidth:g("div.video-Navigation .nav-ctn>dl>dt").outerWidth(!0)},b.defaults=e.extend(this.defaults,a),b.defaults.$container=g(b.defaults.container),b.defaults.$moreContainer=g(b.defaults.moreContainer),b.$moreView=b.defaults.$moreContainer.find(b.defaults.moreContent),b.$moreView.html(""),b.initialize()}var e=a("utils/util"),f=a("utils/event/dispatcher"),g=a("jquery");e.extend(d.prototype,{initialize:function(){var a=this;a.defaults.$container.find(a.defaults.content).eq(0).find(a.defaults.item).not(a.defaults.$moreContainer);f.eventCenter.addEventListener("navMoreShow",function(b){a.navMoreShow()},a),f.eventCenter.addEventListener("navMoreHide",function(b){a.navMoreHide()},a)},navMoreShow:function(){var a=this;a.buildNavMore()},navMoreHide:function(){var a=this,b=a.defaults.$container.find(a.defaults.content).eq(0);a.defaults.$moreContainer.find(a.defaults.item).appendTo(b),a.defaults.$moreContainer.appendTo(b),a.buildNavMore()},buildNavMore:function(){var a=this,b=a.defaults.$container.find(a.defaults.content).eq(0),c=b.width(),d=b.find(a.defaults.item).not(a.defaults.$moreContainer),e=a.defaults.extendWidth;g.each(d,function(){return e+=g(this).innerWidth(),e>c?(a.$moreView.append(b.find(a.defaults.item+":gt("+(g(this).index()-3)+")").not(a.defaults.$moreContainer)),a.moreEventHandler(),!1):void(a.$moreView.find(a.defaults.item).length||a.defaults.$moreContainer.hide())})},moreEventHandler:function(){var a=this;a.defaults.$moreContainer.show().on({mouseover:function(){a.$moreView.show(),g(this).addClass(a.defaults.moreClass)},mouseout:function(){a.$moreView.hide(),g(this).removeClass(a.defaults.moreClass)}}),a.$moreView.on({mouseover:function(b){g(b.target||b.srcElement).parent(a.defaults.item).not(a.defaults.$moreContainer).addClass(a.defaults.tagClass).siblings().removeClass(a.defaults.tagClass)},mouseout:function(b){a.$moreView.find(a.defaults.item).removeClass(a.defaults.tagClass)}})}}),c.exports={build:function(a){var b=new d(a);return b}}});