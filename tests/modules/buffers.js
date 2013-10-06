var test = require('tape');
var MoedCore = require('../..');

test('can create and fetch a buffers contents', function (t) {
	t.plan(2);
	var engine = new MoedCore();
	var b = engine.context.buffers;
	var content = 'this is the content\non two lines!';

	var id = b.create(content);
	var buffer = b.get(id);

	t.strictEqual(buffer.lines.length, 2, 'contains the correct amount of lines');
	t.strictEqual(buffer.lines.join('\n'), content, 'content was retrieved');
});
