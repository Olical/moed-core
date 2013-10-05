var test = require('tape');
var MoedCore = require('../..');

test('getting undefined is undefined', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var s = engine.context.settings;
	var result = s.get('this.is.undefined');
	t.strictEqual(typeof result, 'undefined', 'undefined setting returns undefined');
});

test('can set and get values', function (t) {
	t.plan(2);
	var engine = new MoedCore();
	var s = engine.context.settings;
	s.set('foo', 100);
	s.set('bar', 200);

	t.strictEqual(s.get('foo'), 100, 'foo is correct');
	t.strictEqual(s.get('bar'), 200, 'bar is correct');
});

test('can remove keys', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var s = engine.context.settings;
	s.set('foo', 100);
	s.remove('foo');
	t.strictEqual(typeof s.get('foo'), 'undefined', 'foo was deleted');
});

test('can override settings per a special target string', function (t) {
	t.plan(2);
	var engine = new MoedCore();
	var s = engine.context.settings;
	s.set('foo', 100);
	s.set('foo', 200, 'mode.insert');
	t.strictEqual(s.get('foo', 'mode.insert'), 200, 'overrode');
	s.remove('foo', 'mode.insert');
	t.strictEqual(s.get('foo'), 100, 'reset');
});

test('falls back to default if no special target is found', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var s = engine.context.settings;
	s.set('foo', 100);
	t.strictEqual(s.get('foo', 'mode.insert'), 100, 'defaulted');
});
