var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();

	return {
		engine: engine,
		e: engine.context.events
	};
}

test('can add a listener and execute it', function (t) {
	t.plan(1);

	this.e.addListener('foo', function () {
		t.pass('foo listener was executed');
	});

	this.e.addListener('bar', function () {
		t.fail('bar was not supposed to be executed');
	});

	this.e.emitEvent('foo');
}.bind(setup()));

test('can pass arguments to a listener', function (t) {
	t.plan(1);

	this.e.addListener('foo', function (payload) {
		t.strictEqual(payload, true, 'payload is correct');
	});

	this.e.emitEvent('foo', [true]);
}.bind(setup()));

test('can set the scope', function (t) {
	t.plan(1);
	var scope = {payload: true};

	this.e.addListener('foo', function () {
		t.strictEqual(this, scope, 'scope is correct');
	});

	this.e.emitEvent('foo', [], scope);
}.bind(setup()));

test('can remove a listener', function (t) {
	t.plan(3);
	var barListener = function () {
		t.fail('bar should have been removed');
	};

	this.e.addListener('foo', function () {
		t.pass('foo listener was executed');
	});

	this.e.addListener('bar', function () {
		t.pass('this was not removed by mistake');
	});

	this.e.addListener('bar', barListener);

	this.e.addListener('bar', function () {
		t.pass('this was not removed by mistake');
	});

	this.e.removeListener('bar', barListener);
	this.e.emitEvent('foo');
	this.e.emitEvent('bar');
}.bind(setup()));

test('can emit using the scoped event helper', function (t) {
	t.plan(3);

	this.e.addListener('foo', function (key, value) {
		t.strictEqual(key, 'bar', 'the key is correct');
		t.strictEqual(value, 100, 'the payload is correct');
	});

	this.e.addListener('foo#bar', function (value) {
		t.strictEqual(value, 100, 'the payload is correct');
	});

	this.e.emitScopedEvent('foo', 'bar', [100]);
}.bind(setup()));

test('returning -1 removes the listener', function (t) {
	t.plan(3);

	this.e.addListener('foo', function () {
		t.pass('returns -1, so only called once');
		return -1;
	});

	this.e.addListener('foo', function () {
		t.pass('does not return -1 so it is called twice');
	});

	this.e.emitEvent('foo');
	this.e.emitEvent('foo');
}.bind(setup()));
