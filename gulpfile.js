var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var minifyHtml    = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  var options = {
    html5Mode: true,
    startPage: '/',
    title: "Mindlife-Starter-Ionic-Firebase Doc"
  }
  return gulp.src('./www/js/**/*.js')
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('./docs'));
});

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch('./www/templates/**/*.html', ['cache_templates']);
  gulp.watch('./www/js/**/*.html', ['cache_templates']);
  gulp.watch('./www/js/**/*.js', ['ng-annotate']);
  gulp.watch('./www/annotate/**/*.js', ['compress']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('cache_templates', function() {
  gulp.src('www/templates/**/*.html')
    .pipe(minifyHtml({empty: true}))
    .pipe(templateCache({
      standalone: true,
      root: 'templates'
    }))
    .pipe(gulp.dest('www/js'));
});

gulp.task('ng-annotate', function () {
    return gulp.src('www/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('www/annotate'));
});

gulp.task('compress', function() {
  return gulp.src('www/annotate/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('www/dist'));
});
