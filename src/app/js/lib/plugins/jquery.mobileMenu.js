jQuery.fn.extend({
	'mobileMenu': function (options) {
		var settings = jQuery.extend({
			'debug': false,
			'menuSelector': 'header nav ul',
			'menuOpenClass': 'open'
		}, options);
		
		var target = this;
		var selector = this.selector;
		var maxHeight = -1;
		var tallestElement;

		jQuery(target).on('click', function() {
			jQuery(settings.menuSelector).toggleClass(settings.menuOpenClass);

			return false;
		});

		return target;
	}
});