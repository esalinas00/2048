var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var connect = require('gulp-connect');

gulp.task('sass',function(){
	return gulp.src('src/sass/**.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCss())
	.pipe(gulp.dest('build/css'))
	.pipe(connect.reload())
	.pipe(notify("Sass Task Completed"));
});

gulp.task('js',function(){
	return gulp.src('src/js/**.js')
	.pipe(changed('build/js'))
	.pipe(jshint({'lookup':true}))
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
	.pipe(connect.reload())
	.pipe(notify("Uglify Task Completed"));
});

gulp.task('connect',function(){
	connect.server({
		port: 8080,
		host:'2048.dev',
		livereload: true
	});
});

gulp.task('html',function(){
	return gulp.src('index.html')
	.pipe(connect.reload());
});

gulp.task('watch',function(){
	gulp.watch('src/sass/**.scss',['sass']);
	gulp.watch('src/js/**.js',['js']);
	gulp.watch('index.html',['html']);
});

gulp.task('default',['watch','js','sass','connect'],function(){
});
