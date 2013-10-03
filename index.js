var vm = require('vm');
var fs = require('fs');
var path = require('path');

/**
 * Modal text editing engine core.
 *
 * @class
 */
function MoedCore() {
	this.context = vm.createContext({});
	this.sourceFile(path.join(__dirname, 'lib/config.js'));
}

MoedCore.prototype.sourceFile = function (path) {
	var code = fs.readFileSync(path);
	this.source(code);
};

MoedCore.prototype.source = function (code) {
	vm.runInContext(code, this.context);
};

module.exports = MoedCore;