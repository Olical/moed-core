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
	this._context.settings.set('lineBreakCharacter', '\n');
}

/**
 * Creates a new buffer and returns it's identifier.
 *
 * @param {String} [initialContent] The default string to store within the buffer. Defaults to an empty string.
 * @return {Object} The new buffer.
 */
Buffers.prototype.create = function (initialContent) {
	var identifier = _.uniqueId('buffer_');
	var lineBreakCharacter = this._context.settings.get('lineBreakCharacter');
	var buffer = {
		identifier: identifier,
		lines: (initialContent || '').split(lineBreakCharacter)
	};

	this._buffers[identifier] = buffer;
	this._context.events.emitEvent('buffers.create', [buffer, identifier]);

	return buffer;
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

/**
 * Fetches the full content for a buffer.
 *
 * @param {String} identifier Identification key for your desired buffer.
 * @return {String} The full joined contents of the buffer (not it's lines).
 */
Buffers.prototype.getContent = function (identifier) {
	var buffer = this.get(identifier);
	var lineBreakCharacter = this._context.settings.get('lineBreakCharacter');

	if (buffer) {
		return buffer.lines.join(lineBreakCharacter);
	}
};

/**
 * Destroys the buffer that matches the identifier.
 *
 * @param {String} identifier Buffer to destroy.
 */
Buffers.prototype.destroy = function (identifier) {
	delete this._buffers[identifier];
	this._context.events.emitScopedEvent('buffers.destroy', identifier);
};

/**
 * Returns an array of all current buffer identifiers.
 *
 * @return {String[]} The complete buffer identifier list.
 */
Buffers.prototype.getIdentifiers = function () {
	return Object.keys(this._buffers);
};

module.exports = {
	register: function (context) {
		context.buffers = new Buffers(context);
	}
};
