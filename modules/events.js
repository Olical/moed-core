/**
 * Module to facilitate events and messages being passed between other modules.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Events(context) {
	this._events = {};
}

/**
 * Adds a listener for an event.
 *
 * @param {String} event Name of the event to add the listener to.
 * @param {Function} listener
 */
Events.prototype.addListener = function (event, listener) {
	var listeners = this._events[event];

	if (!listeners) {
		listeners = this._events[event] = [];
	}

	listeners.push(listener);
};

/**
 * Emits an event. This means that it will execute all of the listeners
 * attached to that event. You can also provide a list of arguments to be given
 * to each listener.
 *
 * And you can set the `this` object for each listener if you so choose.
 *
 * @param {String} event Name of the event to emit.
 * @param {*[]} [args] List of arguments to apply to the listeners.
 * @param {Object} [scope] The object that the listener will have it's `this` object set to.
 */
Events.prototype.emitEvent = function (event, args, scope) {
	var listeners = this._events[event];
	var i;
	var length;

	if (listeners) {
		length = listeners.length;

		for (i = 0; i < length; i++) {
			listeners[i].apply(scope, args);
		}
	}
};

/**
 * Removes the listener from the specified event.
 *
 * @param {String} event Name of the event to remove from.
 * @param {Function} listener The listener to remove.
 */
Events.prototype.removeListener = function (event, listener) {
	var listeners = this._events[event];

	if (listeners) {
		listeners.splice(listeners.indexOf(listener), 1);
	}
};

module.exports = {
	register: function (context) {
		context.events = new Events(context);
	}
};
