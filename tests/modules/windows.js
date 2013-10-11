var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();

	return {
		engine: engine,
		w: engine.context.windows,
		b: engine.context.buffers
	};
}

test('can create a window that contains a buffer', function (t) {
	t.plan(1);
	var file = 'Hello, World!';

	var buf = this.b.create(file);
	var win = this.w.create(buf);

	t.strictEqual(win.buffer.lines[0], file, 'window contained the buffer');
}.bind(setup()));

test('can get by identifier', function (t) {
	t.plan(1);
	var win = this.w.create();
	var result = this.w.get(win.identifier);

	t.strictEqual(result, win, 'fetched the same window');
}.bind(setup()));

test('creating a window without a buffer will create a buffer automatically', function (t) {
	t.plan(1);
	var win = this.w.create();
	t.strictEqual(typeof win.buffer, 'object', 'the buffer was created');
}.bind(setup()));

test('can set the cursor position of a window', function (t) {
	t.plan(2);
	var win = this.w.create(null, 10, 5);
	t.strictEqual(win.cursor.x, 10, 'x is correct');
	t.strictEqual(win.cursor.y, 5, 'y is correct');
}.bind(setup()));
