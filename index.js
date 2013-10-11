var vm = require('vm');

/**
 * Modal text editing engine core.
 *
 * @class
 */
function MoedCore() {
	this.context = vm.createContext({
		source: this.source.bind(this)
	});

	this.registerModule(require('./modules/events.js'));
	this.registerModule(require('./modules/settings.js'));
	this.registerModule(require('./modules/input.js'));
	this.registerModule(require('./modules/buffers.js'));
	this.registerModule(require('./modules/windows.js'));
	this.registerModule(require('./modules/commands.js'));
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