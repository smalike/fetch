define("widget/ui/footer/footer", ["jquery"], function (require, exports, module) {

    "use strict";

    var $ = require("jquery");

    var str = '',
        footer_str = '',
        curHref = window.location.href,
        hrefs = '<a href="http://www.chinaso.com/home/aboutus.html" target="_blank">关于我们</a>' +
        '<span>|</span>' +
        '<a href="http://www.chinaso.com/home/contactus.html" target="_blank">联系我们</a>' +
        '<span>|</span>' +
        '<a href="http://www.chinaso.com/home/say_chinaso_wzslsq.html" target="_blank">对国搜说</a>' +
        '<span>|</span>' +
        '<a href="http://www.chinaso.com/home/cooperate.html" target="_blank">合作伙伴</a>' +
        '<span>|</span>' +
        '<a href="http://www.chinaso.com/home/product.html" target="_blank">产品中心</a>' +
        '<span>|</span>' +
        '<a href="http://www.chinaso.com/home/invite.html" target="_blank">近期招聘</a>' +
        '<span>|</span>' +
        '<a href="http://www.chinaso.com/home/link.html" target="_blank">链接国搜</a>' +
        '<span>|</span>' +
        '<a href="http://www.chinaso.com/home/service.html" target="_blank">服务协议</a>' +
        '<span>|</span>' +
        '<a href="http://net.china.com.cn/index.htm" target="_blank">暴恐音视频举报专区</a>',
        contact_str = '<p>' + hrefs +
        '<span class="copyright">&copy;2015 中国搜索</span>' +
        '</p>' + '<div class="foot_text">' +
        '本网页所呈现之内容，如无特别注明，均系系统自动抓取而得，不代表中国搜索之立场。如有意见或投诉，请点击页面下方的"对国搜说"，欢迎及时反馈。' +
        '</div>',
        noExp_str = '<div class="footer footIndex">' +
        '<p>' + hrefs +
        '<span class="copyright">&copy;2015 中国搜索</span>' +
        '</p>' +
        '<div class="footerBot"><span class="mgr17">京ICP证：140400号</span><span class="mgr17">互联网新闻信息服务许可：1012014003号</span><span>京公网安备：110402440036</span></div>' +
        '</div>',
        noExp_str_small = '<div class="footer footIndex footerPoI">' +
        '<p>' + hrefs +
        '<span class="copyright">&copy;2015 中国搜索</span>' +
        '</p>' +
        '<div class="footerBot"><span class="mgr17">京ICP证：140400号</span><span class="mgr17">互联网新闻信息服务许可：1012014003号</span><span>京公网安备：110402440036</span></div>' +
        '</div>',
        _footerHtmlContainer = document.createElement("div");

    if (curHref.match(/http:\/\/news.chinaso.com/)) {
        str = '<p><span class="mgr17">京公网安备：110402440036号</span><span>互联网新闻信息服务许可：1012014003号</span></p>';
        footer_str = contact_str + str;
        _footerHtmlContainer.innerHTML = '<div class="footer f_n">' + footer_str + '</div>';
    } else if (curHref.match(/http:\/\/(www\.)?chinaso.com[\/|\/index.html]/)) {

        //兼容IE8不支持响应式高度的问题.
        if ($(window).height() < 680) {
            footer_str = noExp_str_small;
        } else {
            footer_str = noExp_str;
        };
        _footerHtmlContainer.innerHTML = footer_str;
    } else {
        str = '<p><span>京ICP证：140400号</span></p>';
        footer_str = contact_str + str;
        _footerHtmlContainer.innerHTML = '<div class="footer f_n">' + footer_str + '</div>';
    }
    document.getElementsByTagName("body")[0].appendChild(_footerHtmlContainer);

    //兼容IE8不支持响应式高度的问题.
    $(window).resize(function () {
        var winH = $(window).height(),
            $footer = $('div.footIndex');
        if (winH < 680) {
            if (!$footer.hasClass('footerPoI')) {
                $footer.addClass('footerPoI');
            }
        } else {
            $footer.removeClass('footerPoI');
        };
    });

});