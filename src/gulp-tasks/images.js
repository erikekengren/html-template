/* ==== Image Tasks ---> */

gulp.task('images:minify', ['preprocess:all'], function() {
	return gulp.src(paths.build.imagepath + '**/*.{jpg,png,gif,svg}')
				.pipe(plugins.imagemin({
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [plugins.pngquant()]
				}))
				.pipe(gulp.dest(paths.dist.imagepath));
});

gulp.task('images:copy', ['preprocess:all'], function() {
	return gulp.src([
				paths.build.imagepath + '**/*.{jpg,png,gif,svg}',
			],
			{ read : true, base: paths.build.imagepath })
			.pipe(gulp.dest(paths.dist.imagepath));
});

/* <--- Image Tasks ==== */