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
	win.cursor.x = position.x;
	win.cursor.y = position.y;
};

module.exports = {
	register: function (context) {
		context.commands = new Commands(context);
	}
};
