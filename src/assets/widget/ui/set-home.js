// 设为主页
define("", function (require, exports, module) {
    function setHome(obj, vrl) {
        try {
            obj.style.behavior = 'url(#default#homepage)';
            obj.setHomePage(vrl);
        } catch (e) {
            if (window.netscape) {
                try {
                    window.netscape.security
                        .PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
                    obj.href = "http://www.chinaso.com/home/sethelp.html";
                }
                var prefs = window.Components.classes['@mozilla.org/preferences-service;1']
                                .getService(window.Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage', vrl);
            } else {
                obj.href = "http://www.chinaso.com/home/sethelp.html";
            }
        }
    }
});