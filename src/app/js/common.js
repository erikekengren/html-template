var jQuery = require('jQuery');

module.exports = {
	setup: function (callback) {
		(window.onpopstate = function () {
			var match,
				pl	 = /\+/g,  // Regex for replacing addition symbol with a space
				search = /([^&=]+)=?([^&]*)/g,
				decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
				query  = window.location.search.substring(1);

			window.urlParams = {};
			while (match = search.exec(query))
				window.urlParams[decode(match[1])] = decode(match[2]);
		})();

		// Add code here

		if (callback)
			callback();
	},
	init: function (callback) {
		window.jQuery(function() {
			// Add code here
			jQuery('header a.menu').mobileMenu();

			if (callback)
				callback();
		});
	}
};