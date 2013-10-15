/**
 * Module to facilitate events and messages being passed between other modules.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Events(context) {
	this._context = context;
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
 * And you can set the `this` object for each listener if you so choose. If the
 * listener returns -1 then it will be automatically removed.
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
			if (listeners[i].apply(scope, args) === -1) {
				this.removeListener(event, listeners[i--]);
				length--;
			}
		}
	}
};

/**
 * This is a helper for emitEvent. It makes it easier to emit an event with a
 * key and some values when you want the key to be part of the event.
 *
 * First, it will emit the event name and pass the key as the first argument
 * with the normal values following after. Then it will emit another event
 * where the key is appended onto the event name with a hash.
 *
 * This allows users to listen to certain sub-sets of events.
 *
 * @param {String} event Name of the event to emit.
 * @param {String} key The key to first emit as part of the arguments and then as part of the event name.
 * @param {*[]} [args] List of arguments to apply to the listeners.
 * @param {Object} [scope] The object that the listener will have it's `this` object set to.
 */
Events.prototype.emitScopedEvent = function (event, key, args, scope) {
	this.emitEvent(event, [key].concat(args), scope);
	this.emitEvent([
		event,
		key
	].join('#'), args, scope);
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

		if (listeners.length === 0) {
			delete this._events[event];
		}
	}
};

module.exports = {
	register: function (context) {
		context.events = new Events(context);
	}
};
