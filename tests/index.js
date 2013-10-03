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

test('sending one key when there are other potential matches does not execute', function (t) {
	t.plan(1);
	var engine = new MoedCore();

	engine.mapKeys('<w>', 'normal', function () {
		t.fail('<w> should do nothing because it is ambiguous');
	});

	engine.mapKeys('<w><b>', 'normal', function () {
		t.fail('<w><b> should not be executed because this was a single key');
	});

	engine.mapKeys('<b>', 'normal', function () {
		t.pass('<b> is the only one that should execute');
	});

	engine.handleKey('<b>');
	engine.handleKey('<w>');
});

test('can register and use key combinations', function (t) {
	t.plan(1);
	var engine = new MoedCore();

	engine.mapKeys('<w>', 'normal', function () {
		t.fail('<w> should do nothing because it is ambiguous');
	});

	engine.mapKeys('<w><b>', 'normal', function () {
		t.pass('<w><b> should execute this');
	});

	engine.mapKeys('<b>', 'normal', function () {
		t.fail('<b> should not execute when not called');
	});

	engine.handleKey('<w>');
	engine.handleKey('<b>');
});

test('can let a key combination timeout', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	engine.keyCombinationTimeout = 50;

	engine.mapKeys('<w>', 'normal', function () {
		t.fail('<w> should do nothing because it is ambiguous');
	});

	engine.mapKeys('<w><b>', 'normal', function () {
		t.fail('<w><b> should not execute because it times out');
	});

	engine.mapKeys('<b>', 'normal', function () {
		t.pass('<b> should execute because the combo times out');
	});

	engine.handleKey('<w>');

	setTimeout(function () {
		engine.handleKey('<b>');
	}, 100);
});
