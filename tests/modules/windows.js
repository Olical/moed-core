var test = require('tape');
var MoedCore = require('../..');

test('can create a window that contains a buffer', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var file = 'Hello, World!';
	var w = engine.context.windows;
	var b = engine.context.buffers;

	var bid = b.create(file);
	var wid = w.create(bid);
	var win = w.get(wid);

	t.strictEqual(win.buffer.lines[0], file, 'window contained the buffer');
});
