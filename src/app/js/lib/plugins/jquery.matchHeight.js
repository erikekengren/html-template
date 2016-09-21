jQuery.fn.extend({
	'matchHeight': function (options) {
		var settings = jQuery.extend({
			'debug': false
		}, options);
		
		var target = this;
		var selector = this.selector;
		var maxHeight = -1;
		var tallestElement;

		if (settings.debug)
			console.log('matchHeight: Finding the tallest element');
		
		jQuery(target).each(function () {
			var height = jQuery(this).outerHeight();

			if (height > maxHeight) {
				maxHeight = height;
				tallestElement = jQuery(this);
			}
		});

		jQuery(target).css('height', maxHeight + 'px');

		if (settings.debug)
			console.log('matchHeight: The tallest element is ' + maxHeight + ' px.', tallestElement);

		return target;
	}
});