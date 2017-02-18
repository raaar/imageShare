var gulp = require('gulp');
var nodemon = require('nodemon');
var gulpMocha = require('gulp-mocha');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp

var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX


var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      		'node_modules/toastr/build/toastr.css'
    	],
		dist: './public',
		mainJs: './src/client/main.js'
	}
}

gulp.task('serve', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: config.port,
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function() {
    console.log('Restarting');
  });
});

gulp.task('test', function(){
  gulp.src('tests/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}));
});

/* // not working
gulp.task('bundle', function(){
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bun.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
});
*/

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
//		.pipe(connect.reload());
});

gulp.task('default', ['js', 'serve']);
