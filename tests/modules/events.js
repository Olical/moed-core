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
		t.strictEqual(payload, true, 'payload is correct');
	});

	e.emitEvent('foo', [true]);
});

test('can set the scope', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var e = engine.context.events;
	var scope = {payload: true};

	e.addListener('foo', function () {
		t.strictEqual(this, scope, 'scope is correct');
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

test('can emit using the scoped event helper', function (t) {
	t.plan(3);
	var engine = new MoedCore();
	var e = engine.context.events;

	e.addListener('foo', function (key, value) {
		t.strictEqual(key, 'bar', 'the key is correct');
		t.strictEqual(value, 100, 'the payload is correct');
	});

	e.addListener('foo#bar', function (value) {
		t.strictEqual(value, 100, 'the payload is correct');
	});

	e.emitScopedEvent('foo', 'bar', [100]);
});

test('returning -1 removes the listener', function (t) {
	t.plan(3);
	var engine = new MoedCore();
	var e = engine.context.events;

	e.addListener('foo', function () {
		t.pass('returns -1, so only called once');
		return -1;
	});

	e.addListener('foo', function () {
		t.pass('does not return -1 so it is called twice');
	});

	e.emitEvent('foo');
	e.emitEvent('foo');
});
