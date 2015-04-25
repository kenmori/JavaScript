'use strict';

var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
minifyCss = require('gulp-minify-css'),
imagemin = require('gulp-imagemin');

var path = {
js: ['../vendor/**/*.js'],
css: ['../vendor/**/*.css']
}

gulp.task('bench-concat', function() {
gulp.src(path.js)
	.pipe(concat('all.js'))
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('bench-uglify', function() {
gulp.src(path.js)
	.pipe(uglify())
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('bench-cssmin', function() {
gulp.src(path.css)
	.pipe(concat('all.min.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('dist/css/'));
});

gulp.task('bench-imagemin', function() {
gulp.src(['../images/**/*.{png,jpg,gif}'])
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images/'));
});

gulp.task('default', ['bench-concat', 'bench-uglify', 'bench-cssmin', 'bench-imagemin']);
