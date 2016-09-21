/* ==== CSS Tasks ---> */

gulp.task('serve', ['default'], function() {

	gulpsettings.useBrowserSync = true;

    browserSync.init({
        server: paths.dist.htmlpath
    });

    plugins.watch([paths.src.jspath + '**/*.js'],
				function () {
					gulp.start('javascript:webpack', browserSync.reload);
				});

    plugins.watch([paths.src.csspath + 'site.scss',
			paths.src.csspath + 'pages/*.scss'],
				function () {
					gulp.start('css:sass:dev');
				});

	plugins.watch([paths.src.imagepath + '**/*.{jpg,png,gif,svg}'],
				function () {
					gulp.start('images:copy', browserSync.reload);
				});


	plugins.watch([paths.src.htmlpath + '**/*.html'],
				function () {
					gulp.start('html:copy', browserSync.reload);
				});
});

/* <--- CSS Tasks ==== */