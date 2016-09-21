/* ==== Asset Lint and Cleanup Tasks ---> */

gulp.task('post:strip-comments', ['html:copy', 'javascript:minify', 'css:sass'], function() {
	return gulp.src(paths.dist.htmlpath + '*.html')
				.pipe(plugins.stripComments())
				.pipe(gulp.dest(paths.dist.htmlpath));
});

gulp.task('post:file-timestamps', ['post:strip-comments'], function () {
	return gulp.src([paths.dist.htmlpath + '**/*.html'])
		.pipe(filetimestamp(paths.dist.basepath))
		.pipe(gulp.dest(paths.dist.htmlpath));
});

/* <--- Asset Lint and Cleanup Tasks ==== */