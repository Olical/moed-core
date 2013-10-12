/**
 * This module contains methods to locate certain items within a window. These
 * can be composed with commands and mappings to create ways of navigating and
 * manipulating file.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Locators(context) {
	this._context = context;
}

/**
 * Moves the windows cursor left.
 *
 * @param {Object} win
 */
Locators.prototype.left = function (win) {
	win.cursor.x -= 1;
};

/**
 * Moves the windows cursor right.
 *
 * @param {Object} win
 */
Locators.prototype.right = function (win) {
	win.cursor.x += 1;
};

/**
 * Moves the windows cursor up.
 *
 * @param {Object} win
 */
Locators.prototype.up = function (win) {
	win.cursor.y -= 1;
};

/**
 * Moves the windows cursor down.
 *
 * @param {Object} win
 */
Locators.prototype.down = function (win) {
	win.cursor.y += 1;
};

module.exports = {
	register: function (context) {
		context.locators = new Locators(context);
	}
};
