var _ = require('lodash');

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
 * Expands a locator by iteratively executing it and passing it the previous
 * result each time.
 *
 * @param {Number} count The amount of times it should be expanded.
 * @param {Object} locator The locator to execute.
 * @param {Object} win Window to execute on.
 */
Locators.prototype.expand = function (count, locator, win) {
	var previous = win.cursor;
	var partialLocator = _.partial(locator, win);

	while (count--) {
		previous = partialLocator(previous);
	}

	return previous;
};

/**
 * Moves the windows cursor left.
 *
 * @param {Object} win
 * @param {Object} current The current position.
 * @return {Object} The character to the left.
 */
Locators.prototype.left = function (win, current) {
	return {
		x: current.x - 1,
		y: current.y
	};
};

/**
 * Moves the windows cursor right.
 *
 * @param {Object} win
 * @param {Object} current The current position.
 * @return {Object} The character to the right.
 */
Locators.prototype.right = function (win, current) {
	return {
		x: current.x + 1,
		y: current.y
	};
};

/**
 * Moves the windows cursor up.
 *
 * @param {Object} win
 * @param {Object} current The current position.
 * @return {Object} The character above.
 */
Locators.prototype.up = function (win, current) {
	return {
		x: current.x,
		y: current.y - 1
	};
};

/**
 * Moves the windows cursor down.
 *
 * @param {Object} win
 * @param {Object} current The current position.
 * @return {Object} The character below.
 */
Locators.prototype.down = function (win, current) {
	return {
		x: current.x,
		y: current.y + 1
	};
};

module.exports = {
	register: function (context) {
		context.locators = new Locators(context);
	}
};
