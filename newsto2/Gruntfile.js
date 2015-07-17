'use strict';

module.exports = function(grunt) {
    var pkg, taskName;
    pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,
        dir: {
            bin:'src',//作業フォルダ
            release:'dist',//納品ファイル
            js: '**',
            css: '**',
            img:'**',
            sass:'src/sass'
        },
        // ファイルをコピーする
        copy: {
            images: {
                expand: true,
                cwd: '<%= dir.bin %>/',
                src: ['img/**'],
                dest: '<%= dir.release %>/'
            },
            js: {
                expand: true,
                cwd: '<%= dir.bin %>/',
                src: ['js/**'],
                dest: '<%= dir.release %>/'
            },
        },
        // 不要なファイルを削除する
        clean: {
            // releaseフォルダ内を削除する
            deleteReleaseFolder: {
                src: '<%= dir.release %>/'
            },
            // releaseイメージフォルダ内を削除する
            deleteReleaseJsFolder: {
                src: ['dist/js']
            },
            // releaseイメージフォルダ内を削除する
            deleteReleaseImgFolder: {
                src: ['dist/img']
            },
            // releaseイメージフォルダ内を削除する
            deleteReleaseCssFolder: {
                src: ['dist/css']
            }
        },
        // CSSを圧縮する
        cssmin: {
            combine: {
                files: {
                    'dist/css/news_all.css': ['src/css/*.css']
                }
            }
        },
        // jsを圧縮するよ！
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: '**/*.js',
                    dest: 'dist/js/'
                }]
            }
        },
        // 画像を圧縮するよ！
        imageoptim: {
            options: {
                jpegMini: false,
                quitAfter: true,
                imageAlpha: true
            },
            src: ['dist/img']
        },
        // jsファイル結合
        concat: {
            'dist/js/all.js': ['src/js/**/*.js']
        },
        // Compassの設定
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        //CSSドキュメント生成
        styleguide: {
            dist: {
                name: 'Style Guide',
                description: 'スタイルガイドです！',
                version: '1.0',
                url: 'http://auone.jp',
                options: {
                    framework: {
                        name: 'styledocco'
                    }
                },
                files: {
                    'styleguide': 'src/css/*.css'
                }
            }
        },
        //JSのドキュメントを生成
        yuidoc: {
            dist: {
                'name': 'dolphin',
                'description': "javascript-dolphin",
                'version': '1.0',
                options: {
                    //出力パスの指定(今回はGruntfile.jsと同階層に出力するよう指定)
                    paths: 'src/js/',
                    //YUIDocファイルを出力するディレクトリ名を記述
                    outdir: 'javascriptguide'
                }
            }
        },
        // ファイルを監視する
        watch: {
            sass: {
                files: ['<%= dir.sass %>/*.scss'],
                //tasks: ['compass','csscomb']
                tasks: ['compass']
            }
        },
        // CSSのプロパティを揃える
        csscomb:{
            dev:{
                expand: true,
                cwd: '<%= dir.bin %>/<%= dir.css %>/',
                src: ['*.css'],
                dest: '<%= dir.bin %>/<%= dir.css %>/'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '<%= dir.root %>/'
                }
            }
        }

    });


    // pakage.jsonに記載されているパッケージを自動読み込み
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }

    // sassをコンパイルするgruntコマンド
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('default', ['connect']);

    // 納品用のJSファイルを作るためのgruntコマンド
    grunt.registerTask('js', ['uglify']);

    // 納品用のCSSファイルを作るためのgruntコマンド
    grunt.registerTask('css', ['clean:deleteReleaseCssFolder','cssmin']);

    // 納品用の画像ファイルを作るためのgruntコマンド
    grunt.registerTask('img', ['clean:deleteReleaseImgFolder','copy:images','imageoptim']);

    // CSSのドキュメントを作るためのgruntコマンド
   grunt.registerTask('cssDoc', ['styleguide']);

    // JSのドキュメントを作るためのgruntコマンド
    grunt.registerTask('jsDoc', ['yuidoc']);

    grunt.registerTask('eatwarnings', function() {
        grunt.warn = grunt.fail.warn = function(warning) {
            grunt.log.error(warning);
        };
    });
};
