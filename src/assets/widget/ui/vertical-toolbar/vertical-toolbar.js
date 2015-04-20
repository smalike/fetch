define("assets/widget/ui/vertical-toolbar/vertical-toolbar", ["assets/utils/util", "jquery"], function (require, exports, module) {
    
    "use strict";
    
    function VerticalToolbarEx() {
        var screenW = window.screen.width;
        if (screenW < 1024) {
            return false;
        } else {
            var wrapDiv = document.createElement("div");

            wrapDiv.className = "goTop";
            wrapDiv.id = "verticalToolBar";

            document.getElementsByTagName("body")[0].appendChild(wrapDiv);

            var goTopA = document.createElement("a");
            goTopA.className = "backTop";
            goTopA.id = "goTopBtn";
            goTopA.innerHTML = "顶部";
            goTopA.href = "javascript:void(0);";
            wrapDiv.appendChild(goTopA);

            //处理ie6下fixed.
            fixedPosition(wrapDiv, {
                bottom: 70
            }); 
            dealHandle(goTopA);
        }

    };

    /**
     * 获取IE浏览器的版本.
     * @return
     */
    var myBrowser = {
        getBrowserInfo: function(){
            var agent = navigator.userAgent.toLowerCase() ;
            var regStr_ie = /msie [\d.]+;/gi ;
            if(agent.indexOf("msie") > 0){
                return agent.match(regStr_ie) ;
            }
        },
        getIEVersion: function(){
            var browser = this.getBrowserInfo() ;
            if ((browser+"").match(/msie\s*\d{1,2}.\d/ig)) {
                var verinfo = (browser+"").replace(/[^0-9.]/ig,"");
                return parseInt(verinfo);
            };
        }
    };

    var dealHandle = function(goTop) {
        function getScrollTop() {
            return document.documentElement.scrollTop || document.body.scrollTop;
        }

        function setScrollTop(value) {
            document.documentElement.scrollTop = value;
            document.body.scrollTop = value;
        }
        window.onscroll = function() {
            getScrollTop() > 0 ? goTop.style.display = "block" : goTop.style.display = "none";
        };
        goTop.onclick = function() {
            var goTop = setInterval(scrollMove, 10);

            function scrollMove() {
                setScrollTop(getScrollTop() / 1.2);
                if (getScrollTop() < 1) clearInterval(goTop);
            }
        };
    };

    var fixedPosition = function() {
        var isIE6 = (myBrowser.getIEVersion() === 6),
            html = document.getElementsByTagName('html')[0],
            dd = document.documentElement,
            db = document.body,
            doc = dd || db;

        if (isIE6 && db.currentStyle.backgroundAttachment !== 'fixed') {
            html.style.backgroundImage = 'url(about:blank)';
            html.style.backgroundAttachment = 'fixed';
        }

        return isIE6 ?
            function(elem, pos) {
                var style = elem.style,
                    dom = '(document.documentElement || document.body)';

                if (typeof pos.left !== 'number') {
                    pos.left = doc.clientWidth - pos.right - elem.offsetWidth;
                }
                if (typeof pos.top !== 'number') {
                    pos.top = doc.clientHeight - pos.bottom - elem.offsetHeight;
                }

                elem.style.position = 'absolute';
                style.removeExpression('left');
                style.removeExpression('top');
                style.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + pos.left + ') + "px"');
                style.setExpression('top', 'eval(' + dom + '.scrollTop + ' + pos.top + ')+40 + "px"');
        } :
            function(elem, pos) {
                var style = elem.style;

                style.position = 'fixed';

                if (typeof pos.left === 'number') {
                    style.left = pos.left + 'px';
                }

                if (typeof pos.top === 'number') {
                    style.top = pos.top + 'px';
                }

        };
    }();

    var verticalToolbarEx = new VerticalToolbarEx();
});

