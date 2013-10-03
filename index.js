var vm = require('vm');

/**
 * Modal text editing engine core.
 *
 * @class
 */
function MoedCore() {
	this.context = vm.createContext({});
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

module.exports = MoedCore;