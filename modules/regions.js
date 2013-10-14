/**
 * This module allows you to define regions using regular expressions. These
 * regions can then be mapped to string based wrappers that your frontend can
 * use to colour and style the text.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Regions(context) {
	this._context = context;
	this._regions = [];
}

/**
 * Defines a region. Regions are strings that are matched within a line by a
 * regular expression. These regions can be key words, symbols or other such
 * text. A region may also state what it must be a descendant of.
 *
 * @param {String} name Label for the region, "boolean", for example.
 * @param {RegExp} expression The expression to match.
 * @param {String[]} [ancestors] Optional array of ancestors that this region must be a child of to match. For instance, ["language-javascript", "comment"] could be used to restrict it to within JavaScript comments.
 */
Regions.prototype.define = function (name, expression, ancestors) {
	this._regions.push({
		name: name,
		expression: expression,
		ancestors: ancestors
	});
};

/**
 * Parses a single line of a buffer with an optional root ancestor. Will return
 * all matched regions.
 *
 * @param {String} subject The string to search.
 * @param {String} [root] Optional root node, such as the current language.
 */
Regions.prototype.match = function (subject, root) {
	var regions = this._regions;
	var length = regions.length;
	var result;
	var i;

	for (i = 0; i < length; i++) {
		result = regions[i].exec(subject);
	}
};

module.exports = {
	register: function (context) {
		context.regions = new Regions(context);
	}
};
