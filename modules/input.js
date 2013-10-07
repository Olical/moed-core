/**
 * This input module adds key and key combination mapping support. This is the
 * layer between the actual key presses within the UI and the underlying
 * engine.
 *
 * @param {Object} context Current context object. Allows bridging between modules.
 * @class
 */
function Input(context) {
	this._context = context;
	this._mappings = {};

	context.events.addListener('settings.set#input.mode', this._clearCurrentMapping.bind(this));
	context.settings.set('input.mode', 'normal');
}

/**
 * Maps a key combination.
 *
 * @param {String} keys Combination to trigger the mapping.
 * @param {String} mode The input mode it is restricted to. (normal, for example)
 * @param {String} type The type of the mapping. (command or motion for example)
 * @param {Object} properties Base object to create the mapping with.
 * @param {Function} properties.target The method that the command should invoke.
 * @param {Boolean} [properties.acceptsCount] If the command can be prefixed with a count. (defaults to true)
 * @param {String} [properties.acceptsMapping] An optional type of mapping that can follow this mapping. (motion for example, so you can run "delete word")
 */
Input.prototype.map = function (keys, mode, type, properties) {
	var mappings = this._getMappings(mode, type);
	var acceptsCount = true;

	if (properties.hasOwnProperty('acceptsCount')) {
		acceptsCount = properties.acceptsCount;
	}

	mappings[keys] = {
		target: properties.target,
		acceptsCount: acceptsCount,
		acceptsMapping: properties.acceptsMapping || false
	};
};

/**
 * Fires a key off and parses it's meaning in context.
 *
 * @param {String} key
 */
Input.prototype.fire = function (key) {
	var current = this._current;
	current.keys += key;
	var matches = this._getMatchedMappings();

	if (matches.exact) {
		current.matches.push(matches.exact);
	}
	else if (matches.possible.length === 0) {
		this._clearCurrentMapping();
	}
};

/**
 * Fetches matching, or potentially matching mappings, for the current
 * progressing mapping. Returns an object containing `exact` (either an
 * object on exact match, or false if not) and the `possible` array
 * which contains future possible matches.
 *
 * @return {Object} An object containing the `possible` array and an `exact` object. (if there is one)
 */
Input.prototype._getMatchedMappings = function () {
	var result = {
		exact: false,
		possible: []
	};

	return result;
};

/**
 * Fetches the mappings for a specific mode and type of mapping.
 *
 * @param {String} mode The input mode it is restricted to. (normal, for example)
 * @param {String} type The type of the mapping. (command or motion for example)
 * @return {Object} Your desired mapping object.
 */
Input.prototype._getMappings = function (mode, type) {
	var types = this._mappings[mode];
	var mappings;

	if (!types) {
		types = this._mappings[mode] = {};
	}

	mappings = types[type];

	if (!mappings) {
		mappings = types[type] = {};
	}

	return mappings;
};

/**
 * Resets the current mapping attempt.
 */
Input.prototype._clearCurrentMapping = function () {
	this._current = {
		mode: this._context.settings.get('input.mode'),
		type: 'command',
		keys: '',
		matches: []
	};
};

module.exports = {
	register: function (context) {
		context.input = new Input(context);
	}
};
