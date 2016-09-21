var jQuery = require('jQuery');

var resizehelper = {}

resizehelper.saved = {
	width : 0,
	height: 0
}

resizehelper.timeoutId = -1;
resizehelper.timeoutInterval = 100;

resizehelper.isresizing = false;

jQuery(window).resize(function() {
	if (!resizehelper.isresizing) {
		var setTimeoutFunction = function() {
			resizehelper.timeoutId = window.setTimeout(function() {
				var newWidth = jQuery(window).width();
				var newHeight = jQuery(window).height();

				if (newWidth != resizehelper.saved.width || newHeight != resizehelper.saved.height) {
					resizehelper.saved.width = newWidth;
					resizehelper.saved.height = newHeight;

					setTimeoutFunction();
				}
				else {
					jQuery(window).trigger('resize:end');
					resizehelper.isresizing = false;
				}

			}, resizehelper.timeoutInterval);
		}

		resizehelper.isresizing = true;
		resizehelper.saved.width = jQuery(window).width();
		resizehelper.saved.height = jQuery(window).height();
		setTimeoutFunction();

		jQuery(window).trigger('resize:start');
	}
});


module.exports = resizehelper;