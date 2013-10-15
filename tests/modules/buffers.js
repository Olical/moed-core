var test = require('tape');
var MoedCore = require('../..');

function setup() {
	var engine = new MoedCore();

	return {
		engine: engine,
		b: engine.context.buffers,
		e: engine.context.events
	};
}

test('can create and fetch a buffers contents', function (t) {
	t.plan(2);
	var content = 'this is the content\non two lines!';
	var buffer = this.b.create(content);

	t.strictEqual(buffer.lines.length, 2, 'contains the correct amount of lines');
	t.strictEqual(buffer.lines.join('\n'), content, 'content was retrieved');
}.bind(setup()));

test('creating a buffer with an empty string will set a default', function (t) {
	t.plan(1);
	var buffer = this.b.create();

	t.strictEqual(buffer.lines[0], '', 'created with an empty string');
}.bind(setup()));

test('can get by identifier', function (t) {
	t.plan(1);
	var buffer = this.b.create();
	var result = this.b.get(buffer.identifier);

	t.strictEqual(result, buffer, 'fetched the same buffer');
}.bind(setup()));

test('emits a creation event', function (t) {
	t.plan(2);
	var content = 'Hello, World!';

	this.e.addListener('buffers.create', function (buffer, identifier) {
		t.strictEqual(buffer.lines[0], content, 'content is correct');
		t.strictEqual(buffer.identifier, identifier, 'identifier was passed');
	});

	this.b.create(content);
}.bind(setup()));
