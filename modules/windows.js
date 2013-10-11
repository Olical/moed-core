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
	context.settings.set('windows.current', this.create());
}

/**
 * Creates a new window with a buffer.
 *
 * @param {Object} [buffer] The buffer the window should point at. It will create a new buffer if you do not pass one.
 * @return {Object} The new window.
 */
Windows.prototype.create = function (buffer) {
	var identifier = _.uniqueId('window_');

	this._windows[identifier] = {
		identifier: identifier,
		buffer: buffer || this._context.buffers.create()
	};

	return this._windows[identifier];
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
