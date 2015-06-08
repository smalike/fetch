module.exports = function (grunt) {
    
    var config_base_path = {
        files: [{
            "assets/fetch.js": [
                        "src/assets/fetch.js",
                        "src/assets/utils/class.js",
                        "src/assets/utils/util.js",
                        "src/assets/utils/event/event.js",
                        "src/assets/utils/event/dispatcher.js",
                        "src/assets/utils/event/publish.js",
                        "src/assets/utils/event/subscriber.js",
                        "src/assets/utils/json2.js",
                        "src/assets/utils/storage.js",
                        "src/assets/utils/cookie.js",
                        "src/assets/utils/date/time.js",
                        "src/assets/utils/date/lunar-calendar.js",
                        "src/assets/utils/console.js"
                    ]
            }]
    },
    config_util_path = {
        files: [{
            "assets/utils/util.js": [
                    "src/assets/utils/class.js",
                    "src/assets/utils/util.js",
                    "src/assets/utils/event/event.js",
                    "src/assets/utils/event/dispatcher.js",
                    "src/assets/utils/event/publish.js",
                    "src/assets/utils/event/subscriber.js",
                    "src/assets/utils/json2.js",
                    "src/assets/utils/storage.js",
                    "src/assets/utils/cookie.js",
                    "src/assets/utils/date/time.js",
                    "src/assets/utils/date/lunar-calendar.js",
                    "src/assets/utils/console.js"
                ]
        }]
    },
    config_widget_path = {
        files: [{
            // 启用动态扩展
            expand: true,

            // 源文件匹配都相对此目录
            cwd: 'src/assets/widget',

            // 匹配模式
            src: ['**/*.js'],

            // 目标路径前缀
            dest: 'assets/widget/',

            // 目标文件路径中文件的扩展名
            ext: '.js',

            // 扩展名始于文件名的第一个点号
            extDot: 'first'
        }]
    },
    carousel = {
        files: [{
            "assets/widget/ui/carousel/carousel.js": [
                "src/assets/widget/ui/carousel/carousel.js"
            ]
        }]
    };
    
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
        pathcheck: {
            default_options: {
                options: {
                    basePath: "src/",
                    notCheckDependencePaths: ["jquery"]
                },
                files: {
                    "tmp/default_options": ["src/assets/**/*.js"]
                }
            }
        },
        clean: {
            options: {},
            build: {
                src: ["assets/"]
            },
            base: {
                src: ["assets/fetch.js"]
            },
            widget: {
                src: ["assets/widget/"]
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
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
            base: config_base_path,
//            util: config_util_path,
            widget: config_widget_path,
            carousel: carousel
        },
        uglify: {
            options: {
                report: "min",
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            base: config_base_path,
//            util: config_util_path,
            widget: config_widget_path,
            carousel: carousel
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-css");
    grunt.loadNpmTasks("pathcheck");
    
    grunt.registerTask("pc", ["pathcheck"]);
    
    grunt.registerTask("cssminIndex", ["cssmin:index"]);

    grunt.registerTask("test", ["jshint", "qunit"]);

    
    
    grunt.registerTask("cBase", ["concat:base"]);
    grunt.registerTask("uBase", ["uglify:base"]);
    
//    grunt.registerTask("cUtil", ["concat:util"]);
//    grunt.registerTask("uUtil", ["uglify:util"]);
    
    grunt.registerTask("cWidget", ["concat:widget"]);
    grunt.registerTask("uWidget", ["uglify:widget"]);
    
    
    grunt.registerTask("resetBase", ["clean:base", "uglify:base"]);
    grunt.registerTask("reset", ["clean:build", "uglify:base", "uglify:widget"]);
    
    
    grunt.registerTask("cCarousel", ["concat:carousel"]);
    grunt.registerTask("uCarousel", ["uglify:carousel"]);
    
};
