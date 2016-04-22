var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify');

var staticFolder = 'src/dashboard_base/dashboard/static/',
    jsSrc = staticFolder + 'js/src/*.js',
    jsDest = staticFolder + 'js',
    sassSrc = staticFolder + 'scss/**/*.scss',
    sassDest = staticFolder + 'css',
    vendorLibraries = staticFolder + 'bower_components/requirejs/require.js';

// Compile SASS
gulp.task('sass', function () {
  return gulp.src(staticFolder + 'scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(sassDest))
    .pipe(notify({message: 'Generated CSS: styles.min.css'}));
});

// Minify vendor libraries (don't concat)
gulp.task('vendor', function () {
  return gulp.src(vendorLibraries)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

// Lint, Concatenate & Minify JS
gulp.task('scripts', function () {
  return gulp.src(jsSrc)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
    .pipe(notify({message: 'Generated JS: scripts.min.js', onLast: true}));
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch(jsSrc, ['scripts']);
  gulp.watch(sassSrc, ['sass']);
});

// Default task
gulp.task('default', ['sass', 'vendor', 'scripts', 'watch']);
gulp.task('runonce', ['sass', 'vendor', 'scripts']);
