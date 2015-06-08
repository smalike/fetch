define("widget/ui/nav/responsive-nav", ["utils/util", "utils/event/dispatcher", "jquery"], function (require, exports, module) {
    
    "use strict";
    
    var utils = require("utils/util"),
        eventDispatcher = require("utils/event/dispatcher"),
        $ = require("jquery");
    
    function Nav(setting) {
        var _this = this;
        _this.defaults = {
            container: ".video-Navigation",
            content: ".nav-ctn dl",
            item: "dd",
            moreContainer: ".all-nav",
            moreContent: ".nav-more",
            moreBtn: ".look-all",
            moreClass: "bg-color",
            tagClass: "cur",
            extendWidth: $("div.video-Navigation .nav-ctn>dl>dt").outerWidth(true)
        }
        _this.defaults = utils.extend(this.defaults, setting);
        _this.defaults.$container = $(_this.defaults.container);
        _this.defaults.$moreContainer = $(_this.defaults.moreContainer);
        _this.$moreView = _this.defaults.$moreContainer.find(_this.defaults.moreContent);
        _this.$moreView.html("");
        _this.initialize();
    }
    
    utils.extend(Nav.prototype, {
        initialize: function () {
            var _this = this,
                $item = _this.defaults.$container.find(_this.defaults.content)
                            .eq(0).find(_this.defaults.item).not(_this.defaults.$moreContainer);
            eventDispatcher.eventCenter.addEventListener("navMoreShow", function (args) {
                _this.navMoreShow();
            }, _this);
            eventDispatcher.eventCenter.addEventListener("navMoreHide", function (args) {
                _this.navMoreHide();
            }, _this);
        },
        navMoreShow: function () {
            var _this = this;
            _this.buildNavMore();
        },
        navMoreHide: function () {
            var _this = this,
                $content = _this.defaults.$container.find(_this.defaults.content).eq(0);
            _this.defaults.$moreContainer.find(_this.defaults.item).appendTo($content);
            _this.defaults.$moreContainer.appendTo($content);
            _this.buildNavMore();
        },
        buildNavMore: function () {
            var _this = this,
                $content = _this.defaults.$container.find(_this.defaults.content).eq(0),
                outW = $content.width(),
                $item = $content.find(_this.defaults.item).not(_this.defaults.$moreContainer),
                limitWidth = _this.defaults.extendWidth,
                i;
            $.each($item, function () {
                limitWidth += $(this).innerWidth();
                if (limitWidth > outW) {
                    _this.$moreView.append($content.find(_this.defaults.item + ":gt(" + ($(this).index() - 3) + ")")
                                           .not(_this.defaults.$moreContainer));
                    _this.moreEventHandler();
                    return !1;
                } else if (!_this.$moreView.find(_this.defaults.item).length) {
                    _this.defaults.$moreContainer.hide();
                }
            });
        },
        moreEventHandler: function () {
            var _this = this;
            _this.defaults.$moreContainer.show().on({
                mouseover: function () {
                    _this.$moreView.show();
                    $(this).addClass(_this.defaults.moreClass);
                },
                mouseout: function () {
                    _this.$moreView.hide();
                    $(this).removeClass(_this.defaults.moreClass);
                }
            });
            _this.$moreView.on({
                mouseover: function (e) {
                    $(e.target || e.srcElement).parent(_this.defaults.item)
                        .not(_this.defaults.$moreContainer).addClass(_this.defaults.tagClass)
                        .siblings().removeClass(_this.defaults.tagClass);
                },
                mouseout: function (e) {
                    _this.$moreView.find(_this.defaults.item).removeClass(_this.defaults.tagClass);
                }
            });
        }
    });
    
    module.exports = {
        build: function (setting) {
            var nav = new Nav(setting);
            return nav;
        }
    };
});