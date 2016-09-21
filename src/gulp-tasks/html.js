/* ==== HTML Tasks ---> */

gulp.task('html:copy', ['preprocess:html'], function() {
	return gulp.src([paths.build.htmlpath + '**/*.html', '!' + paths.build.htmlpath + '_*/**/*.html'],
					{ read : true, base: paths.build.htmlpath })
					.pipe(gulp.dest(paths.dist.htmlpath));
});

/* <--- HTML Tasks ==== */