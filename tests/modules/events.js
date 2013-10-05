var test = require('tape');
var MoedCore = require('../..');

test('can add a listener and execute it', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var e = engine.context.events;

	e.addListener('foo', function () {
		t.pass('foo listener was executed');
	});

	e.addListener('bar', function () {
		t.fail('bar was not supposed to be executed');
	});

	e.emitEvent('foo');
});

test('can pass arguments to a listener', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var e = engine.context.events;

	e.addListener('foo', function (payload) {
		t.strictEqual(payload, true);
	});

	e.emitEvent('foo', [true]);
});

test('can set the scope', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var e = engine.context.events;
	var scope = {payload: true};

	e.addListener('foo', function () {
		t.strictEqual(this, scope);
	});

	e.emitEvent('foo', [], scope);
});

test('can remove a listener', function (t) {
	t.plan(3);
	var engine = new MoedCore();
	var e = engine.context.events;
	var barListener = function () {
		t.fail('bar should have been removed');
	};

	e.addListener('foo', function () {
		t.pass('foo listener was executed');
	});

	e.addListener('bar', function () {
		t.pass('this was not removed by mistake');
	});

	e.addListener('bar', barListener);

	e.addListener('bar', function () {
		t.pass('this was not removed by mistake');
	});

	e.removeListener('bar', barListener);
	e.emitEvent('foo');
	e.emitEvent('bar');
});
