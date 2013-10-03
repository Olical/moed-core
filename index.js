var vm = require('vm');
var fs = require('fs');

/**
 * Modal text editing engine core.
 *
 * @class
 */
function MoedCore() {
	this.context = vm.createContext({});
}

MoedCore.prototype.sourceFile = function (path) {
	var code = fs.readFileSync(path);
	this.source(code);
};

MoedCore.prototype.source = function (code) {
	vm.runInContext(code, this.context);
};

module.exports = MoedCore;