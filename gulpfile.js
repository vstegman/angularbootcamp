var gulp = require('gulp'),
  connect = require('gulp-connect'),
  karma = require('karma').server,
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  annotate = require('gulp-ng-annotate');

gulp.task('js',function(){
  gulp.src("www/app/**/*.js")
    .pipe(concat("all.js"))
    .pipe(annotate())
    .pipe(uglify())
    .pipe(gulp.dest('www'));
});

gulp.task('connect', function() {
  connect.server({
    root: "www"
  });
});

gulp.task('unit-test', function(done){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', ['connect', 'unit-test']);
