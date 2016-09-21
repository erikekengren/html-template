/* ==== Setup and Loading Variables ---> */

gulp.task('init', function(done) {
	var fs = require('fs-extra');
	var path = require('path');

	var bourbonPath = path.join(__dirname, '../app/sass/bourbon');

	try {
		var stats = fs.lstatSync(bourbonPath);
	}
	catch (e) {
		// doesn't exist - copy from bower_components
		fs.copySync(path.join(__dirname, '../bower_components/bourbon/app/assets/stylesheets'), bourbonPath, { clobber: true }, function (err) {
			if (err) return console.error(err);
		});
	}

	var bourbonNeatPath = path.join(__dirname, '../app/sass/neat');

	try {
		var stats = fs.lstatSync(bourbonNeatPath);
	}
	catch (e) {
		// doesn't exist - copy from bower_components
		fs.copySync(path.join(__dirname, '../bower_components/neat/app/assets/stylesheets'), bourbonNeatPath, { clobber: true }, function (err) {
			//if (err) return console.error(err);
		});
	}

	done();
});

gulp.task('setup:dev', ['init'], function(done) {
	build_config = require('../config/gulp.dev.json');

	build_config.preprocessor = require('../preprocessor_files/variables.dev.json');

	paths = build_config.paths;

	done();
});

gulp.task('setup:release', ['init'], function(done) {
	build_config = require('../config/gulp.release.json');

	build_config.preprocessor = require('../preprocessor_files/variables.release.json');

	paths = build_config.paths;

	done();
});

/* <--- Setup and Loading Variables ==== */