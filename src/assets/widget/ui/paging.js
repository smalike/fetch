/***
*	Ajax paging common js code
*	@version 0.1
*	init : 初始化分页事件，调用ajax请求初始化数据
*	executeAjax ： 调用ajax请求
*	buildTitleHtml ：构建HTML元素数据
*	buildPage ： 构建分页元素
*	complate ： 执行完成后处理代码
*	url : 例 http://social.chinaso.com/static/json/ 地址
*	prefix : 主要区分json路径
*	suffix : 文件后缀
*	curShow : 显示内容容器
*	pageDisplayCount : 分页常用变量（当前页前后显示页数）
*	totalPage : 插件配置分页显示数量
**/
define("common:chinaso/page/controller/paging", function (require, exports, module) {
	function page (setting) {
		this.defaults = {
			url : "",
			prefix : "",
			jsonName : "data",
			suffix : ".json",
			curShow : null,
			curShowType : 0,
			pageDisplayCount : 4,
			scrollEle : null,
			scrollSpeed : null,
			globePageIndex : null,
			buildTitleHtml: function () {},
			complate: function () {}
		};
		this.defaults = jQuery.extend(this.defaults, setting);
		this.initialized();
	}
	jQuery.extend(page.prototype, {
		isShowOption : function () {return true;},
		initialized : function(flag){
			var self = this;
			self.executeAjax();
			$(document).on("click", ".page a", function(){
				var pageIndex = $(this).data("pageindex");
				self.defaults.curShow.data("pageindex", pageIndex);
				if(!flag) self.scrollTop(self.defaults.scrollEle, self.defaults.scrollSpeed);
				self.executeAjax(pageIndex, true);
				return !1;
			});
		},
		executeAjax : function(pageIndex, isPaging){
			var self = this,
				page = "";
			self.defaults.globePageIndex = pageIndex = pageIndex || 1;
			if(pageIndex > 1){
				page = "_"+pageIndex;
			}
			var url = self.defaults.url + self.defaults.prefix + "/" + self.defaults.jsonName + page + self.defaults.suffix;
			self.send(url, {}, "json").done(function(data){
				if(data.data && data.data.length > 0){
					self.buildTitleHtml(data, isPaging);
					if(self.isShowOption(data) && data.totalPage > 1){
						self.buildPage(data, pageIndex);
					}
				}
				self.complate();
			}).fail(function(data){});
		},
		buildTitleHtml : function(data){
			var self = this;
			self.defaults.buildTitleHtml(data);
		},
		buildPage : function(data, pageIndex){
			var self = this;
			var pageContent = '<div class="page clearb">';
			if(pageIndex > 1){
				pageContent += '<span class="page_pre"><a href="javascript:void(0);" data-pageindex="'+(pageIndex-1)+'"><上一页</a></span>';
			}
			for(var i = 0; i < data.totalPage; i++){
				if(pageIndex == (i+1)){
					pageContent += '<span>'+(i+1)+'</span>';
				}else{
					if((((i+1) - pageIndex) <= self.defaults.pageDisplayCount && (pageIndex < (i+1))) || ((pageIndex - (i+1)) <= self.defaults.pageDisplayCount) && (pageIndex > (i+1)) || (i === 0)){
						pageContent += '<span><a href="javascript:void(0);" data-pageindex="'+(i+1)+'">'+(i+1)+'</a></span>';
					}else if((((i+1) - pageIndex) <= self.defaults.pageDisplayCount+1 && (pageIndex < (i+1))) || ((pageIndex - (i+1)) <= self.defaults.pageDisplayCount+1) && (pageIndex > (i+1))){
						pageContent += "<span>...</span>";
					}
				}
			}
			if(pageIndex < data.totalPage){
				pageContent += '<span class="page_next"><a href="javascript:void(0);" data-pageindex="'+(pageIndex+1)+'">下一页></a></span>';
			}
			pageContent += '</div>';
			self.defaults.curShow.eq(0).append(pageContent);
		},
		complate : function(data){
			var self = this;
			self.defaults.complate(data);
		},
		scrollTop : function (ele, speed) {
			var toPx = 0,
				$ele;
			if (ele) {
				if (/^\d+$/.test(ele)) {
					toPx = ele;
				} else {
					$ele = $(ele);
					if ($ele.length > 0) {
						toPx = $ele.offset().top;
					}
				}
			}
			speed = speed || 200;
			$("html, body").animate({scrollTop: toPx + "px"}, speed);
		},
		send : function(url, params, dataType){
			var flag = "?";
			params = params || {};
			(url.indexOf("?") !== -1) && (flag = "&");
			url += (flag + new Date().getTime());
			dataType = dataType || "html";
			return $.ajax({
				url : url,
				params : params,
				type : "get",
				dataType : dataType,
				cache: false
			});
		}
	});
	module.exports = {
		build: function (setting) {
			var p;
			return p = new page(setting), p;
		}
	};
});