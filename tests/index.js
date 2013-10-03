var test = require('tape');
var MoedCore = require('..');

test('source a string into the context', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	engine.source('var foo = true;');
	t.strictEqual(engine.context.foo, true, 'foo was set to true');
});

test('can source from source', function (t) {
	t.plan(2);
	var engine = new MoedCore();
	engine.source('var foo = true; source("var bar = true;");');
	t.strictEqual(engine.context.foo, true, 'foo was set to true');
	t.strictEqual(engine.context.bar, true, 'bar was set to true');
});

test('handling a key with an exact match executes the right function', function (t) {
	t.plan(1);
	var engine = new MoedCore();

	engine.mapKeys('<w>', 'normal', function () {
		t.pass('mapping routed through');
	});

	engine.mapKeys('<b>', 'normal', function () {
		t.fail('mapping routed through when it should not');
	});

	engine.handleKey('<w>');
});
