var _ = require('lodash');

/**
 * Default set of commands. Can be mapped to keys.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Commands(context) {
	this._context = context;
}

/**
 * Updates the specified window's cursor position.
 *
 * @param {Object} win
 * @param {Object} position
 */
Commands.prototype.moveCursor = function (win, position) {
	var positive = _.partial(Math.max, 0);
	var lines = win.buffer.lines;
	var lineCount = lines.length - 1;

	win.cursor.y = Math.min(positive(position.y), lineCount);
	win.cursor.x = Math.min(positive(position.x), lines[win.cursor.y].length - 1);
};

module.exports = {
	register: function (context) {
		context.commands = new Commands(context);
	}
};
