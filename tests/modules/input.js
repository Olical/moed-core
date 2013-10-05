var test = require('tape');
var MoedCore = require('../..');

test('handling a key with an exact match executes the right function', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var i = engine.context.input;

	i.map('<w>', 'normal', function () {
		t.pass('mapping routed through');
	});

	i.map('<b>', 'normal', function () {
		t.fail('mapping routed through when it should not');
	});

	i.fire('<w>');
});

test('sending one key when there are other potential matches does not execute', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var i = engine.context.input;

	i.map('<w>', 'normal', function () {
		t.fail('<w> should do nothing because it is ambiguous');
	});

	i.map('<w><b>', 'normal', function () {
		t.fail('<w><b> should not be executed because this was a single key');
	});

	i.map('<b>', 'normal', function () {
		t.pass('<b> is the only one that should execute');
	});

	i.fire('<b>');
	i.fire('<w>');
});

test('can register and use key combinations', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var i = engine.context.input;

	i.map('<w>', 'normal', function () {
		t.fail('<w> should do nothing because it is ambiguous');
	});

	i.map('<w><b>', 'normal', function () {
		t.pass('<w><b> should execute this');
	});

	i.map('<b>', 'normal', function () {
		t.fail('<b> should not execute when not called');
	});

	i.fire('<w>');
	i.fire('<b>');
});

test('can let a key combination timeout', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var i = engine.context.input;
	engine.context.settings.set('input.timeout', 50);

	i.map('<w>', 'normal', function () {
		t.fail('<w> should do nothing because it is ambiguous');
	});

	i.map('<w><b>', 'normal', function () {
		t.fail('<w><b> should not execute because it times out');
	});

	i.map('<b>', 'normal', function () {
		t.pass('<b> should execute because the combo times out');
	});

	i.fire('<w>');

	setTimeout(function () {
		i.fire('<b>');
	}, 60);
});
