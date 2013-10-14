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

// test('can define and mark a simple region', test(t) {
// 	t.plan(1);
// 	r.define('world', /World!/);
// 	var regions = r.match('Hello, World! Sup world?');
// 	t.strictEqual(regions.length, 1, 'matched one region');
// }.bind(setup()));
