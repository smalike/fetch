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
                        "assets/base/base.js": [
                            "src/assets/base/**/*.js",
                            "src/assets/utils/**/*.js"
                        ]
                }]
            },
            widget: {
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
            }
        },
        uglify: {
            options: {
                report: "min",
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            base: {
                files: [{
                        "assets/base/base.js": [
                            "src/assets/base/**/*.js",
                            "src/assets/utils/**/*.js"
                        ]
                }]
            },
            widget: {
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

    
    
    grunt.registerTask("cBase", ["concat:base"]);
    grunt.registerTask("uBase", ["uglify:base"]);
    
    grunt.registerTask("cWidget", ["concat:widget"]);
    grunt.registerTask("uWidget", ["uglify:widget"]);
    
};
