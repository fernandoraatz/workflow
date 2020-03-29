/*
|--------------------------------------------------------------------------
| Gulp and Plugins
|--------------------------------------------------------------------------
*/

// Gulp

var gulp = require('gulp');

// Plugins

var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var autoprefixer = require('gulp-autoprefixer');
var connect = require( 'gulp-connect' );

/*
|--------------------------------------------------------------------------
| Paths
|--------------------------------------------------------------------------
*/

var public = 'public/';
var src = 'src/'; 

var paths = {

    sass : [
             src + 'sass/**/*.scss',
             src + 'sass/style.scss'
    ],
    js_lint : [
            src + 'js/**/*.js',
            '!' + src + 'js/vendor/*.js'
    ],
    js : [
             src + 'js/core/namespaces.js',
             src + 'js/helpers/*.js',
             src + 'js/controllers/*.js',
             src + 'js/app.js'
    ],
    files : [
          'public/index.html', 
           public + 'css/style.css'
    ]
} 

/*
|--------------------------------------------------------------------------
| Tasks
|--------------------------------------------------------------------------
*/

// FILES

gulp.task( 'files', function() {
  return gulp
    .src(paths.files).pipe(connect.reload());
});

// CLEAN

gulp.task('clean', function () {
  return gulp
    .src([
      'public/css/style.css',
      'public/js/scripts.js',
      ])
      .pipe(clean());
});

// CONCAT e MINIFICA

gulp.task('concat', function () {
    return gulp
    .src(paths.js)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

 // LINT

 gulp.task('lint', function() {
    return gulp
    .src(paths.js_lint)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish));
});

// SASS

 gulp.task('sass', function () {
    return gulp
    .src(paths.sass)
    // .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
     }).on('error', sass.logError))
     // .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'))
    .resume();
});


/*
|--------------------------------------------------------------------------
| General Tasks
|--------------------------------------------------------------------------
*/

// Watch

gulp.task('watch', ['sass', 'lint', 'concat', 'files' ], function() {

  gulp.watch(paths.js, ['concat']);
  gulp.watch(paths.js_lint, ['lint']);
  gulp.watch(paths.sass ,['sass']);
  gulp.watch(paths.files, [ 'files' ]);

});

// Connect

gulp.task( 'connect', function() {
  connect.server({ livereload: true });
});

// Default

gulp.task('default', ['connect','watch']);
