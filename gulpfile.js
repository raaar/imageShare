'use strict';

var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var sass = require('gulp-sass');
var uglifyjs = require('uglify-js-harmony'); // can be a git checkout
var minifier = require('gulp-uglify/minifier');
var pump = require('pump');

gulp.task('live-server', function(){
  var server = new LiveServer('app.js');
  server.start();

  gulp.watch([
          'gulpfile.js',
          'app.js',
          'src/server/**/*',
  ], function (file) {
      server.start.apply(server);
      server.notify.apply(server, [file]);
  })
});


gulp.task('bundle',function(){
    return browserify({
        entries:'./src/client/main.js',
        debug:true,
    })
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/scripts'))
    .pipe(browserSync.stream());
});


gulp.task('scss', function(){
    return gulp.src('./scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));       
});


gulp.task('serve',['bundle','live-server'],function(){
    browserSync.init(["./public/css/*.css"],{
        proxy:"http://localhost:7777",
        port: 9001,
        open: false
    });
});





gulp.task('compress', function (cb) {
  // the same options as described above
  var options = {
    preserveComments: 'license'
  };

  pump([
      gulp.src('public/scripts/*.js'),
      minifier(options, uglifyjs),
      gulp.dest('public/')
    ],
    cb
  );
});


gulp.task('default',/* ['serve'] */ ['bundle'] , function() {
    gulp.watch('src/client/**/*', ['bundle']);
    gulp.watch('scss/**/*.scss', ['scss']);
});



