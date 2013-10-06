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
	this._lineBreak = '\n';
}

/**
 * Creates a new buffer and returns it's identifier.
 *
 * @param {String} [initialContent] The default string to store within the buffer. Defaults to an empty string.
 * @return {String} The new buffers identifier.
 */
Buffers.prototype.create = function (initialContent) {
	var identifier = _.uniqueId('buffer_');

	this._buffers[identifier] = {
		lines: initialContent.split(this._lineBreak)
	};

	return identifier;
};

/**
 * Fetches the content from a buffer as a single string.
 *
 * @param {String} identifier Identification key for your desired buffer.
 * @return {String} The buffers contents.
 */
Buffers.prototype.getContent = function (identifier) {
	var buffer = this._buffers[identifier];
	return buffer.lines.join(this._lineBreak);
};

module.exports = {
	register: function (context) {
		context.buffers = new Buffers(context);
	}
};
