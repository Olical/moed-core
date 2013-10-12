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
 * @return {Object} The character to the left.
 */
Locators.prototype.left = function (win) {
	return {
		x: win.cursor.x - 1,
		y: win.cursor.y
	};
};

/**
 * Moves the windows cursor right.
 *
 * @param {Object} win
 * @return {Object} The character to the right.
 */
Locators.prototype.right = function (win) {
	return {
		x: win.cursor.x + 1,
		y: win.cursor.y
	};
};

/**
 * Moves the windows cursor up.
 *
 * @param {Object} win
 * @return {Object} The character above.
 */
Locators.prototype.up = function (win) {
	return {
		x: win.cursor.x,
		y: win.cursor.y - 1
	};
};

/**
 * Moves the windows cursor down.
 *
 * @param {Object} win
 * @return {Object} The character below.
 */
Locators.prototype.down = function (win) {
	return {
		x: win.cursor.x,
		y: win.cursor.y + 1
	};
};

module.exports = {
	register: function (context) {
		context.locators = new Locators(context);
	}
};
