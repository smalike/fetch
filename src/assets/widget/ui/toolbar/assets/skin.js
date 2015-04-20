
// 切换主题
var Skin = function () {
    function init() {
        
        // 取cookie判断是否应用了皮肤和天气
        var isSkin = BL.Util.Cookie.get('skinCookie', true);
        if (isSkin) {
            $('#skinClass').attr('href', isSkin);
        }
        
        // 打开或关闭
        $('.a_skin').on('mouseover', function() {
            t.hideBox();
            $('.skin_box').show();
            return false;
        });
	  
        // 换肤
        $('.list19 li').on('click', function() {
            var num = $('.list19 li').index(this) + 1;
            var skinClass = 'http://www.chinaso.com/common/base/css/skin/skin' + num + '.css';
            $('#skinClass').attr('href', skinClass);
            BL.Util.Cookie.set('skinCookie', skinClass, null, ".chinaso.com");
            $('.skin_box').slideUp();
            return false;
        });
        
        // 换颜色
        $('.top .account .color').click(function() {
            var color = $(this).attr('idn');
            var skinClass = 'http://www.chinaso.com/common/base/css/skin/skin' + color + '.css';
            $('#skinClass').attr('href', skinClass);
            BL.Util.Cookie.set('skinCookie', skinClass, null, ".chinaso.com");
            $('.skin_box').slideUp();
            return false;
        });
    }
}();