// 分享跳转平台组件
define("common:chinaso/page/common/widget/ui/share/to", function (require, exports, module) {
    "use strict";
    
    var To = {
        trim: function (str) {
            return str.replace(/(^\s*)|(\s*$)/gi, "");
        },
        shareTo: function (params) {
            var _this = this,
                type = params.type,
                imgURL = params.images,
                content = params.content,
                title = params.kaixin.title,
                addURLContent = params.addURLContent,
                
                //来源网址
                url = params.url,
                
                //收藏URL
                baseUrl = "",
                
                //收藏的参数
                urlParams = "";
            if (!addURLContent || _this.trim(addURLContent) < 1) {
                addURLContent = content;
            }
            if (type === 'sk139') {
                
                //不能带图，url自动添加到内容上
                baseUrl = "http://shequ.10086.cn/share/share.php";
                urlParams = "?title=" + encodeURIComponent(content) +
                    '&url=' + encodeURIComponent(url);
            } else if (type === 'tsina') {
                
                //url自动添加到内容上,图片不宜过大，否则新浪不分享
                baseUrl = "http://v.t.sina.com.cn/share/share.php";
                urlParams = '?title=' + encodeURIComponent(content) +
                    '&url=' + encodeURIComponent(url) +
                    '&pic=' + encodeURIComponent(imgURL) +
                    '&appkey=' + params.weiboAppKey.sina;
            } else if (type === 'kaixin') {
                
                //f = "http://www.kaixin001.com/repaste/share.php";
                baseUrl = "http://www.kaixin001.com/rest/records.php";
                
                //能携带图片,开心网分享参数中含有标题和内容，url自动添加到内容上
                urlParams = '?url=' + encodeURIComponent(url) +
                    '&title=' + encodeURIComponent(title) +
                    '&content=' + encodeURIComponent(content) +
                    '&pic=' + encodeURIComponent(imgURL) + "&style=11";
            } else if (type === 'douban') {
                
                //点击分享的内容会链接到url所在的地址
                baseUrl = "http://www.douban.com/recommend/";
                urlParams = '?url=' + encodeURIComponent(url) +
                    '&title=' + encodeURIComponent(content) +
                    '&image=' + encodeURIComponent(imgURL);
            } else if (type === 'renren') {
                
                //不支持图片的参数，从url参数网站自动解析图片，生成的title也会自动生成到此url的链接
//                baseUrl = "http://share.renren.com/share/buttonshare/post/1004";
//                urlParams = '?url=' + encodeURIComponent(url) +
//                    '&title=' + encodeURIComponent(title) +
//                    '&content=' + encodeURIComponent(addURLContent) +
//                    '&pic=' + encodeURIComponent(imgURL);
                baseUrl = "http://widget.renren.com/dialog/share";
                urlParams = '?resourceUrl=' + encodeURIComponent(url) +
                    '&srcUrl=' + encodeURIComponent(url) +
                    '&title=' + encodeURIComponent(title) +
                    '&description=' + encodeURIComponent(addURLContent) +
                    '&pic=' + encodeURIComponent(imgURL);
            } else if (type === 'tsohu') {
                
                //搜狐的title参数为显示的主要内容，内容后面会自动带上url参数
                baseUrl = "http://t.sohu.com/third/post.jsp";
                urlParams = '?content=utf-8' +
                    '&url=' + encodeURIComponent(url) +
                    '&title=' + encodeURIComponent(content) +
                    '&pic=' + encodeURIComponent(imgURL) +
                    '&appkey=' + params.weiboAppKey.sohu;
            } else if (type === 't163') {
                baseUrl = "http://t.163.com/article/user/checkLogin.do";
                
                //网易显示内容为info，不会自动带上url参数，根据source的文字自动识别来源网址，这里source 为中国搜索
                urlParams = '?info=' + encodeURIComponent(addURLContent) +
                    '&source=' + params.wangyiSource +
                    '&images=' + encodeURIComponent(imgURL) +
                    '&link=' + encodeURIComponent(url) + //此参数貌似没用
                    '&appkey=' + params.weiboAppKey.wangyi;
            } else if (type === 'tqq') {
                
                //腾讯微博通过appkey来识别来源网站,title参数为显示的主要内容，内容后面会自动带上url参数
                baseUrl = "http://v.t.qq.com/share/share.php";
                urlParams = '?title=' + encodeURIComponent(content) +
                    '&url=' + encodeURIComponent(url) +
                    '&site=' + encodeURIComponent(url) +
                    '&pic=' + encodeURIComponent(imgURL) +
                    '&appkey=' + params.weiboAppKey.qq;
            } else if (type === "qzone") {
                baseUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
                urlParams = '?title=' + encodeURIComponent(content) +
                    '&url=' + encodeURIComponent(url) +
                    '&site=' + encodeURIComponent(url) +
                    '&pic=' + encodeURIComponent(imgURL) +
                    '&appkey=' + params.weiboAppKey.qq;
            } else {
                alert("error in invoking share_to()");
            }
            window.open(baseUrl + urlParams/*, "_blank", ['toolbar=0,status=0,resizable=1,width=620,height=450,left=', (screen.width - 620) / 2, ',top=', (screen.height - 450) / 2].join('')*/);
        }
        
    };
    
    return To;
    
});