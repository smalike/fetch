define("common:chinaso/page/controller/image.stream", ["require", "exports", "module","common:chinaso/page/common/ie.version"], function (require, exports, module) {
	function imageStream (setting) {
	    this.defaults = {
	    	itemW: 240,
	    	url: "", // http://house.chinaso.com/static/json/
	    	json_index: 0,
	    	loadPageSize: 9999,
	    	content_mar: 5 * 2,
	    	totalPage: 10,
	    	buildContainer: "",
	    	container: "",
	    	itemSelector: ""
	    };
	    this.defaults = jQuery.extend(this.defaults, setting);
	    this.initialize();
        this.resetMasonry();
	}
	var ieVersion = require("common:chinaso/page/common/ie.version");
	jQuery.extend(imageStream.prototype, {
		initialize: function (setting) {
            var self = this;
            self.getItemW($(this.defaults.buildContainer).width());
            if (ieVersion === 7) this.defaults.itemW = this.defaults.itemW - 1;
            $("#page-nav a").attr("href", this.defaults.url + this.defaults.jsonpath + "/data_2.json");
            self.getData().done(function(json) {
                self.defaults.totalPage = json.totalPage;
                self.initializeMasonry();
                self.initializeInfinit(json.totalPage);
                self.ajaxCallback(json);
            });
            self.eventHandler();
        },
        getItemW: function (containerWidth) {
            var cols;
            /*if (containerWidth > 1600) {
                cols = 7;
            } else if (containerWidth > 1400) {
                cols = 6;
            } else if (containerWidth > 1200) {
                cols = 5;
            } else if (containerWidth > 1000) {
                cols = 4;
            } else {
                cols = 4;
            }
            return Math.floor((containerWidth ) / cols) - 10 - 1;*/
            cols = containerWidth / this.defaults.itemW;
            this.defaults.itemW = Math.floor((containerWidth ) / cols);
        },
        eventHandler: function () {
        	var self = this;
            $("#clickLoading").on("click",function(){
                self.getData().done(function(json) {
	                self.defaults.totalPage = json.totalPage;
	                self.initializeMasonry();
	                self.ajaxCallback(json);
	            });
            });
            $(window).bind("resize", function(event) {
            	clearTimeout(self.resizeTimeId);
            	self.resizeTimeId = setTimeout(function () {
                    self.resizeWidth($(".item"));
//	                self.getItemW($(self.defaults.buildContainer).width());
//	                $(self.defaults.itemSelector).each(function() {
//	                    var tImg = $(this).find("img"),
//	                        bsizeW = tImg.attr('bsize_w'),
//	                        bsizeH = tImg.attr('bsize_h'),
//	                        imgW = (self.defaults.itemW - self.defaults.content_mar),
//	                        imgH = parseInt(imgW * bsizeH / bsizeW);
//	                    $(this).css("width", self.defaults.itemW + "px");
//	                    tImg.css("width", imgW + "px");
//	                    tImg.css("height", imgH + "px");
//	                });
//	                // I don't know, why '+10-1',but this's right.
//	                $(self.defaults.container).masonry({
//	                    columnWidth: self.defaults.itemW + 10 - 1
//	                });
            	}, 300);
            });
        },
        initializeMasonry: function () {
        	$(this.defaults.container).masonry({
                itemSelector: this.defaults.itemSelector,
                columnWidth: this.defaults.itemW + 10 - 1,
                isFitWidth: true,
                isAnimated: true
            });
        },
        resetMasonry: function(){
            $(this.defaults.container).masonry() ? 
                    $(this.defaults.container).masonry("destroy").css("height", 0).html("") : "";
        },
        initializeInfinit: function (totalPage) {
        	var self = this;
        	$(this.defaults.container).infinitescroll("destroy");
            $(this.defaults.container).infinitescroll({
                speed: "slow",
                navSelector: "#page-nav",
                nextSelector: "#page-nav a",
                itemSelector: this.defaults.itemSelector,
                extraScrollPx: 0,
                loading: {
                    msgText: "正在加载...",
                    finishedMsg: "加载完毕！",
                    selector: "#loading",
                    img: "http://www.chinaso.com/common/base/image/loading.gif"
                },
                state: {
                    isDuringAjax: false,
                    isInvalidPage: false,
                    isDestroyed: false,
                    isDone: false, // For when it goes all the way through the archive.
                    isPaused: false,
                    isBeyondMaxPage: false,
                    currPage: 1
                },
                dataType: "json",
                appendCallback: false,
                pathParse: function(path) {
                    path = path.match(/^(.*?)2(\..*?$)/).slice(1);
                    return path;
                },
                maxPage: totalPage - 1
            }, function(json, opts, url) {
                if (json.data.length > 0) self.ajaxCallback(json); else $(self.defaults.container).infinitescroll("destroy");
            });
        },
        getData: function () {
            var self = this;
            var sort_type = "";
            if (this.defaults.json_index) {
            	sort_type = this.defaults.json_index + 1;
            }
            return $.ajax({
                url: self.defaults.url + self.defaults.jsonpath + "/data" + sort_type + ".json?p="+ new Date().getTime(),
                type: "GET",
                dataType: "json"
            });
        },
        ajaxCallback: function (data) {
            var self = this;
            $(this.defaults.container).infinitescroll("pause");
            this.defaults.json_index++;
            data.itemW = this.defaults.itemW;
            data.json_index = this.defaults.json_index;
            data.content_mar = this.defaults.content_mar;
            var ele = _.template($("#Id_stream_tmpl").html(), data),
            	$newElems = $($.parseHTML(ele));
            $newElems.find("img").css({
                opacity: 0
            });
            $newElems.imagesLoaded(function() {
                $newElems.find("img").css({
                    opacity: 1
                });
                $(self.defaults.container).append($newElems).masonry("appended", $newElems, true);
                if (self.defaults.json_index < self.defaults.loadPageSize) {
                    $(self.defaults.container).infinitescroll("resume");
                } else {
                    $(self.defaults.container).infinitescroll("destroy");
                    if (self.defaults.json_index === parseInt(self.defaults.totalPage)) {
                        var loadingTip = $("#clickLoading");
                        loadingTip.html("加载完毕！").show().off("click");
                        return false;
                    } else {
                        $("#clickLoading").html("点击加载更多...").show();
                    }
                }
                if ($(document).height() >= $(window).height()) {
                    $(window).trigger("resize");
                }
            });
            $newElems.find("img").each(function () {
                $(this).imagesLoaded(function () {
                    var cur = this;
                    self.getNaturalDimensions(cur.elements[0], function (naturalWidth, naturalHeght) {
                        $(cur.elements[0]).attr({
                            bsize_w: naturalWidth,
                            bsize_h: naturalHeght
                        });
                        self.resizeWidth($(cur.elements[0]));
                    });
                });
            });
        },
        getNaturalDimensions: function (img, callback) {
            var image,
                naturalWidth = img.naturalWidth,
                naturalHeight = img.naturalHeight;
            if (!naturalHeight) {
                image = new Image();
                image.src = img.src;
                if (image.complete) {
                    callback(image.width, image.height);
                }
                image.onload = function () {
                    callback(this.width, this.height);
                }
            } else {
                callback(naturalWidth, naturalHeight);
            }
        },
        resizeWidth: function ($eles) {
            var self = this;
            self.getItemW($(self.defaults.buildContainer).width());
            $eles.each(function() {
                var tImg = $(this).find("img");
                tImg = tImg.length ? tImg : $(this);
                var bsizeW = tImg.attr('bsize_w'),
                    bsizeH = tImg.attr('bsize_h'),
                    imgW = self.defaults.itemW - self.defaults.content_mar,
                    imgH = parseInt(imgW * bsizeH / bsizeW);
                $(this).css("width", self.defaults.itemW + "px");
                if (imgW && imgH) {
                    tImg.css("width", imgW + "px");
                    tImg.css("height", imgH + "px");
                }
            });
            $(self.defaults.container).masonry({
                columnWidth: self.defaults.itemW + 10 - 1
            });
        }
	});
	module.exports = {
		build: function (setting) {
			var i;
			return i = new imageStream(setting), i;
		}
	};
});