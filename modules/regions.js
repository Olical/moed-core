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

/**
 * Defines a region, obviously. This region can either contain a start and end expression to define a large, multi line, region or a single complete match. The single match is suited for key words and the start/end expressions are meant for multi line comments and strings.
 *
 * A region may also state what it must be a descendant of.
 */

module.exports = {
	register: function (context) {
		context.regions = new Regions(context);
	}
};
