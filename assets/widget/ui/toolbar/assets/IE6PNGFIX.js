
// DD_belatedPNG IE6图片处理
var IE6PNGFIX = function () {
    return {
        init: function () {
            var t = this;
            var ie = t.IE();
            if (ie && ie <= 6) {
                if (!window.DD_belatedPNG) {
                    t.createScript("http://www.chinaso.com/common/base/js/DD_belatedPNG.js", function () {
                        DD_belatedPNG.fix('.weather_other .list16 li h4');
                    });
                } else {
                    DD_belatedPNG.fix('.weather_other .list16 li h4');
                }
            }
            return t;
        },
        IE: function () {
            var v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');
            while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );
            return v > 4 ? v : false;
        },
        createScript: function (src, callback) {
            var script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", src);
            var heads = document.getElementsByTagName("head");
            if (heads.length) {
                heads[0].appendChild(script);
            } else {
                document.documentElement.appendChild(script);
            }
            script.onload = script.onreadystatechange = function () {
                setTimeout(function () {
                    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                        callback();
                    }
                })
                script.onload = script.onreadystatechange = null;
            };
        }
    };
}();