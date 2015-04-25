require('coffee-script/register');
coffee = require('./gulpfile.coffee');
gulp= require 'gulp'
concat= require 'gulp-concat'
plumber= require 'gulp-plumber'
files= ['./scss/*.scss','./html/*.html','./js/*.js','./css/*.css']
gulp.task 'watch',->
  gulp.watch './coffee/*.coffee',['coffee']
  gulp.watch './scss/*.scss',['scss']
  gulp.watch 'gulpfile.coffee',['coffee','scss']
  gulp.watch files,['reload']

gulp.task 'reload',->
  gulp.src(files)
    .pipe(localhost.reload())

gulp.task 'coffee',->
  coffee= require 'gulp-coffee'
  gulp.src './coffee/*.coffee'
    .pipe plumber()
    .pipe coffee()
    .pipe concat 'index.js'
    # .pipe gulp.dest __dirname

gulp.task 'scss',->
  sass= require 'gulp-sass'
#   pleeease= require 'gulp-pleeease'
  gulp.src './scss/*.scss'
    .pipe plumber()
    .pipe sass()
	.pipe gulp.dest('./css/*.css')
    .pipe pleeease ({
      minifier:false
      autoprefixer:
        browsers:
          ['last 2 version']
    })
    .pipe concat './css/*.css'
    .pipe(localhost.reload())

    # .pipe gulp.dest __dirname

localhost= require 'gulp-connect'
gulp.task 'localhost',->
  localhost.server {
    root: './'
    port: 8000
    livereload: true
  }

gulp.task 'default',['localhost','watch']
