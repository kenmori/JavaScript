module.exports = function(grunt) {
    /* --------------------------------
    環境設定
    -------------------------------- */
    // 変数定義
    var pkg, taskName;
    pkg = grunt.file.readJSON('package.json');

    // pakage.jsonに記載されているパッケージを自動読み込み
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }


    /* --------------------------------
    タスクの設定
    -------------------------------- */
    grunt.initConfig({

        // 変数定義
        pkg: pkg,
        dir: {
            bin:'./',//作業フォルダ
            release: 'asset/sp/feature/<%= pkg.name %>', // CDN用フォルダ
            js: 'src/js',
            css: 'src/css',
            img:'src/img',
            sass:'src/sass'
        },

        // Compassの設定
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        // ファイルを監視する
        watch: {
            sass: {
                files: ['<%= dir.sass %>/*.scss'],
                tasks: ['compass','csscomb']
            },
            html_files:{
                files:'index.html'
            // files:'html/*.html'
            },
            options:{
            livereload: true
            }
        },

        // CSSのプロパティを揃える
        // csscomb: {
        //     options:{
        //         config: 'package.json'
        //     },
        //     build: {
        //         files: [{
        //             src: ['src/css/vallentain.css'],
        //             dest: '<%= dir.css %>/vallentain.css'
        //         }]
        //     }
        // },

        // CSS圧縮（srcに複数ファイルfを指定することで、1つのファイルに圧縮される）
        cssmin: {
            combine: {
                files: {
                    '<%= dir.release %>/css/vallentain.css': ['src/css/vallentain.css']
                }
            }
        },
        // ファイルをコピーする
        copy: {
            img: {
                expand: true,
                cwd: './src',
                src: ['img/**'],
                dest: '<%= dir.release %>/'
            }
        },

        // JS圧縮（srcに複数ファイルを指定することで、1つのファイルに圧縮される）
        // uglify: {
        //     min: {
        //         src: ['src/js/*.js'],
        //         dest: '<%= dir.release %>/js'
        //     }
        // },

        //PNG画像減色
        pngmin: {
            min: {
                options: {
                    ext: '.png',
                    quality: '80-90',
                    force: true
                },
                files: [{
                    expand: true,
                    cwd: './src/img/',
                    src: ['**/*.png'],
                    dest: '<%= dir.release %>/img/'
                }]
            }
        },

        // CDNアップ用zipファイル作成
        compress: {
            main: {
                options: {
                    archive: 'asset.zip'
            },
            expand: true,
            cwd: 'asset/',
            src: ['**/*'],
            dest: 'asset/'
            }
        },

        // 不要なファイルを削除する
        clean: {
            // releaseフォルダ内を削除する
            del: {
                src: ['<%= dir.release %>/', 'asset.zip']
            },
            // 不要なファイルを削除する
            cleanup: {
                // releaseフォルダ内から不要ファイル削除
                del: {
                    src: ['<%= dir.release %>/**/.DS_Store', '<%= dir.release %>/**/Thumbs.db']
                }
            }
        },

        //サーバーを立ち上げる
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '<%= dir.root %>'
                }
            }
        }
    });



    /* --------------------------------
    タスクの実行
    -------------------------------- */
    // デフォルトタスク（gruntで実行可能）
    grunt.registerTask('default', ['connect','watch','csscomb']);

    // 納品用のCSSファイルを作るためのgruntコマンド
    grunt.registerTask('css', ['cssmin']);

    // 納品用のJSファイルを作るためのgruntコマンド
    grunt.registerTask('js', ['uglify']);

    // 納品用の画像ファイルを作るためのgruntコマンド
    grunt.registerTask('img', ['pngmin']);

    // CDNアップ用
    grunt.registerTask('cdn', ['css', 'img', 'compress']);

    // 処理でエラーが出てもgruntを続ける
    grunt.registerTask('eatwarnings', function() {
        grunt.warn = grunt.fail.warn = function(warning) {
            grunt.log.error(warning);
        };
    });
};
