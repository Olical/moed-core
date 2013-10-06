var _ = require('lodash');

/**
 * A window is almost the equivalent of a view, if a buffer is a model. It can
 * run side by side with other windows, this is what the frontend will display.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Windows(context) {
	this._context = context;
	this._windows = {};
}

/**
 * Creates a new window with a buffer.
 *
 * @param {String} buffer The identifier for the buffer the window should point at.
 * @return {String} The identifier for the window.
 */
Windows.prototype.create = function (buffer) {
	var identifier = _.uniqueId('window_');
	this._windows[identifier] = {
		buffer: this._context.buffers.get(buffer)
	};
	return identifier;
};

/**
 * Fetches the window object by identifier.
 *
 * @param {String} identifier The window you want to retrieve.
 * @return {Object} The raw window object you requested.
 */
Windows.prototype.get = function (identifier) {
	return this._windows[identifier];
};

module.exports = {
	register: function (context) {
		context.windows = new Windows(context);
	}
};
