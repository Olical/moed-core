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
 * Creates a new window with a buffer. You can also specify a default cursor
 * position.
 *
 * @param {Object} [buffer] The buffer the window should point at. It will create a new buffer if you do not pass one.
 * @param {Number} [x] Initial cursor column. Defaults to 0.
 * @param {Number} [y] Initial cursor line. Defaults to 0.
 * @return {Object} The new window.
 */
Windows.prototype.create = function (buffer, x, y) {
	var identifier = _.uniqueId('window_');
	var win = {
		identifier: identifier,
		buffer: buffer || this._context.buffers.create(),
		currentScroll: 0,
		cursor: {
			x: x || 0,
			y: y || 0
		}
	};

	this._windows[identifier] = win;
	this._context.events.emitScopedEvent('windows.create', win.buffer.identifier, [win, identifier]);

	return win;
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

/**
 * Destroys a window with a matching identifier.
 *
 * @param {String} identifier The window to destroy.
 */
Windows.prototype.destroy = function (identifier) {
	delete this._windows[identifier];
	this._context.events.emitScopedEvent('windows.destroy', identifier);
};

module.exports = {
	register: function (context) {
		context.windows = new Windows(context);
	}
};
