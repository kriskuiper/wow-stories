// Dependencies
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');

sass.compiler = require('node-sass');
const pump = require('pump');

// Tasks
gulp.task('uglify', function(cb) {
    pump([
        gulp.src('src/scripts/*.js'),
        rename({suffix: '.min'}),
        uglify(),
        gulp.dest('src/dist/scripts')
    ],
    cb
    );
});

gulp.task('sass', function() {
    return gulp.src('src/sass/app.sass')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

gulp.task('minify-css', function() {
    return gulp.src('src/css/app.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/dist/css'));
});

gulp.task('imagemin', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/dist/images'));
});


gulp.task('watch', function() {
    gulp.watch('src/sass/*.sass', ['sass']);
    gulp.watch('src/scripts/app.js', ['uglify']);
    gulp.watch('src/css/app.css', ['minify-css']);
    gulp.watch('src/index.html', ['imagemin']);
});

// Run all tasks
gulp.task('default', ['watch']);

