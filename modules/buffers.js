/**
 * Module for managing buffers. These hold file contents and meta data.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Buffers(context) {
	this._context = context;
}

module.exports = {
	register: function (context) {
		exports.buffers = new Buffers(context);
	}
};
