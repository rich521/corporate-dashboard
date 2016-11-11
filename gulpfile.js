var gulp = require('gulp');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');

// Watch all files when changing live 
gulp.task('default', function() {
    browserSync.init({
        browser: 'google chrome',
        port: 3000,
        server: {
          baseDir:'./dist',
          middleware: [ historyApiFallback() ],
        }
    });
    gulp.watch('./src/js/**/*.js', ['js-watch']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('public', function() {
    browserSync.init({
        browser: "google chrome",
        server: "./dist"
    });
});

var jsSrc = 'src/js/bundle.js';
gulp.task('react', function() {
    return gulp.src(jsSrc)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js/'));
});

//Only runs after react & minify is complete
gulp.task('js-watch', ['react'], function(done) {
    browserSync.reload();
    done();
});
