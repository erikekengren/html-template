/* ==== Javascript Tasks ---> */

gulp.task('javascript:webpack', ['preprocess:javascript'], function(done) {
	// run webpack
	return webpack(require('../webpack.config.js'), function(err, stats) {
		if(err) throw new plugins.gutil.PluginError('webpack', err);
		plugins.gutil.log('[webpack]', stats.toString({
		// output options
		}));
		done();
	});
});

gulp.task('javascript:minify', ['json:lint'], function(done) {
	return gulp.src(paths.dist.jspath + '*.js')
				.pipe(plugins.uglify())
				.pipe(gulp.dest(paths.dist.jspath));
});

gulp.task('json:copy', ['javascript:webpack'], function(done) {
	return gulp.src(paths.build.jspath + '**/*.json',
					{ read : true, base: paths.build.jspath })
					.pipe(gulp.dest(paths.dist.jspath));
});

gulp.task('json:lint', ['json:copy'], function(done) {
	var jsonReporter = function (file) {
		plugins.gutil.log('File ' + file.path + ' is not valid JSON.');
	};

	return gulp.src(paths.dist.jspath + '**/*.json')
		.pipe(plugins.jsonlint())
		.pipe(plugins.jsonlint.failOnError())
		.pipe(plugins.jsonlint.reporter(jsonReporter));
});

/* <--- Javascript Tasks ==== */