var test = require('tape');
var MoedCore = require('../..');

test('handling a key with an exact match executes the right function', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var i = engine.context.input;

	i.map('<w>', 'normal', 'command', {
		target: function () {
			t.pass('mapping routed through');
		}
	});

	i.map('<b>', 'normal', 'command', {
		target: function () {
			t.fail('mapping routed through when it should not');
		}
	});

	i.fire('<w>');
});

test('sending one key when there are other potential matches does not execute', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var i = engine.context.input;

	i.map('<w>', 'normal', 'command', {
		target: function () {
			t.fail('<w> should not execute, it is ambiguous');
		}
	});

	i.map('<w><b>', 'normal', 'command', {
		target: function () {
			t.pass('<w><b> should execute, it is an exact match');
		}
	});

	i.map('<b>', 'normal', 'command', {
		target: function () {
			t.fail('<b> should not execute, <b> is never used at the start of the combo');
		}
	});

	i.fire('<w>');
	i.fire('<b>');
});

test('passing a count before a command will execute it that many times', function (t) {
	t.plan(1);
	var engine = new MoedCore();
	var i = engine.context.input;
	var count = 0;

	i.map('<w>', 'normal', 'command', {
		target: function () {
			count++;
		}
	});

	i.fire('1');
	i.fire('0');
	i.fire('<w>');

	t.strictEqual(count, 10, 'the mapping was executed n times');
});

test('passing a count to a mapping tha does not take one will not execute', function (t) {
	t.plan(0);
	var engine = new MoedCore();
	var i = engine.context.input;

	i.map('<w>', 'normal', 'command', {
		acceptsCount: false,
		target: function () {
			t.fail('execute mapping that does not take a count, should not have');
		}
	});

	i.map('<b>', 'normal', 'command', {
		target: function () {
			t.fail('despite accepting a count, this should not have been executed');
		}
	});

	i.fire('1');
	i.fire('0');
	i.fire('<w>');
	t.end();
});
