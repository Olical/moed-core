/**
 * The settings module stores key value pairs. You can pass a target or context
 * string to add context aware overrides. This allows you to set a global
 * setting or an override for, say, a file type.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Settings(context) {
	this._context = context;
	this._settings = {};
}

/**
 * Fetches a key from the settings with an optional target context.
 *
 * @param {String} key Dot delimited object path for the setting.
 * @param {String} [target] Optional context for the setting, defaults to "default".
 * @return {*} Either the matched value or undefined if not found.
 */
Settings.prototype.get = function (key, target) {
	var settings = this._resolveTarget(target);

	if (typeof settings[key] === 'undefined' && target !== 'default') {
		settings = this._resolveTarget('default');
	}

	return settings[key];
};

/**
 * Sets a key in the settings to the specified value with an optional target
 * context.
 *
 * Emits the "settings.set" event and "settings.set#{KEY}". The normal event is
 * passed the key and value, the key specific event is only passed the value.
 *
 * @param {String} key Dot delimited object path for the setting.
 * @param {*} value This is what will be set.
 * @param {String} [target] Optional context for the setting, defaults to "default".
 */
Settings.prototype.set = function (key, value, target) {
	var settings = this._resolveTarget(target);
	settings[key] = value;
	this._context.events.emitEvent('settings.set', [key, value]);
	this._context.events.emitEvent([
		'settings.set',
		key
	].join('#'), [value]);
};

/**
 * Removes a key from the settings with an optional target context.
 *
 * @param {String} key Dot delimited object path for the setting.
 * @param {String} [target] Optional context for the setting, defaults to "default".
 */
Settings.prototype.remove = function (key, target) {
	var settings = this._resolveTarget(target);
	delete settings[key];
};

/**
 * Resolves the target context name to an object.
 *
 * @param {String} target Context to resolve.
 * @return {Object} The context object you requested.
 */
Settings.prototype._resolveTarget = function (target) {
	if (!target) {
		target = 'default';
	}

	if (!this._settings[target]) {
		this._settings[target] = {};
	}

	return this._settings[target];
};

module.exports = {
	register: function (context) {
		context.settings = new Settings(context);
	}
};
