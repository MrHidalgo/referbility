const gulp    = require('gulp'),
  runSequence = require('run-sequence');


/**
 * @description Gulp build - build source files.
 */
gulp.task("build", function(callback) {
  runSequence(
    'clean',
    'copy',
    'fonts',
		'iconfont',
    'spritePNG',
    'spriteSVG',
    'js',
    'scss',
    'pug',
    'vendorScript',
    'vendorStyle',
    'vendorFont',
    'list-pages',
    callback
  );
});