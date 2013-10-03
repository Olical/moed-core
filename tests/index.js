var test = require('tape');
var MoedCore = require('..');

test('source a string into the context', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	engine.source('var foo = true;');
	t.strictEqual(engine.context.foo, true, 'foo was set to true');
});

test('source a fle into the context', function (t) {
	t.plan(2);
	var engine = new MoedCore();
	engine.sourceFile('./tests/config/basic.js');
	t.strictEqual(engine.context.foo, true, 'foo was set to true');
	t.strictEqual(engine.context.bar, true, 'bar was set to true');
});
