var test = require('tape');
var MoedCore = require('../..');

test('can create a window that contains a buffer', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var file = 'Hello, World!';
	var w = engine.context.windows;
	var b = engine.context.buffers;

	var buf = b.create(file);
	var win = w.create(buf);

	t.strictEqual(win.buffer.lines[0], file, 'window contained the buffer');
});

test('can get by identifier', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var w = engine.context.windows;
	var win = w.create();
	var result = w.get(win.identifier);

	t.strictEqual(result, win, 'fetched the same window');
});

test('creating a window without a buffer will create a buffer automatically', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var w = engine.context.windows;
	var win = w.create();
	t.strictEqual(typeof win.buffer, 'object', 'the buffer was created');
});
