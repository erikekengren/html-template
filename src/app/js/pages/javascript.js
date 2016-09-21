var common = require('../common');
var viewport = require('../lib/viewport');

common.setup(function () {
	// Add code here that doesn't need the DOM
});

common.init(function () {
	// Add code here to be run on DOMReady/PageLoad

	var resizingTimeoutID = -1;
	jQuery(window).on('resize:start', function() {
		jQuery('.resize').html('resize:start event');

		if (resizingTimeoutID != -1) {
			window.clearTimeout(resizingTimeoutID);
			resizingTimeoutID = -1;
		}
	});

	jQuery(window).on('resize:end', function() {
		jQuery('.resize').html('resize:end event');

		resizingTimeoutID = window.setTimeout(function() {
			jQuery('.resize').html('Idle');
		}, 1500);
	});

	viewport.register({
		'max-width 800px': function () {
			jQuery('.viewport').html('Viewport size < 800 px');
		},
		'min-width 800px': function () {
			jQuery('.viewport').html('Viewport size >= 800 px');
		}
	});
});