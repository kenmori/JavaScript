var gulp = require("gulp");
var connect = require("gulp-connect");
var path = require("path");
var sass = require("gulp-sass");
var gutil = require("gulp-util");
var ftp = require("gulp-ftp");
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

var path = [
"./html/**/*.html",
"./css/**/*.css",
"./scss/**/*.scss"
];
var target = {
	local : "./html/*.html",
	host : "./study/html/"
};

gulp.task("sass",function(){
	gulp.src(['./scss/*.scss'])// srcを指定
	.pipe(sass())              // 指定したファイルをJSにコンパイル
	.pipe(gulp.dest('./dest')) // dest先に出力する
});

gulp.task("html",function(){
	gulp.src('./html/*.html')
});
gulp.task("connect", function() {
	connect.server({
		livereload: true,
		port: 8000,
		root: './'
	});
});

gulp.task("watch", function() {
	gulp.watch(path, ['sass','html','reload']);
});

gulp.task('cleanBuild',function(cb){
	var rimraf = require('rimraf');
	rimraf('./build',cb);
});

gulp.task('copyIndex',['cleanBuil'],function(){
return gulp.src('./index.html')
.pipe(gulp.dest('./build'));
});

gulp.task('build', ['copyIndex'], function (cb) {
  return gulp.src('')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(''));
});

gulp.task("reload", function() {
	gulp.src('./html/*.html')
	.pipe(connect.reload());
	gulp.src('./scss/*.html')
	.pipe(connect.reload());
});




gulp.task("default", ["connect", "watch"]);
