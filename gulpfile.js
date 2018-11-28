// Dependencies
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');
const pump = require('pump');

// Tasks
gulp.task('uglify', function(cb) {
    pump([
        gulp.src('src/scripts/*.js'),
        uglify(),
        gulp.dest('src/dist/scripts')
    ],
    cb
    );
});

gulp.task('sass', function() {
    return gulp.src('src/sass/app.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

gulp.task('postcss', function() {
    return gulp.src('src/css/app.css')
        .pipe(postcss())
        .pipe(gulp.dest('src/dist/css'));
});

gulp.task('imagemin', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/dist/images'));
});

// Run all tasks
gulp.task('default', ['uglify', 'sass', 'postcss', 'imagemin']);