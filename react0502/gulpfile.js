var gulp = require("gulp");
var gutil = require("gulp-util");
var ftp = require("gulp-ftp");
var autoprefixer = require('gulp-autoprefixer');


var path = require("path");
path = [
	"index.html",
	"./.css",
	"./.scss",
	"./img",
	"./.js"
];



var uglify = require("gulp-uglify");
gulp.task("jsmin",function(){
	gulp.src(["src/js/**/*.js","src/!js/min/**/*.js"])
	.pipe(uglify())
	.pipe(gulp.dest("./src/js/min"));
})




var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
gulp.task('cleanBuild',function(cb){
	var rimraf = require('rimraf');
	rimraf('./build',cb);
});
gulp.task('copyIndex',['cleanBuil'],function(){
return gulp.src('index.html')
.pipe(gulp.dest('./build'));
});
gulp.task('build', ['copyIndex'], function (cb) {
  return gulp.src('')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(''));
});


var browser = require("browser-sync");
gulp.task("server",function(){
	browser({
		server:{
			baseDir: "./"
		}
	});
});

gulp.task("default",['server'], function() {
	// gulp.watch(["./**/*.html","!html/min/**/*.html"],["html"]);
	gulp.watch(path[0],["html"]);
    gulp.watch(path[2],["scss"]);
});

var scss = require("gulp-sass");
gulp.task("scss",function(){
	gulp.src(path[2])
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest(path[1]))
	.pipe(browser.reload({stream:true}))
});

gulp.task('html',function(){
	gulp.src(path[0])
	.pipe(browser.reload({stream:true}))
})
