module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        qunit: {
            files: ["**/*.html"]
        },
        watch: {
            files: ["static/js/idx.build.js"],
            tasks: ["jshint", "qunit"]
        },
        jshint: {
            option: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            },
            files: [
                "static/js/idx.build.js"
            ]
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */'
            },
            beautify: {
                ascii_only: true
            },
            index: {
                files: [{
                        "static/css/video-index.css": [
                            "static/css/video-index.dev.css"
                        ]
                }]
            }
        },
        concat: {
            options: {
                separator: ";",
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            base: {
            	files: [{
            		"static/js/base.build.js": [
            			"static/js/common/base/require.js",
            			"static/js/common/base/underscore.js"
            		]
            	}]
            },
            common: {
            	files: [{
            		"static/js/com.build.js": [
            			"static/js/common/controller/utils.js",
            			"static/js/common/controller/ie.vertion.js",
            			"static/js/common/controller/event.dispatcher.js",
            			"static/js/common/controller/publish.js",
            			"static/js/common/controller/subscriber.js",
            			"static/js/common/controller/slider.js",
            			"static/js/common/controller/image.stream.js",
            			"static/js/common/controller/carousel.js",
            			"static/js/common/controller/transform.carousel.js",
            			"static/js/common/controller/jScroll.js",
            			"static/js/common/controller/item-convert.js",
            			"static/js/common/controller/cur.convert.js",
            			"static/js/common/controller/responsive.js",
            			"static/js/common/controller/select.js",
            			"static/js/common/controller/tag.cloud.js",
            			"static/js/common/controller/simple.calendar.js",
            			"static/js/common/controller/verti.topdown.js",
                        "static/js/common/controller/paging.js",
                        "static/js/common/controller/nav.js",
                        "static/js/common/controller/soRest-tab.js",
                        "static/js/common/controller/iframeAutoHeight.js"
            		]
            	}]
            },
            idx: {
                files: [{
                    "static/js/idx.build.js": [
                        "static/js/index/slider.js", "static/js/index/carousel.js", 
                        "static/js/index/videoFunction.js", "static/js/index/zhibo.js",
                        "static/js/index/dom.lazyload.js"
                    ]
                }]
            },
            detail: {
                files: [{
                    "static/js/detail.build.js": ["static/js/detail/carousel.js", "static/js/detail/dtl_tab.js"]
                }]
            },
            search_result: {
            	files: [{
            		"static/js/search-result.build.js": ["static/js/search_result/item-convert-view.js", "static/js/search_result/option-search.js"]
            	}]
            },
            zhanKai_Huiqu: {
            	files: [{
            		"static/js/zhanKai_huiQu.build.js": ["static/js/search_result/zhanKai_huiQu.js"]
            	}]
            },
            film: {
                files: [{
                    "static/js/film.build.js": ["static/js/index/slider.js", "static/js/index/carousel.js"]
                }]
            },
            film_detail: {
            	files: [{
            		"static/js/film.detail.build.js": ["static/js/search_result/item-convert-view.js"]
            	}]
            },
            news: {
                files: [{
                    "static/js/news.build.js": ["static/js/index/videoFunction.js", "static/js/index/router.js"]
                }]
            }
        },
        uglify: {
            options: {
                report: "min",
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            base: {
            	files: [{
            		"static/js/base.build.js": [
            			"static/js/common/base/require.js",
            			"static/js/common/base/underscore.js"
            		]
            	}]
            },
            common: {
            	files: [{
            		"static/js/com.build.js": [
            			"static/js/common/controller/utils.js",
            			"static/js/common/controller/ie.vertion.js",
            			"static/js/common/controller/event.dispatcher.js",
            			"static/js/common/controller/publish.js",
            			"static/js/common/controller/subscriber.js",
            			"static/js/common/controller/slider.js",
            			"static/js/common/controller/image.stream.js",
            			"static/js/common/controller/carousel.js",
            			"static/js/common/controller/transform.carousel.js",
            			"static/js/common/controller/jScroll.js",
            			"static/js/common/controller/item-convert.js",
            			"static/js/common/controller/cur.convert.js",
            			"static/js/common/controller/responsive.js",
            			"static/js/common/controller/select.js",
            			"static/js/common/controller/tag.cloud.js",
            			"static/js/common/controller/simple.calendar.js",
                        "static/js/common/controller/verti.topdown.js",
                        "static/js/common/controller/paging.js",
                        "static/js/common/controller/nav.js",
                        "static/js/common/controller/soRest-tab.js",
                        "static/js/common/controller/iframeAutoHeight.js"
            		]
            	}]
            },
            idx: {
                files: [{
                    "static/js/idx.build.js": [
                        "static/js/index/slider.js", "static/js/index/carousel.js", 
                        "static/js/index/videoFunction.js", "static/js/index/zhibo.js",
                        "static/js/index/dom.lazyload.js"
                    ]
                }]
            },
            detail: {
                files: [{
                    "static/js/detail.build.js": ["static/js/detail/carousel.js", "static/js/detail/dtl_tab.js"]
                }]
            },
            search_result: {
            	files: [{
            		"static/js/search-result.build.js": ["static/js/search_result/item-convert-view.js", "static/js/search_result/option-search.js"]
            	}]
            },
            zhanKai_Huiqu: {
            	files: [{
            		"static/js/zhanKai_huiQu.build.js": ["static/js/search_result/zhanKai_huiQu.js"]
            	}]
            },
            film: {
                files: [{
                    "static/js/film.build.js": ["static/js/index/slider.js", "static/js/index/carousel.js"]
                }]
            },
            film_detail: {
            	files: [{
            		"static/js/film.detail.build.js": ["static/js/search_result/item-convert-view.js"]
            	}]
            },
            news: {
                files: [{
                    "static/js/news.build.js": ["static/js/index/videoFunction.js", "static/js/index/router.js"]
                }]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-css");
    
    grunt.registerTask("cssminIndex", ["cssmin:index"]);

    grunt.registerTask("test", ["jshint", "qunit"]);

    
    
    grunt.registerTask("concatBase", ["concat:base"]);
    grunt.registerTask("minBase", ["uglify:base"]);
    grunt.registerTask("concatCommon", ["concat:common"]);
    grunt.registerTask("minCommon", ["uglify:common"]);
    
    
    grunt.registerTask("concatIdx", ["concat:idx"]);
    grunt.registerTask("minIdx", ["uglify:idx"]);

    grunt.registerTask("concatDetail", ["concat:detail"]);
    grunt.registerTask("minDetail", ["uglify:detail"]);

    grunt.registerTask("concatSearchRe", ["concat:search_result"]);
    grunt.registerTask("minSearchRe", ["uglify:search_result"]);  
    
    grunt.registerTask("concatZKHQ", ["concat:zhanKai_Huiqu"]);
    grunt.registerTask("minZKHQ", ["uglify:zhanKai_Huiqu"]);

    grunt.registerTask("concatFilm", ["concat:film"]);
    grunt.registerTask("minFilm", ["uglify:film"]);

    grunt.registerTask("concatFilmDetail", ["concat:film_detail"]);
    grunt.registerTask("minFilmDetail", ["uglify:film_detail"]);

    grunt.registerTask("concatNews", ["concat:news"]);
    grunt.registerTask("minNews", ["uglify:news"]);
};