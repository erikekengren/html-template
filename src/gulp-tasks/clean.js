/* ==== Clean Tasks ---> */

gulp.task('clean:all', ['setup:dev'], function() {
	return del([paths.build.basepath, paths.dist.basepath, paths.screenshots], { force: true });
});

gulp.task('clean:post-build', ['javascript:webpack', 'css:sass', 'images:minify', 'post:file-timestamps'], function () {
	return del([paths.build.basepath], { force: true });
});

/* <--- Clean Tasks ==== */