var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();
	var l  = engine.context.locators;

	return {
		engine: engine,
		l: l
	};
}
