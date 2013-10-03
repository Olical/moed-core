var vm = require('vm');

/**
 * Modal text editing engine core.
 *
 * @class
 */
function MoedCore() {
	this.curentMode = 'normal';
	this.currentKeyCombination = '';
	this.keyCombinations = {
		normal: {}
	};

	this.context = vm.createContext({
		source: this.source.bind(this),
		mapKeys: this.mapKeys.bind(this)
	});
}

/**
 * Parses the provided JavaScript in the engine's context. It allows it to
 * register functions and settings to share with all other sourced code.
 *
 * @param {String} code A chunk of JavaScript to source.
 */
MoedCore.prototype.source = function (code) {
	vm.runInContext(code, this.context);
};

/**
 * Maps the key or array of key identifiers as a combination to the target
 * function when running in the specified mode.
 *
 * @param {String|String[]} keys
 * @param {String} mode
 * @param {Function} target
 */
MoedCore.prototype.mapKeys = function (keys, mode, target) {
	var combination = typeof keys === 'string' ? keys : keys.join('');
	this.keyCombinations[mode][combination] = target;
};

/**
 * Handles key events. These are used to assign key combinations to functions.
 * The key names work the same as Vim, so <Esc> is escape, <C-a> is control+a,
 * <s> is s, and <W> is shift+w.
 *
 * @param {String} key The case sensitive key that was pressed.
 */
MoedCore.prototype.handleKey = function (key) {
	this.currentKeyCombination += key;
	var matches = this.getPossibleKeyCombinationMatches();

	if (matches.length === 1 && matches.hasOwnProperty(this.currentKeyCombination)) {
		matches[this.currentKeyCombination]();
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
MoedCore.prototype.getPossibleKeyCombinationMatches = function () {
	var matches = {
		length: 0
	};
	var candidates = this.keyCombinations[this.curentMode];
	var combination;

	for (combination in candidates) {
		if (candidates.hasOwnProperty(combination)) {
			if (combination.indexOf(this.currentKeyCombination) === 0) {
				matches[combination] = candidates[combination];
				matches.length += 1;
			}
		}
	}

	return matches;
};

module.exports = MoedCore;