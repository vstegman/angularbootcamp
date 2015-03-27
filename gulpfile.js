var gulp = require('gulp'),
  connect = require('gulp-connect'),
  karma = require('karma').server;

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
