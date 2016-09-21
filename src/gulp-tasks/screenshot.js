/* ==== Screenshot Tasks ---> */

gulp.task('screenshots', ['setup:dev'], function () {
	return gulp.src(paths.dist.htmlpath + '**/*.html')
		.pipe(plugins.localScreenshots({
			path: paths.dist.htmlpath,
			port: 8080,
			width: ['1280', '768', '480'],
			type: 'png',
			server: true,
			folder: paths.screenshots
		}))
		.pipe(gulp.dest(paths.screenshots))
		.on('end', function () {
			return del(paths.screenshots + '**/*.html', { force: true });
		});
});

/* <--- Screenshot Tasks ==== */