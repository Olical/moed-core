/**
 * Module for managing buffers. These hold file contents and meta data.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Buffers(context) {
	this._context = context;
	this._uniqueBufferIdentifier = 0;
	this._buffers = {};
}

/**
 * Creates a new buffer and returns it's identifier.
 *
 * @param {String} [initialContent] The default string to store within the buffer. Defaults to an empty string.
 * @return {Number} The new buffers identifier.
 */
Buffers.prototype.create = function (initialContent) {
	this._uniqueBufferIdentifier += 1;

	this._buffers[this._uniqueBufferIdentifier] = {
		content: initialContent,
		cursor: {
			x: 0,
			y: 0
		}
	};

	return this._uniqueBufferIdentifier;
};

/**
 * Fetches a buffer object by it's identifier.
 *
 * @param {Number} identifier Identification number of your desired buffer.
 * @return {Object} The requested buffer.
 */
Buffers.prototype.get = function (identifier) {
	return this._buffers[identifier];
};

module.exports = {
	register: function (context) {
		context.buffers = new Buffers(context);
	}
};
