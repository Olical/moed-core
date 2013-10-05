function Input() {
	this.mode = 'normal';
	this.timeout = 800;
	this.currentCombination = '';
	this.combinations = {};
	this.timeoutHandle = null;
}

/**
 * Maps the key identifiers as a combination to the target function when
 * running in the specified mode.
 *
 * @param {String} keys
 * @param {String} mode
 * @param {Function} target
 */
Input.prototype.mapKeys = function (keys, mode, target) {
	var combination = typeof keys === 'string' ? keys : keys.join('');

	if (!this.combinations[mode]) {
		this.combinations[mode] = {};
	}

	this.combinations[mode][combination] = target;
};

/**
 * Handles key events. These are used to assign key combinations to functions.
 * The key names work the same as Vim, so <Esc> is escape, <C-a> is control+a,
 * <s> is s, and <W> is shift+w.
 *
 * @param {String} key The case sensitive key that was pressed.
 */
Input.prototype.handleKey = function (key) {
	this.currentCombination += key;

	var matches = this.getPossibleKeyCombinationMatches();
	var shouldClearCombination = false;

	if (matches.length === 0) {
		shouldClearCombination = true;
	}
	else if (matches.length === 1 && matches.hasOwnProperty(this.currentCombination)) {
		matches[this.currentCombination]();
		shouldClearCombination = true;
	}
	else if (matches.length >= 1) {
		clearTimeout(this.timeoutHandle);
		this.timeoutHandle = setTimeout(function () {
			this.currentCombination = '';
			this.timeoutHandle = null;
		}.bind(this), this.timeout);
	}

	if (shouldClearCombination) {
		this.currentCombination = '';
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
Input.prototype.getPossibleKeyCombinationMatches = function () {
	var matches = {
		length: 0
	};
	var candidates = this.combinations[this.mode];
	var combination;

	for (combination in candidates) {
		if (candidates.hasOwnProperty(combination)) {
			if (combination.indexOf(this.currentCombination) === 0) {
				matches[combination] = candidates[combination];
				matches.length += 1;
			}
		}
	}

	return matches;
};

module.exports = {
	register: function (context) {
		context.input = new Input();
	}
};
