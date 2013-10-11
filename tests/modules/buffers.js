var test = require('tape');
var MoedCore = require('../..');

test('can create and fetch a buffers contents', function (t) {
	t.plan(2);
	var engine = new MoedCore();
	var b = engine.context.buffers;
	var content = 'this is the content\non two lines!';
	var buffer = b.create(content);

	t.strictEqual(buffer.lines.length, 2, 'contains the correct amount of lines');
	t.strictEqual(buffer.lines.join('\n'), content, 'content was retrieved');
});

test('creating a buffer with an empty string will set a default', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var b = engine.context.buffers;
	var buffer = b.create();

	t.strictEqual(buffer.lines[0], '', 'created with an empty string');
});

test('can get by identifier', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var b = engine.context.buffers;
	var buffer = b.create();
	var result = b.get(buffer.identifier);

	t.strictEqual(result, buffer, 'fetched the same buffer');
});
