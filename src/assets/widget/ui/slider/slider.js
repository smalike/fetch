define("assets/widget/ui/slider/slider", ["jquery"], function (require, exports, module) {
    
    "use strict";
    
    var $ = require("jquery");
    
    function slider (container) {
        var self = this,
            uConWt;
        this.showIndex = 0; // 当前第一个显示的索引
        this.defaults = {};
        if (typeof container === "string") {
            this.defaults.container = container;
        } else {
            this.defaults = jQuery.extend(this.defaults, container);
        }
        this.$container = jQuery(this.defaults.container);
        this.$container.find("a.bg-focus").remove();
        this.$smallCon = this.$container.find("div.small-imgBanner");
        this.$control = this.$smallCon.find("div.focus-control");
        setTimeout(function () {
            self.getConWidth();
        }, 300);
        this.$smallCon.find("a.arr-left").on("click", function () {
            self.moveSmall(-1);
            return !1;
        });
        this.$smallCon.find("a.arr-right").on("click", function () {
            self.moveSmall(1);
            return !1;
        });
        this.$smallCon.find("li").on({
            mouseover: function () {
                var cur = this;
                clearTimeout(self.liMousOvTimeId);
                self.liMousOvTimeId = setTimeout(function () {
                    // self.curIndex = ~~$(cur).index("div.focus-control li");
                    self.showView(cur);
                }, 300);
            },
            mouseout: function () {
                clearTimeout(self.liMousOvTimeId);
            },
            click: function () {
                clearTimeout(self.liMousOvTimeId);
                self.showView(this);
                return false;
            }
        });
        this.$liItem = this.$control.find("li");
        uConWt = this.$liItem.outerWidth() * this.$liItem.length;
        this.$control.find("ul").width(uConWt);
        this.showView(this.$smallCon.find("li").eq(0));
        $(window).on("resize", function () {
            self.clearTimeout();
            clearTimeout(this.resizeTimeId);
            this.resizeTimeId = setTimeout(function () {
                self.updateConWidth();
                self.delayPlay();
            }, 300);
        });
        this.delayPlay();
        this.$container.on({
            mouseover: function () {
                self.clearTimeout();
            },
            mouseout: function () {
                self.delayPlay();
            }
        });
    }
    jQuery.extend(slider.prototype, {
        updateConWidth: function () {
            this.getConWidth();
        },
        getConWidth: function () {
            var cw = this.$control.width(), liw;
            this.$liItem = this.$control.find("li");
            liw = this.$liItem.outerWidth();
            // 显示个数
            this.showCount = Math.floor(cw / liw);
        },
        clearTimeout: function () {
            clearTimeout(this.delayTimeId);
            clearTimeout(this.autoTimeId);
        },
        delayPlay: function () {
            var self = this;
            self.clearTimeout();
            this.delayTimeId = setTimeout(function () {
                self.autoPlay();
            }, 3000);
        },
        autoPlay: function () {
            var self = this;
            // this.curIndex 选中的索引
            this.curIndex = ~~$("div.focus-control li.active").index("div.focus-control li");
            this.curIndex++;
            this.nextMove();
            this.autoTimeId = setTimeout(function () {
                self.autoPlay();
            }, 3000);
        },
        nextMove: function () {
            var acTemp = Math.abs(this.showCount)
            if (this.curIndex >= this.$liItem.length) {
                this.curIndex = 0;
            }
            if (this.curIndex + 1 > this.showIndex + acTemp || this.curIndex < this.showIndex) {
                this.showIndex = this.curIndex - acTemp;
                this.moveSmall(1);
            }
            this.showView(this.$liItem.eq(this.curIndex));
        },
        moveSmall: function (operator) {
            var self = this,
                diff,
                limit;
            this.showCount = ~~(operator * Math.abs(this.showCount));
            if (this.showCount > 0) {
                if (this.showIndex + this.showCount >= this.$liItem.length) {
                   this.showIndex = 0;
                } else {
                    this.showIndex += this.showCount;
                    limit = this.showIndex + this.showCount;
                    if (limit > this.$liItem.length) {
                        diff = limit - this.$liItem.length;
                        this.showIndex -= diff;
                    }
                }
            } else {
                if (this.showIndex <= 0) {
                    this.showIndex = this.$liItem.length + this.showCount;
                } else {
                    this.showIndex += this.showCount;
                    limit = this.showIndex;
                    if (limit < 0) {
                        this.showIndex = 0;
                    }
                }
            }
            this.$liItem.parent().children(":lt(" + this.showIndex + ")").hide().end().children(":gt(" + (this.showIndex) + ")").show();
            this.$liItem.eq(this.showIndex).show();
            require(["assets/utils/event/publish"], function (publish) {
                publish({attrs: self.$smallCon.find("a.arr-left").data("bind")});
            });
        },
        showView: function (cur) {
            var $cur = $(cur)
                , $showView = this.$container.find("a.bg-focus")
                , $curView = $showView.eq(~~$cur.index("div.focus-control li"))
                ;
            if (!$curView.length) {
                $curView = $('<a href="###" class="focus-image bg-focus" target="_blank"></a>');
                $curView.css({
                    "background-image": "url(" + $cur.data("image") + ")",
                    "background-color": $cur.data("bcolor")
                }).attr("href", $cur.data("url"));
                this.$container.find("div.focus-ctn").append($curView);
            } else if ($curView.css("background-image") !== "url(" + $cur.data("image") + ")") {
                $curView = $('<a href="###" class="focus-image bg-focus" target="_blank"></a>').css({
                    "background-image": "url(" + $cur.data("image") + ")",
                    "background-color": $cur.data("bcolor")
                }).attr("href", $cur.data("url")).insertBefore($curView);
            }
            $cur.addClass("active").siblings("li").removeClass("active");
            $curView.show().siblings("a").hide();
        }
    });
    module.exports = {
        build: function (container) {
            var s;
            return s = new slider(container), s;
        }
    };
});