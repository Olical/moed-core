var test = require('tape');
var path = require('path');
var MoedCore = require('..');

test('source a string into the context', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	engine.source('var foo = true;');
	t.strictEqual(engine.context.foo, true, 'foo was set to true');
});

test('source a file into the context', function (t) {
	t.plan(2);
	var engine = new MoedCore();
	engine.sourceFile(path.join(__dirname, 'config/basic.js'));
	t.strictEqual(engine.context.foo, true, 'foo was set to true');
	t.strictEqual(engine.context.bar, true, 'bar was set to true');
});

test('default config is loaded', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	t.strictEqual(engine.context.theAnswerToLifeTheUniverseAndEverything, 42, 'contains the answer to life, the universe and everything.');
});
