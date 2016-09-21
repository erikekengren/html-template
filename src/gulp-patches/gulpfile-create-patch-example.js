/* ==== Includes ---> */

gulp = require('gulp');

// Auto-load gulp modules from package.json file
plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'imagemin-*', 'postcss-*'],
	replaceString: /^gulp(-|\.)|^imagemin-|^postcss-/,
	rename: {
		'gulp-util'              : 'gutil'
	}
});

gulp.task('default',
	[
		'patch.create'
	]
);

gulp.task('patch.create', function () {
	return gulp.src('./node_modules/gulp-local-screenshots/**', { stripBOM: false })
		.pipe(plugins.patch('./node_modules/gulp-local-screenshots-old/'))
		.pipe(plugins.patch.write('./gulp-patches/'));
});