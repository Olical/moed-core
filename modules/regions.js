/**
 * This module allows you to define regions using regular expressions. These
 * regions can then be mapped to string based wrappers that your frontend can
 * use to colour and style the text.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Regions(context) {
}

module.exports = {
	register: function (context) {
		context.regions = new Regions(context);
	}
};
