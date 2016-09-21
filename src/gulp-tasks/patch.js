/* ==== Patch Tasks ---> */

var os = require('os');

gulp.task('patch:gulp-local-screenshots', function () {
	var platform = os.platform();

	if (platform == 'win32' || platform == 'win64') {
		return plugins.patch.read('./gulp-patches/gulp-local-screenshots-windows/', './node_modules/gulp-local-screenshots/', { stripBOM: false })
			.pipe(plugins.patch.apply('./node_modules/gulp-local-screenshots/'));
	}
	else {
		return plugins.patch.read('./gulp-patches/gulp-local-screenshots/', './node_modules/gulp-local-screenshots/', { stripBOM: false })
			.pipe(plugins.patch.apply('./node_modules/gulp-local-screenshots/'));
	}
});


gulp.task('patch:all', ['patch:gulp-local-screenshots'], function (done) {
	done();
});


/* <--- Patch Tasks ==== */