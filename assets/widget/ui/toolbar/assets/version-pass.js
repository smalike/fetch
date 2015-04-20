
/***
 * 切换版本地址常量
 * @params{common: 通用， gov：政务，theory：理论，media：媒体}
 */
var VersionPass = function () {
    
    var VERSIONPASS = {
        common: "http://www.chinaso.com/index.html",
        gov: "http://www.chinaso.com/index_zhengwu.html",
        theory: "http://www.chinaso.com/index_lilun.html",
        media: "http://www.chinaso.com/index_meiti.html",
        wap: "http://m.chinaso.com/wapintro.html"
    }
    
    function init() {
        this.build();

        // 切换版本
        var changeVersion = function() {
            var href = location.href,
                accBox = $('.acc_box');
            if (href === '' || href === '/') {
                accBox.find('dd').removeClass('cur');
                accBox.find('dd').eq(0).addClass('cur');
            } else if (href.indexOf(BL.Com.Toolbar.VERSIONPASS.gov) !== -1) {
                accBox.find('dd').removeClass('cur');
                accBox.find('dd').eq(1).addClass('cur');
            } else if (href.indexOf(BL.Com.Toolbar.VERSIONPASS.theory) !== -1) {
                accBox.find('dd').removeClass('cur');
                accBox.find('dd').eq(2).addClass('cur');
            } else if (href.indexOf(BL.Com.Toolbar.VERSIONPASS.media) !== -1) {
                accBox.find('dd').removeClass('cur');
                accBox.find('dd').eq(3).addClass('cur');
            } else if (href.indexOf(BL.Com.Toolbar.VERSIONPASS.wap) !== -1) {
                accBox.find('dd').removeClass('cur');
                accBox.find('dd').eq(4).addClass('cur');
            } else {
                accBox.find('dd').removeClass('cur');
                accBox.find('dd').eq(0).addClass('cur');
            }
        }();
        
        $(document).on('mouseover', "#jToolbarUser .a_version", function() {
            t.hideBox();
            $('.acc_box').show();
            return false;
        });
    }
    
    // 构建页面元素
    function build() {
        var _html = '<div class="acc_box hide">' + '<dl class="list18">' + '<dt>选择内容偏好</dt>' +
                    '<dd class="cur"><a href="' + VERSIONPASS.common + '">通用版</a></dd>' + '<dd><a href="' +
                    VERSIONPASS.gov + '">政务版</a></dd>' + '<dd><a href="' + VERSIONPASS.theory + '">理论版</a></dd>' +
                    '<dd><a href="' + VERSIONPASS.media + '">媒体版</a></dd>' + '<dd><a target="_blank" href="' +
                    VERSIONPASS.wap + '">触屏版</a></dd></dl></div>'；
    }
    return {
        init: init;
    };
}();