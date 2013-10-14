var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();
	var r = engine.context.regions;

	return {
		engine: engine,
		r: r
	};
}

test('can define and mark a simple region', test(t) {
}.bind(setup()));
