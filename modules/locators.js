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

module.exports = {
	register: function (context) {
		context.locators = new Locators(context);
	}
};
