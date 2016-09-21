/* ==== Preprocessor Tasks ---> */

gulp.task('preprocess:html', function(done) {
	return gulp.src([paths.src.htmlpath + '**/*.html'])
		.pipe(plugins.preprocess({ context : build_config }))
		.pipe(gulp.dest(paths.build.htmlpath));
});

gulp.task('preprocess:images', function(done) {
	// Just copy
	return gulp.src([paths.src.imagepath + '**/*.{jpg,png,gif,svg}'],
			{ read : true, base: paths.src.imagepath })
			.pipe(gulp.dest(paths.build.imagepath));
});

gulp.task('preprocess:sass-library-files', function(done) {
	// Just copy
	return gulp.src([
						paths.src.csspath + 'bourbon/**/*',
						paths.src.csspath + 'components/*',
						paths.src.csspath + 'lib/**/*',
						paths.src.csspath + 'mixins/**/*',
						paths.src.csspath + 'neat/**/*'
					],
					{ read : true, base: paths.src.csspath })
					.pipe(gulp.dest(paths.build.csspath));
});

gulp.task('preprocess:sass', function(done) {
	return gulp.src(paths.src.csspath + 'pages/*.scss')
					.pipe(plugins.preprocess({ context : build_config }))
					.pipe(gulp.dest(paths.build.csspath + 'pages/'))
					.on('end', function () {
						gulp.src([
							paths.src.csspath + 'site.scss',
							paths.src.csspath + '_*.scss'
						])
						.pipe(plugins.preprocess({ context : build_config }))
						.pipe(gulp.dest(paths.build.csspath))
					});
});

gulp.task('preprocess:css', ['preprocess:sass-library-files', 'preprocess:sass']);

gulp.task('preprocess:js-vendor-files', function(done) {
	// Just copy
	return gulp.src([paths.src.jspath + 'vendor/modernizr.js'],
					{ read : true, base: paths.src.jspath })
					.pipe(gulp.dest(paths.dist.jspath));
});

gulp.task('preprocess:javascript', ['preprocess:js-vendor-files', 'preprocess:json'], function(done) {
	return gulp.src(paths.src.jspath + '**/*.js')
					.pipe(plugins.preprocess({ context : build_config }))
					.pipe(gulp.dest(paths.build.jspath));
});

gulp.task('preprocess:json', function(done) {
	return gulp.src(paths.src.jspath + '**/*.json')
					.pipe(plugins.preprocess({ context : build_config }))
					.pipe(gulp.dest(paths.build.jspath));
});

gulp.task('preprocess:all', ['preprocess:html', 'preprocess:images',
							'preprocess:css', 'preprocess:javascript']);

/* <--- Preprocessor Tasks ==== */