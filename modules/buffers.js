var _ = require('lodash');

/**
 * Module for managing buffers. These hold file contents and meta data.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Buffers(context) {
	this._context = context;
	this._buffers = {};
}

/**
 * Creates a new buffer and returns it's identifier.
 *
 * @param {String} [initialContent] The default string to store within the buffer. Defaults to an empty string.
 * @return {Object} The new buffer.
 */
Buffers.prototype.create = function (initialContent) {
	var identifier = _.uniqueId('buffer_');

	this._buffers[identifier] = {
		identifier: identifier,
		lines: (initialContent || '').split('\n')
	};

	return this._buffers[identifier];
};

/**
 * Fetches the buffer object by identifier.
 *
 * @param {String} identifier Identification key for your desired buffer.
 * @return {Object} The buffer object you requested.
 */
Buffers.prototype.get = function (identifier) {
	return this._buffers[identifier];
};

module.exports = {
	register: function (context) {
		context.buffers = new Buffers(context);
	}
};
