var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();

	return {
		engine: engine,
		s: engine.context.settings,
		e: engine.context.events
	};
}

test('getting undefined is undefined', function (t) {
	t.plan(1);
	var result = this.s.get('this.is.undefined');
	t.strictEqual(typeof result, 'undefined', 'undefined setting returns undefined');
}.bind(setup()));

test('can set and get values', function (t) {
	t.plan(2);
	this.s.set('foo', 100);
	this.s.set('bar', 200);

	t.strictEqual(this.s.get('foo'), 100, 'foo is correct');
	t.strictEqual(this.s.get('bar'), 200, 'bar is correct');
}.bind(setup()));

test('can remove keys', function (t) {
	t.plan(1);
	this.s.set('foo', 100);
	this.s.remove('foo');
	t.strictEqual(typeof this.s.get('foo'), 'undefined', 'foo was deleted');
}.bind(setup()));

test('can override settings per a special target string', function (t) {
	t.plan(2);
	this.s.set('foo', 100);
	this.s.set('foo', 200, 'mode.insert');
	t.strictEqual(this.s.get('foo', 'mode.insert'), 200, 'overrode');
	this.s.remove('foo', 'mode.insert');
	t.strictEqual(this.s.get('foo'), 100, 'reset');
}.bind(setup()));

test('falls back to default if no special target is found', function (t) {
	t.plan(1);
	this.s.set('foo', 100);
	t.strictEqual(this.s.get('foo', 'mode.insert'), 100, 'defaulted');
}.bind(setup()));

test('setting a value emits events', function (t) {
	t.plan(3);

	this.e.addListener('settings.set', function (key, value) {
		t.strictEqual(key, 'foo', 'foo was set');
		t.strictEqual(value, 100, 'foo was set to the correct value');
	});

	this.e.addListener('settings.set#foo', function (value) {
		t.strictEqual(value, 100, 'also raised a foo specific event');
	});

	this.s.set('foo', 100);
}.bind(setup()));

test('can fetch a setting for multiple targets', function (t) {
	t.plan(3);
	var targets = ['window.window_XX', 'language.javascript'];

	this.s.set('foo', 10);
	t.strictEqual(this.s.get('foo', targets), 10, 'default matched');

	this.s.set('foo', 20, targets[1]);
	t.strictEqual(this.s.get('foo', targets), 20, 'language matched');

	this.s.set('foo', 30, targets[0]);
	t.strictEqual(this.s.get('foo', targets), 30, 'window matched');
}.bind(setup()));
