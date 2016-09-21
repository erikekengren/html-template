var common = require('../common');
var viewport = require('../lib/viewport');
var resizehelper = require('../lib/resizehelper');

common.setup(function () {
	// Add code here that doesn't need the DOM
});

common.init(function () {
	// Add code here to be run on DOMReady/PageLoad

	viewport.register({
		'max-width 800px': function () {
			jQuery('.viewport').html('viewport size < 800 px');
		},
		'min-width 800px': function () {
			jQuery('.viewport').html('viewport size >= 800 px');
		}
	});

	var matchHeights = function() {
		jQuery('section article,section aside').matchHeight({ debug: true });
	}

	//*
	jQuery(window).on('resize:start', function() {
		console.log('started resizing window');
	});

	jQuery(window).on('resize:end', function() {
		console.log('stopped resizing window');

		matchHeights();
	});

	matchHeights();
	/**/
});