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

	context.settings.set('input.timeout', 800);

	this._mode = 'normal';
	this._currentCombination = '';
	this._combinations = {};
	this._timeoutHandle = null;
}

/**
 * Maps the key identifiers as a combination to the target function when
 * running in the specified mode.
 *
 * Combinations use the same syntax as Vim, so if you wanted to map someone
 * pressing control-w and then l to a function, you would use: "<C-w><l>".
 *
 * @param {String} keys
 * @param {String} mode
 * @param {Function} target
 */
Input.prototype.map = function (keys, mode, target) {
	var combination = typeof keys === 'string' ? keys : keys.join('');

	if (!this._combinations[mode]) {
		this._combinations[mode] = {};
	}

	this._combinations[mode][combination] = target;
};

/**
 * Handles key events. These are used to assign key combinations to functions.
 * The key names work the same as Vim, so <Esc> is escape, <C-a> is control+a,
 * <s> is s, and <W> is shift+w.
 *
 * @param {String} key The case sensitive key that was pressed.
 */
Input.prototype.fire = function (key) {
	this._currentCombination += key;

	var matches = this._getPossibleKeyCombinationMatches();
	var shouldClearCombination = false;

	if (matches.length === 0) {
		shouldClearCombination = true;
	}
	else if (matches.length === 1 && matches.hasOwnProperty(this._currentCombination)) {
		matches[this._currentCombination]();
		shouldClearCombination = true;
	}
	else if (matches.length >= 1) {
		clearTimeout(this._timeoutHandle);
		this._timeoutHandle = setTimeout(function () {
			this._currentCombination = '';
			this._timeoutHandle = null;
		}.bind(this), this._context.settings.get('input.timeout'));
	}

	if (shouldClearCombination) {
		this._currentCombination = '';
	}
};

/**
 * Creates an object of possible key combination matches from the current key
 * combination and the key combinations map. It returns a new map only
 * containing those that are either a complete match or a potential match which
 * requires more key presses.
 *
 * The map also contains a length property to save you counting them. You can
 * use this to work out if you have an exact hit or a complete miss.
 *
 * @return {Object} Map of matched key combinations for the current keys with a length.
 */
Input.prototype._getPossibleKeyCombinationMatches = function () {
	var matches = {
		length: 0
	};
	var candidates = this._combinations[this._mode];
	var combination;

	for (combination in candidates) {
		if (candidates.hasOwnProperty(combination)) {
			if (combination.indexOf(this._currentCombination) === 0) {
				matches[combination] = candidates[combination];
				matches.length += 1;
			}
		}
	}

	return matches;
};

module.exports = {
	register: function (context) {
		context.input = new Input(context);
	}
};
