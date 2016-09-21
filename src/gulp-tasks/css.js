/* ==== CSS Tasks ---> */

gulp.task('css:sass', ['preprocess:css', 'html:copy'], function () {
	var spriteImagePathPattern = new RegExp('^' + build_config.gulp.postcss.sprites.imagesBaseUrl + '(.+?)/sprites/.+\.(?:png|gif)$', 'i');
	var fs = require('fs');
	var crypto = require('crypto');

	return gulp.src(paths.build.csspath + 'site.scss')
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass())
			.pipe(plugins.postcss([
				plugins.at2x(),
				plugins.assets({
					loadPaths:  ['assets/images/'],
					basePath: paths.build.basepath,
					relative: true,
					cachebuster: function (filePath, urlPathname) {
						if (!build_config.gulp.postcss.assets.cachebuster)
							return false;

						if (build_config.gulp.postcss.assets.cachebuster == 'hash') {
							var contents = fs.readFileSync(filePath).toString();

							var digest = crypto.createHash('md5').update(contents).digest('hex');

							return digest;
						}
						else {
							var getDateString = function (dateToFormat) {
								var year = dateToFormat.getFullYear().toString();
								var month = utils.formatNumber(dateToFormat.getMonth() + 1);
								var day = utils.formatNumber(dateToFormat.getDate());
								var hour = utils.formatNumber(dateToFormat.getHours());
								var minutes = utils.formatNumber(dateToFormat.getMinutes())
								var seconds = utils.formatNumber(dateToFormat.getSeconds());

								return year + month + day + hour + minutes + seconds;
							}

							var stats = fs.statSync(filePath);

							var dateString = getDateString(stats.mtime);

							return dateString;
						}
					}
				}),
				plugins.sprites.default({
					stylesheetPath: paths.dist.csspath,
					spritePath: paths.dist.imagepath + '/sprites/',
					//verbose: true,
					retina: true,
					filterBy: function(image) {
						// Check if the files are in a folder called sprites
						var urlParts = image.url.split('/');

						var folderName = urlParts[urlParts.length - 2];

						if (!/^sprites$/i.test(folderName)) {
							return Promise.reject();
						}

						return Promise.resolve();
					},
					groupBy : function(image) {
						var folderName = image.url.replace(spriteImagePathPattern, '$1').replace('/', '-');

						return Promise.resolve(folderName);
					}
				}),
				plugins.autoprefixer({
					//browsers: taken from the browserslist file
					// TODO: add browser list to build_config?
				}),
				plugins.pxtorem(build_config.gulp.postcss.pxtorem)
			]))
			.pipe(plugins.uncss({
				html: [
					//'http://localhost:4000/',
					paths.build.htmlpath + '**/*.html'
				],
				uncssrc: './config/gulp.uncss.rc'
			}))
			//.pipe(plugins.cssmin())
			.pipe(plugins.sourcemaps.write('./'))
			.pipe(gulp.dest(paths.dist.csspath))
			.pipe(plugins.gulpif(gulpsettings.useBrowserSync, browserSync.stream()));
});

gulp.task('css:sass:dev', ['preprocess:css'], function () {
	return gulp.src(paths.build.csspath + 'site.scss')
			.pipe(plugins.sass())
			.pipe(plugins.postcss([
				plugins.at2x(),
				plugins.assets({
					loadPaths:  ['assets/images/'],
					basePath: paths.build.basepath,
					relative: true
				}),
				plugins.autoprefixer(),
				plugins.pxtorem(build_config.gulp.postcss.pxtorem)
			]))
			.pipe(gulp.dest(paths.dist.csspath))
			.pipe(plugins.gulpif(gulpsettings.useBrowserSync, browserSync.stream()));
});

/* <--- CSS Tasks ==== */