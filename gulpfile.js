var gulp = require("gulp");
var connect = require("gulp-connect");
var path = require("path");
var sass = require("gulp-sass");
var gutil = require("gulp-util");
var ftp = require("gulp-ftp");

var path = [
"./html/**/*.html",
"./css/**/*.css",
"./scss/**/*.scss"
];
var target = {
	local : "./html/*.html",
	host : "./study/html/"
};

gulp.task("fafa", function(){
	return gulp.src(target.local)
		.pipe(ftp({
			host : "ftp.80452ec58b45dc2b.lolipop.jp",
			user : "lolipop.jp-80452ec58b45dc2b",
			pass : "ok365a12",
			remotePath : target.host
		}))
		.pipe(gutil.noop());
});
// gulp.task("all", function(){
// 	return gulp.src("./html/150404_2.html")
// 		.pipe(sftp({
// 			host :"kenjimorita.jp",
// 			user : "lolipop.jp-80452ec58b45dc2b",
// 			pass : "ok365a12",
// 			remotePath : "/lolipop.jp-80452ec58b45dc2b/study/html"
// 		}));
// });


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

gulp.task("reload", function() {
	gulp.src('./html/*.html')
	.pipe(connect.reload());
	gulp.src('./scss/*.html')
	.pipe(connect.reload());
});




gulp.task("default", ["connect", "watch","fafa"]);
