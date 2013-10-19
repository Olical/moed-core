var test = require('tape');
var MoedCore = require('..');

test('can load a module', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	engine.registerModule(require('./data/basic-module.js'));
	t.strictEqual(engine.context.main.id, true, 'loaded and created the module');
});

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
