var jQuery = require('jQuery');

var viewport = {}

viewport.resizeEndEvent = 'resize:end';

viewport.breakpoints = new Array();

var CallbackWrapper = function(min, max, callback) {
	this.min = min;
	this.max = max;
	this.callback = callback;
	this.hasRun = false;

	this.test = function(testNumber) {
		if (testNumber >= this.min && testNumber < this.max) {
			if (!this.hasRun) {
				this.callback(testNumber);
				this.hasRun = true;
			}
		} else 
			this.hasRun = false;
	}
}

viewport.register = function(options) {
	for (var key in options) {
		var min = 0;
		var max = 25000;

		var minFromKeyPattern = /.*min-width\s+(\d+)px.*/i;
		var maxFromKeyPattern = /.*max-width (\d+)px.*/i;

		if (minFromKeyPattern.test(key))
			min = Number(key.replace(minFromKeyPattern, '$1'));

		if (maxFromKeyPattern.test(key))
			max = Number(key.replace(maxFromKeyPattern, '$1'));

		var callback = new CallbackWrapper(min, max, options[key]);

		viewport.breakpoints.push(callback);
	}

	viewport.run();
}

viewport.run = function() {
	var currentWidth = jQuery(window).width();

	for (var count = 0; count < viewport.breakpoints.length; count++)
		viewport.breakpoints[count].test(currentWidth);
}

if (viewport.resizeEndEvent && viewport.resizeEndEvent.length) {
	jQuery(window).on(viewport.resizeEndEvent, function() {
		viewport.run();
	});
}
else {
	jQuery(window).resize(function() {
		viewport.run();
	});
}

module.exports = viewport;