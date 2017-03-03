var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');


gulp.task('live-server', function(){
  var server = new LiveServer('app.js');
  server.start();

  gulp.watch([ 'app.js' ], function (file) {
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


gulp.task('serve',['bundle','live-server'],function(){
    browserSync.init(null,{
        proxy:"http://localhost:7777",
        port: 9001,
        open: false
    });
});


gulp.task('watch', ['serve'], function() {
    gulp.watch('src/client/**/*', ['bundle']);
});


/*
gulp.task('copy',function(){
    gulp.src(['app/*.css'])
    .pipe(gulp.dest('./.tmp'));
})
*/

