var webpack = require('webpack');
var path = require('path');

var build_config = require('./config/gulp.dev.json');


var webpackConfig = {
	context: path.join(__dirname, build_config.paths.build.jspath),
	entry: {
		// Common modules and vendor scripts
		'common': ['./lib/viewport', './lib/resizehelper',
					'./lib/plugins/jquery.matchHeight', './lib/plugins/jquery.mobileMenu',
					'jQuery', './common'],
		// Page modules
		'pages/home'        : ['./pages/home'],
		'pages/javascript'  : ['./pages/javascript'],
		'pages/page'        : ['./pages/page']
	},
	output: {
		path: path.join(__dirname, '..', 'dist', 'assets', 'js'), 
		filename: '[name].js',
		publicPath: '/assets/js/'
	},
	plugins: [
		// this chunks the commonly used modules.
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'common.js'
		}),
		new webpack.ProvidePlugin({
			'$': 'jQuery',
			'jQuery': 'jQuery',
			'window.jQuery': 'jQuery'
		})
	],
	module: {
	},
	externals: {
		// require("Modernizr") is external and available
		//  on the global var Modernizr
		'Modernizr': 'Modernizr'
	},
	resolve: {
		root: [
			path.join(__dirname, '..', 'js'),
		],
		alias: {
			'jQuery': path.join(__dirname, 'bower_components', 'jquery', 'dist', 'jquery')
		},
		modulesDirectories: ['bower_components']
	},
	devtool: '#source-map'
};

module.exports = webpackConfig;