define("assets/widget/ui/footer/footer", ["jquery"], function (require, exports, module) {

    "use strict";
    
    var _footerHtmlContainer = document.createElement("div");
	_footerHtmlContainer.innerHTML = '<div class="footer footIndex">'+
					'<p>'+
						'<a href="http://www.chinaso.com/home/aboutus.html" target="_blank">关于我们</a>'+
						'<span>|</span>'+
						'<a href="http://www.chinaso.com/home/contactus.html" target="_blank">联系我们</a>'+
						'<span>|</span>'+
						'<a href="http://www.chinaso.com/home/say_chinaso_wzslsq.html" target="_blank">对国搜说</a>'+
						'<span>|</span>'+
						'<a href="http://www.chinaso.com/home/cooperate.html" target="_blank">合作伙伴</a>'+
						'<span>|</span>'+
						'<a href="http://www.chinaso.com/home/product.html" target="_blank">产品中心</a>'+
						'<span>|</span>'+
						'<a href="http://www.chinaso.com/home/invite.html" target="_blank">近期招聘</a>'+
						'<span>|</span>'+
						'<a href="http://www.chinaso.com/home/link.html" target="_blank">链接国搜</a>'+
						'<span>|</span>'+
						'<a href="http://www.chinaso.com/home/service.html" target="_blank">服务协议</a>'+
						'<span>|</span>'+
						'<a href="http://net.china.com.cn/index.htm" target="_blank">暴恐音视频举报专区</a>'+
						'<span class="copyright">&copy;2015 中国搜索</span>'+
					'</p>'+
					'<div class="footerBot"><span class="mgr17">京公网安备：110402440036号</span><span class="mgr17">京ICP证：140400号</span><span>互联网新闻信息服务许可：1012014003号<span></span></span></div>'+
				'</div>';
	
    document.getElementsByTagName("body")[0].appendChild(_footerHtmlContainer);
});