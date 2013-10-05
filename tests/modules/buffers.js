var test = require('tape');
var MoedCore = require('../..');

test('can create and fetch a buffer', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var b = engine.context.buffers;
	var content = 'this is the content';

	var id = b.create(content);
	t.strictEqual(b.get(id).content, content, 'content was retrieved');
});
