var fs			= require('fs');
var path		= require('path');
var _			= require('lodash');
var gutil		= require('gulp-util');
var crypto      = require('crypto');
var through	    = require('through2');
//var PluginError = gutil.PluginError;


function gulpFiletimestamp(basepath, options){
	// can't find watermark, exit now
	if (!basepath || !basepath.length) {
		new gutil.PluginError({
		  plugin: 'FileTimestamp',
		  message: 'Parameter basepath is not set'
		});
	}

	// helper methods
	var utils = {
		cachedValues: [],
		getCachedValue: function (filePath, type) {
			return utils.cachedValues[filePath + '#' + type];
		},
		setCachedValue: function (filePath, type, value) {
			utils.cachedValues[filePath + '#' + type] = value;
		},
		appendQS : function (url, qsKey, qsValue) {
			var qsKeyPattern = new RegExp('(?:\\?|&)' + qsKey + '=(?:[a-zA-Z0-9]+?)', 'i');

			if (qsKeyPattern.test(url)) {
				var qsReplacePattern = new RegExp(qsKey + '=([a-zA-Z0-9]+)', 'gi');

				return url.replace(qsReplacePattern, qsKey + '=' + qsValue);
			}
			else {
				return url + (url.indexOf('?') >= 0 ? '&' : '?') + qsKey + '=' + qsValue;
			}
		},
		getFileModificationDate : function (filePath) {
			var qsIndex = filePath.indexOf('?');

			if (qsIndex >= 0)
				filePath = filePath.substring(0, qsIndex);


			var cachedValue = utils.getCachedValue(filePath, 'timestamp');

			if (cachedValue && cachedValue.length)
				return cachedValue;


			var stats = fs.statSync(filePath);

			var dateString = utils.getDateString(stats.mtime);

			utils.setCachedValue(filePath, 'timestamp', dateString);

			return dateString;
		},
		getFileHash : function (filePath) {
			var qsIndex = filePath.indexOf('?');

			if (qsIndex >= 0)
				filePath = filePath.substring(0, qsIndex);


			var cachedValue = utils.getCachedValue(filePath, 'md5');

			if (cachedValue && cachedValue.length)
				return cachedValue;


			var contents = utils.getFileContents(filePath);

			var digest = crypto.createHash('md5').update(contents).digest('hex');

			utils.setCachedValue(filePath, 'md5', digest);

			return digest;
		},
		getFileContents : function (filePath) {
			return fs.readFileSync(filePath).toString();
		},
		getDateString : function (dateToFormat) {
			var year = dateToFormat.getFullYear().toString();
			var month = utils.formatNumber(dateToFormat.getMonth() + 1);
			var day = utils.formatNumber(dateToFormat.getDate());
			var hour = utils.formatNumber(dateToFormat.getHours());
			var minutes = utils.formatNumber(dateToFormat.getMinutes())
			var seconds = utils.formatNumber(dateToFormat.getSeconds());

			return year + month + day + hour + minutes + seconds;
		},
		formatNumber : function (number) {
			if (number < 10)
				number = '0' + number;

			return number.toString();
		}
	};


	var settings = _.extend({
		'marker': '<(?:[^>]*?)data-cache-option="(?:[^"]*?)"(?:[^>]*?)>',
		'typeIdentifier': ' *data-cache-option="([^"]*?)"',
		'types' : {
			'css': {
				'identifier' : /<link/i,
				'path' : /href="([^"]+?)"/i
			},
			'js' : {
				'identifier' : /<script/i,
				'path' : /src="([^"]+?)"/i
			}
		}
	}, options || {});

	settings.basepath = basepath;

	var exp = new RegExp(settings.marker, 'ig');


	return through.obj(function(file, enc, callback) {
		if (file.isNull() || file.isDirectory()) {
			this.push(file);
			return callback();
		}

		// No support for buffers
        /*if (file.isBuffer()) {
            this.emit('error', new gutil.PluginError({
                plugin: 'FileTimestamp',
                message: 'Buffers are not supported.'
            }));
            return callback();
        }*/

        var data = file.contents.toString(enc);

		while ((matches = exp.exec(data)) != null) {
			var hasModifications = false;

			for (var i = 0; i < matches.length; i++) {
				var match = matches[i];
				var type = match.match(settings.typeIdentifier)[1];

				// tag type
				if (settings.types.css.identifier.test(match)) {
					var url = match.match(settings.types.css.path)[1];

					if (type == 'hash')
						var qs = utils.getFileHash(path.join(settings.basepath, url));
					else
						var qs = utils.getFileModificationDate(path.join(settings.basepath, url));

					var newurl = utils.appendQS(url, 'v', qs);

					data = data.replace(url, newurl);

					hasModifications = true;
				}

				if (settings.types.js.identifier.test(match)) {
					var url = match.match(settings.types.js.path)[1];

					if (type == 'hash')
						var qs = utils.getFileHash(path.join(settings.basepath, url));
					else
						var qs = utils.getFileModificationDate(path.join(settings.basepath, url));

					var newurl = utils.appendQS(url, 'v', qs);

					data = data.replace(url, newurl);

					hasModifications = true;
				}
			}

			if (hasModifications) {
				data = data.replace(new RegExp(settings.typeIdentifier, 'ig'), '');

				file.contents = new Buffer(data);
			}
		}


		this.push(file);

		return callback();
	}, null);
}


module.exports = gulpFiletimestamp;