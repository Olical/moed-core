var vm = require('vm');

/**
 * Modal text editing engine core.
 *
 * @class
 */
function MoedCore() {
	var modules = [
		'events',
		'settings',
		'input',
		'buffers',
		'windows',
		'commands',
		'locators',
		'regions'
	];
	var length = modules.length;
	var i;
	var module;

	this.context = vm.createContext({
		source: this.source.bind(this)
	});

	for (i = 0; i < length; i++) {
		module = require(['./modules/', modules[i], '.js'].join(''));
		this.registerModule(module);
	}
}

/**
 * Executes the provided modules register function and passes it the context
 * object. The module should then add it's namespace(s) to the context.
 *
 * @param {Object} module The module you want to register.
 */
MoedCore.prototype.registerModule = function (module) {
	module.register(this.context);
};

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