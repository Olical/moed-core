/**
 * A window is almost the equivalent of a view, if a buffer is a model. It can
 * run side by side with other windows, this is what the frontend will display.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Windows(context) {
	this._context = context;
}

module.exports = {
	register: function (context) {
		context.windows = new Windows(context);
	}
};
