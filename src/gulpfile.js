/* ==== Includes ---> */

gulp = require('gulp');

// Auto-load gulp modules from package.json file
plugins = require('gulp-load-plugins')({
	//DEBUG: true,
	pattern: ['gulp-*', 'gulp.*', 'imagemin-*', 'postcss-*'],
	replaceString: /^gulp(-|\.)|^imagemin-|^postcss-/,
	rename: {
		'gulp-util'  : 'gutil',
		'gulp-if'    : 'gulpif'
	}
});

// Settings list to be used by the various tasks
gulpsettings = {
	useBrowserSync : false // This is set by the BrowserSync task, do not change
};

// Webpack for javascript processing
webpack = require('webpack');

// Browser-sync for development
browserSync = require('browser-sync').create();

// Modules that were not automatically loaded
plugins.autoprefixer = require('autoprefixer');
//plugins.sprites = plugins.sprites.default;

// Load custom modules from local folder
filetimestamp = require('./gulp-lib/gulp-file-timestamp');

// System modules
os = require('os');
del = require('del');


// Platform specific includes
if (os.platform() == 'darwin') {
	// Load modules here for Mac OS X specific things
}


// Load tasks
require('require-dir')('./gulp-tasks'); 

/* <--- Includes ==== */


/* ==== Variables ---> */

build_config = {}; // These will be populated by the setup tasks
paths = {};

/* <--- Variables ==== */


/* ==== Main Tasks ---> */

gulp.task('default',
	[
		'setup:dev',
		'preprocess:all',
		'html:copy',
		'images:copy',
		'css:sass',
		'javascript:webpack',
		'json:lint'
	]
);

gulp.task('release',
	[
		'setup:release',
		'preprocess:all',
		'html:copy',
		'images:minify',
		'css:sass',
		'javascript:webpack',
		'json:lint',
		'javascript:minify',
		'post:file-timestamps',
		'post:strip-comments',
		'clean:post-build'
	]
);

/* <--- Main Tasks ==== */


/* ==== Watch Tasks ---> */

gulp.task('watch', ['default'], function(done) {
	plugins.watch([paths.src.jspath + '**/*.js'],
				function () {
					gulp.start('javascript:webpack');
				});

	plugins.watch([paths.src.csspath + 'site.scss',
			paths.src.csspath + '_*.scss',
			paths.src.csspath + 'components/**/*.scss',
			paths.src.csspath + 'pages/**/*.scss'],
				function () {
					gulp.start('css:sass');
				});

	plugins.watch([paths.src.imagepath + '**/*.{jpg,png,gif,svg}'],
				function () {
					gulp.start('images:copy');
				});

	plugins.watch([paths.src.htmlpath + '**/*.html'],
				function () {
					gulp.start('html:copy');
				});

	done();
});

/* <--- Watch Tasks ==== */


/* ==== Clean Tasks ---> */

// See gulp-tasks/clean.js

/* <--- Clean Tasks ==== */


/* ==== Setup and Loading Variables ---> */

// See gulp-tasks/setup.js

/* <--- Setup and Loading Variables ==== */


/* ==== Preprocessor Tasks ---> */

// See gulp-tasks/preprocessor.js

/* <--- Preprocessor Tasks ==== */


/* ==== HTML Tasks ---> */

// See gulp-tasks/html.js

/* <--- HTML Tasks ==== */


/* ==== Image Tasks ---> */

// See gulp-tasks/images.js

/* <--- Image Tasks ==== */


/* ==== CSS Tasks ---> */

// See gulp-tasks/css.js

/* <--- CSS Tasks ==== */


/* ==== Javascript Tasks ---> */

// See gulp-tasks/javascript.js

/* <--- Javascript Tasks ==== */


/* ==== Asset Lint and Cleanup Tasks ---> */

// See gulp-tasks/asset-management.js

/* <--- Asset Lint and Cleanup Tasks ==== */


