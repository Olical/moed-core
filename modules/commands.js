/**
 * Default set of commands. Can be mapped to keys.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Commands(context) {
	this._context = context;
}

module.exports = {
	register: function (context) {
		context.commands = new Commands(context);
	}
};
