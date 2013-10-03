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

/**
 * Parses the provided JavaScript in the engines context. It allows it to
 * register functions and settings to share with all other sourced code.
 *
 * @param {String} code A chunk of JavaScript to source.
 */
MoedCore.prototype.source = function (code) {
	vm.runInContext(code, this.context);
};

/**
 * Does exactly what `source` does, loads JavaScript into the engines context,
 * but must be provided with a file name to read the code from.
 *
 * @param {String} path The file to load and source.
 */
MoedCore.prototype.sourceFile = function (path) {
	var code = fs.readFileSync(path);
	this.source(code);
};

module.exports = MoedCore;