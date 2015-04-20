define("common:chinaso/page/common/ie.version", function () {
	function ieVersion() {
        var v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
        return v > 4 ? v : 0;
    }
    return ieVersion();
});