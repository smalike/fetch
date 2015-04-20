//图片跑马灯效果
define("common:chinaso/page/controller/soRest-tab", function (require, exports, module) {
    function carousel (container) {
        var self = this;
        this.defaults = {
            leftEle: ".arr-left",
            rightEle: ".arr-right",
            converCls: "again",
            dot: ".trigger-dot a",
            auto: !1,
            isLoop: true
        };
        if (typeof container === "string") {
            this.defaults.container = container;
        } else {
            this.defaults = jQuery.extend(this.defaults, container);
        }
        this.defaults.$container = jQuery(this.defaults.container);
        this.$content = this.defaults.$container.find("ul");
        this.initialize();
        this.initDot();
        this.eventHandler();
        this.isAutoPlay();
        !this.defaults.isLoop && this.setDiseble();
    }
    jQuery.extend(carousel.prototype, {
        eventHandler: function () {
            var self = this;
            this.defaults.$container.on({
                mouseover: function () {
                    clearTimeout(self.autoClearTimeId);
                },
                mouseout: function () {
                    self.isAutoPlay();
                }
            });
            this.defaults.$container.find(this.defaults.rightEle).on({
                click: function () {
                    !self.$content.is(":animated") && self.carouselExc(-1);
                    return !1;
                },
                mouseover: function () {
                    $(this).addClass(self.defaults.converCls);
                },
                mouseout: function () {
                    $(this).removeClass(self.defaults.converCls);
                }
            });
            this.defaults.$container.find(this.defaults.leftEle).on({
                click: function () {
                    !self.$content.is(":animated") && self.carouselExc(1);
                    return !1;
                },
                mouseover: function () {
                    $(this).addClass(self.defaults.converCls);
                },
                mouseout: function () {
                    $(this).removeClass(self.defaults.converCls);
                }
            });
            $(window).on("resize", function () {
                clearTimeout(self.resizeTimeId);
                self.resizeTimeId = setTimeout(function () {
                    self.initialize();
                }, 200);
            });
        },
        isAutoPlay: function () {
            this.defaults.auto && this.autoPlay();
        },
        autoPlay: function () {
            var self = this;
            clearTimeout(this.autoClearTimeId);
            this.autoClearTimeId = setInterval(function () {
                !self.$content.is(":animated") && self.carouselExc(-1);
            }, 5000);
        },
        carouselExc: function (operator) {
            var self = this,
                distance,
                moveDis = this.defaults.content ? this.defaults.$container.find(this.defaults.content).width() + this.marLimitWi : this.defaults.$container.width() + this.marLimitWi,
                conPoleft = this.$content.position().left,
                limit = conPoleft + (operator * (Math.floor(moveDis / this.itemWidth) * this.itemWidth)),
                conWi = this.$content.width(),
                absLi = Math.abs(limit),
                unn = moveDis % this.itemWidth;
            if (!~operator) {
                /*if (unn) {
                    absLi += this.itemWidth;
                }*/
                if (absLi + unn >= conWi) {
                    if (!this.defaults.isLoop) {
                        return !1;
                    }
                    limit = 0;
                } else if (absLi + moveDis > conWi) {
                    limit = -(conWi - moveDis);
                }
            } else {
                if (conPoleft >= 0) {
                    if (!this.defaults.isLoop) {
                        return !1;
                    }
                    limit = -(conWi - moveDis);
                } else if (limit > 0) {
                    limit = 0;
                }
            }
            self.updateDotPosition(operator);
            this.$content.animate({
                left: limit/* * Math.abs(operator)*/
            }, 500, function () {
                if (!self.defaults.isLoop) {
                    self.setDiseble();
                }
            });
        },
        setDiseble: function () {
            var moveDis = this.defaults.content ? this.defaults.$container.find(this.defaults.content).width() + this.marLimitWi : this.defaults.$container.width() + this.marLimitWi,
                conWi = this.$content.width(),
                $rightEle = this.defaults.$container.find(this.defaults.rightEle),
                $leftEle = this.defaults.$container.find(this.defaults.leftEle),
                conLeft = Math.abs(this.$content.position().left);
            if (conWi - moveDis === conLeft) {
                $rightEle.addClass("diseble");
            } else {
                $rightEle.removeClass("diseble");
            }
            if (conLeft <= 0) {
                $leftEle.addClass("diseble");
            } else {
                $leftEle.removeClass("diseble");
            }
        },
        initDot: function () {
            var self = this;
            this.dotIndex = 0;
            this.$dot = this.defaults.$container.find(this.defaults.dot);
            this.$dot.on("click", function () {
                var idx = $(this).index(this.selector);
                !self.$content.is(":animated") && (self.dotIndex - idx !== 0) && self.carouselExc(self.dotIndex - idx);
            });
        },
        updateDotPosition: function (operator) {
            var itemLength = this.$content.find("li").length;
            this.dotIndex += -operator;
            if (this.dotIndex >= itemLength) {
                this.dotIndex = 0;
            } else if (this.dotIndex < 0) {
                this.dotIndex = itemLength - 1;
            }
            this.$dot.removeClass("cur").eq(this.dotIndex).addClass("cur");
        },
        initialize: function () {
            this.getContentWidth();
            if(this.$content.width() <= this.defaults.$container.width())
            {
                this.defaults.$container.find(".opTabsRight").addClass("hide");
            }
        },
        getContentWidth: function () {
            var $items = this.$content.find("li"),
                len = $items.length,
                $item = $items.eq(0),
                marWi = $item.outerWidth(true),
                norWi = $item.outerWidth();
            this.marLimitWi = marWi - norWi;
            this.itemWidth = $item.outerWidth(true);
            this.$content.width(this.itemWidth * len);
        }
    });
    module.exports = {
        build: function (container) {
            var c;
            return c = new carousel(container), c;
        }
    };
});